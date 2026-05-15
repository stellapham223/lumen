import { XMLParser } from "fast-xml-parser";
import { rssUrl, SUBS, type SubConfig } from "./subs";
import { listSubs } from "@/lib/db/queries";

export type RawThread = {
  externalId: string;
  sub: string;
  title: string;
  url: string;
  body: string;
  publishedAt: Date;
};

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "",
});

function userAgent(): string {
  return process.env.REDDIT_USER_AGENT ?? "Lumen Dashboard/1.0";
}

function decodeHtml(input: string): string {
  return input
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function entryToThread(entry: unknown, sub: string): RawThread | null {
  const e = entry as {
    id?: string;
    title?: string | { "#text"?: string };
    link?: { href?: string } | Array<{ href?: string }>;
    content?: string | { "#text"?: string };
    published?: string;
    updated?: string;
  };

  const externalId = typeof e.id === "string" ? e.id.split("/").pop() ?? e.id : "";
  if (!externalId) return null;

  const title =
    typeof e.title === "string" ? e.title : e.title?.["#text"] ?? "";
  if (!title) return null;

  const linkHref = Array.isArray(e.link) ? e.link[0]?.href : e.link?.href;
  if (!linkHref) return null;

  const rawBody =
    typeof e.content === "string" ? e.content : e.content?.["#text"] ?? "";
  const body = decodeHtml(rawBody);

  const dateStr = e.published ?? e.updated;
  if (!dateStr) return null;
  const publishedAt = new Date(dateStr);
  if (isNaN(publishedAt.getTime())) return null;

  return {
    externalId,
    sub,
    title: typeof title === "string" ? title : "",
    url: linkHref,
    body,
    publishedAt,
  };
}

async function fetchSubFeed(sub: SubConfig): Promise<RawThread[]> {
  const res = await fetch(rssUrl(sub.name), {
    headers: { "User-Agent": userAgent() },
    cache: "no-store",
  });
  if (!res.ok) {
    console.warn(`[reddit/rss] ${sub.name} -> HTTP ${res.status}`);
    return [];
  }
  const xml = await res.text();
  const parsed = parser.parse(xml) as {
    feed?: { entry?: unknown | unknown[] };
  };
  const rawEntries = parsed.feed?.entry;
  const entries = Array.isArray(rawEntries) ? rawEntries : rawEntries ? [rawEntries] : [];
  return entries
    .map((e) => entryToThread(e, sub.name))
    .filter((t): t is RawThread => t !== null);
}

async function resolveSubs(): Promise<SubConfig[]> {
  try {
    const rows = await listSubs({ onlyActive: true });
    if (rows.length > 0) {
      return rows.map((r) => ({
        name: r.name,
        members: r.members,
        strictness: (r.strictness === "loose" || r.strictness === "strict"
          ? r.strictness
          : "medium") as SubConfig["strictness"],
      }));
    }
  } catch (err) {
    console.warn("[reddit/rss] DB subs unavailable, falling back to static SUBS", err);
  }
  return [...SUBS];
}

export async function fetchAllSubs(): Promise<RawThread[]> {
  const subs = await resolveSubs();
  const results = await Promise.allSettled(subs.map(fetchSubFeed));
  return results.flatMap((r) => (r.status === "fulfilled" ? r.value : []));
}
