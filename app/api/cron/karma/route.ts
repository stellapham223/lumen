import { NextResponse } from "next/server";
import { listEngagements, updateEngagementMetrics } from "@/lib/db/queries";
import { fetchCommentStats, sleep } from "@/lib/reddit/karma";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

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
  const engagements = await listEngagements();
  let updated = 0;
  let failed = 0;

  for (const e of engagements) {
    const stats = await fetchCommentStats(e.commentUrl);
    if (stats) {
      await updateEngagementMetrics({
        id: e.id,
        lastKarma: stats.score,
        lastReplies: stats.replies,
      });
      updated++;
    } else {
      failed++;
    }
    await sleep(1000);
  }

  return NextResponse.json({
    ok: true,
    total: engagements.length,
    updated,
    failed,
    durationMs: Date.now() - started,
  });
}
