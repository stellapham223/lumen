// Google Indexing API client.
//
// Auth: service account JWT. Requires GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON env
// var containing the entire service account key JSON as a single-line string.
// The service account email must also be added as Owner of the GSC property.
//
// Quota: 200 URL notifications per day by default. Bulk batch mode accepts up
// to 100 URLs per HTTP request.
//
// Note: Google officially documents the Indexing API for JobPosting and
// BroadcastEvent structured data only. Submitting general content URLs is a
// gray area; in practice many sites use it without enforcement, and worst case
// Google ignores the request. We submit anyway because the upside (faster
// crawl) is significant for a new site.

import { JWT } from "google-auth-library";

type NotificationType = "URL_UPDATED" | "URL_DELETED";

type PublishResult = {
  url: string;
  ok: boolean;
  status: number;
  error?: string;
};

let cachedClient: JWT | null = null;

function getClient(): JWT {
  if (cachedClient) return cachedClient;

  const raw = process.env.GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON;
  if (!raw) {
    throw new Error("GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON is not set");
  }

  let creds: { client_email: string; private_key: string };
  try {
    creds = JSON.parse(raw);
  } catch {
    throw new Error("GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON is not valid JSON");
  }

  if (!creds.client_email || !creds.private_key) {
    throw new Error("Service account JSON missing client_email or private_key");
  }

  cachedClient = new JWT({
    email: creds.client_email,
    key: creds.private_key.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/indexing"],
  });

  return cachedClient;
}

async function getAccessToken(): Promise<string> {
  const client = getClient();
  await client.authorize();
  const token = client.credentials.access_token;
  if (!token) throw new Error("Google auth returned no access token");
  return token;
}

export async function publishOne(
  url: string,
  type: NotificationType = "URL_UPDATED",
): Promise<PublishResult> {
  try {
    const token = await getAccessToken();
    const response = await fetch(
      "https://indexing.googleapis.com/v3/urlNotifications:publish",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ url, type }),
      },
    );
    if (!response.ok) {
      const errText = await response.text();
      return {
        url,
        ok: false,
        status: response.status,
        error: errText.slice(0, 300),
      };
    }
    return { url, ok: true, status: response.status };
  } catch (err) {
    return {
      url,
      ok: false,
      status: 0,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

// Bulk publish via the batch endpoint. Accepts up to 100 requests per batch.
// We rate-limit ourselves to 50 per batch to leave headroom.
const BATCH_SIZE = 50;

export async function publishBulk(
  urls: ReadonlyArray<string>,
  type: NotificationType = "URL_UPDATED",
): Promise<PublishResult[]> {
  const results: PublishResult[] = [];
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE);
    // We send batch-as-sequential-requests rather than using the multipart
    // batch endpoint. Simpler error handling, and the quota is per-URL anyway.
    const batchResults = await Promise.all(batch.map((u) => publishOne(u, type)));
    results.push(...batchResults);
  }
  return results;
}
