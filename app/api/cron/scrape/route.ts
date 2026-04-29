import { NextResponse } from "next/server";
import { fetchAllSubs } from "@/lib/reddit/rss";
import { filterThreads } from "@/lib/reddit/filter";
import { upsertThreads } from "@/lib/db/queries";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

function isAuthorized(request: Request): boolean {
  const expected = process.env.CRON_SECRET;
  if (!expected) return false;
  const auth = request.headers.get("authorization");
  return auth === `Bearer ${expected}`;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const started = Date.now();
  const raw = await fetchAllSubs();
  const filtered = filterThreads(raw);

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
    })),
  );

  return NextResponse.json({
    ok: true,
    rawCount: raw.length,
    filteredCount: filtered.length,
    insertedOrUpdated: inserted,
    durationMs: Date.now() - started,
  });
}
