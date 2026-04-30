// Shared scrape job: used by both the daily Vercel cron and the on-demand
// admin "Refresh" button. Returns counts so the caller can render UX.

import { fetchAllSubs } from "@/lib/reddit/rss";
import { filterThreads } from "@/lib/reddit/filter";
import { upsertThreads } from "@/lib/db/queries";
import { fetchAllMentions } from "@/lib/reddit/mentions";
import { upsertMentions } from "@/lib/db/queries";

export type ScrapeResult = {
  rawCount: number;
  filteredCount: number;
  lumenCount: number;
  givebackCount: number;
  insertedOrUpdated: number;
  durationMs: number;
};

export async function runScrape(): Promise<ScrapeResult> {
  const started = Date.now();
  const raw = await fetchAllSubs();
  const filtered = filterThreads(raw);
  const lumenCount = filtered.filter((t) => t.category === "lumen").length;
  const givebackCount = filtered.length - lumenCount;
  const inserted = await upsertThreads(
    filtered.map((t) => ({
      platform: "reddit",
      externalId: t.externalId,
      sub: t.sub,
      title: t.title,
      url: t.url,
      body: t.body,
      publishedAt: t.publishedAt,
      matchedKeywords: t.matchedKeywords,
      category: t.category,
    })),
  );
  return {
    rawCount: raw.length,
    filteredCount: filtered.length,
    lumenCount,
    givebackCount,
    insertedOrUpdated: inserted,
    durationMs: Date.now() - started,
  };
}

export type MentionsResult = {
  fetched: number;
  inserted: number;
  durationMs: number;
};

export async function runMentions(): Promise<MentionsResult> {
  const started = Date.now();
  const mentions = await fetchAllMentions();
  const inserted = await upsertMentions(
    mentions.map((m) => ({
      source: m.source,
      externalId: m.externalId,
      sub: m.sub,
      title: m.title,
      url: m.url,
      body: m.body,
      publishedAt: m.publishedAt,
    })),
  );
  return {
    fetched: mentions.length,
    inserted,
    durationMs: Date.now() - started,
  };
}
