// IndexNow client. Submits URLs to Bing and Yandex (Google does not support).
//
// Setup: INDEXNOW_KEY env var holds a 32-char hex token. The same token must
// also be served at https://lumencal.com/{key}.txt for verification (handled
// by the static file in /public/).
//
// Quota: technically unlimited but throttled. We submit in one bulk request
// per call (up to ~10000 URLs per request per docs).

type IndexNowResult = {
  ok: boolean;
  status: number;
  submitted: number;
  error?: string;
};

const HOST = "lumencal.com";
const ENDPOINT = "https://api.indexnow.org/IndexNow";

export async function submitUrls(
  urls: ReadonlyArray<string>,
): Promise<IndexNowResult> {
  const key = process.env.INDEXNOW_KEY;
  if (!key) {
    return {
      ok: false,
      status: 0,
      submitted: 0,
      error: "INDEXNOW_KEY is not set",
    };
  }

  if (urls.length === 0) {
    return { ok: true, status: 200, submitted: 0 };
  }

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: HOST,
        key,
        keyLocation: `https://${HOST}/${key}.txt`,
        urlList: urls,
      }),
    });

    // 200 = accepted. 202 = accepted async. 400 = bad request. 403 = key
    // mismatch. 422 = invalid URLs.
    const ok = response.status === 200 || response.status === 202;
    let error: string | undefined;
    if (!ok) {
      const errText = await response.text();
      error = errText.slice(0, 300) || `HTTP ${response.status}`;
    }
    return {
      ok,
      status: response.status,
      submitted: ok ? urls.length : 0,
      error,
    };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      submitted: 0,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
