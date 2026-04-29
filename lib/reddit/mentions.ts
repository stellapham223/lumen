import { XMLParser } from "fast-xml-parser";

const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "" });

function userAgent(): string {
  return process.env.REDDIT_USER_AGENT ?? "Lumen Dashboard/1.0";
}

// Use only brand-unique strings. Bare "lumen" matches lighting, LEDs,
// mitochondrial drugs, etc. — too noisy. Add new exact queries here when
// the brand picks up secondary aliases.
export const MENTION_QUERIES: readonly string[] = [
  "lumencal",
  "lumencal.com",
];

function searchUrl(query: string): string {
  const q = encodeURIComponent(query);
  return `https://www.reddit.com/search.rss?q=${q}&sort=new&restrict_sr=&include_over_18=on`;
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

export type RawMention = {
  source: string;
  externalId: string;
  sub: string | null;
  title: string;
  url: string;
  body: string;
  publishedAt: Date;
};

function entryToMention(entry: unknown): RawMention | null {
  const e = entry as {
    id?: string;
    title?: string | { "#text"?: string };
    link?: { href?: string } | Array<{ href?: string }>;
    content?: string | { "#text"?: string };
    published?: string;
    updated?: string;
    category?: { term?: string } | Array<{ term?: string }>;
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
  const cat = Array.isArray(e.category) ? e.category[0] : e.category;
  const sub = cat?.term ?? null;
  return {
    source: "reddit",
    externalId,
    sub,
    title,
    url: linkHref,
    body,
    publishedAt,
  };
}

async function fetchOne(query: string): Promise<RawMention[]> {
  const res = await fetch(searchUrl(query), {
    headers: { "User-Agent": userAgent() },
    cache: "no-store",
  });
  if (!res.ok) {
    console.warn(`[reddit/mentions] "${query}" -> HTTP ${res.status}`);
    return [];
  }
  const xml = await res.text();
  const parsed = parser.parse(xml) as { feed?: { entry?: unknown | unknown[] } };
  const rawEntries = parsed.feed?.entry;
  const entries = Array.isArray(rawEntries) ? rawEntries : rawEntries ? [rawEntries] : [];
  return entries
    .map(entryToMention)
    .filter((m): m is RawMention => m !== null);
}

// Reddit search uses fuzzy/stemmed matching, so "lumencal" surfaces
// "Lumence", "Lumentian", etc. Strict client-side substring filter.
function strictMatch(text: string): boolean {
  const lower = text.toLowerCase();
  return MENTION_QUERIES.some((q) => lower.includes(q.toLowerCase()));
}

export async function fetchAllMentions(): Promise<RawMention[]> {
  const results = await Promise.allSettled(MENTION_QUERIES.map(fetchOne));
  const all = results.flatMap((r) => (r.status === "fulfilled" ? r.value : []));
  const seen = new Set<string>();
  const unique: RawMention[] = [];
  for (const m of all) {
    const key = `${m.source}:${m.externalId}`;
    if (seen.has(key)) continue;
    if (!strictMatch(`${m.title} ${m.body}`)) continue;
    seen.add(key);
    unique.push(m);
  }
  return unique;
}
