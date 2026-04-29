import { NextResponse } from "next/server";
import { fetchAllMentions } from "@/lib/reddit/mentions";
import { upsertMentions } from "@/lib/db/queries";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

function isAuthorized(request: Request): boolean {
  const expected = process.env.CRON_SECRET;
  if (!expected) return false;
  return request.headers.get("authorization") === `Bearer ${expected}`;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
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
  return NextResponse.json({
    ok: true,
    fetched: mentions.length,
    inserted,
    durationMs: Date.now() - started,
  });
}
