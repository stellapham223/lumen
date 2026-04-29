import type { Metadata } from "next";
import { db, schema } from "@/lib/db/client";
import { desc, eq } from "drizzle-orm";

export const metadata: Metadata = {
  title: "Admin · Metrics",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminMetricsPage() {
  const rows = await db
    .select({
      engagementId: schema.cdEngagements.id,
      threadId: schema.cdEngagements.threadId,
      threadTitle: schema.cdThreads.title,
      threadSub: schema.cdThreads.sub,
      commentUrl: schema.cdEngagements.commentUrl,
      postedAt: schema.cdEngagements.postedAt,
      lastKarma: schema.cdEngagements.lastKarma,
      lastReplies: schema.cdEngagements.lastReplies,
      metricsCheckedAt: schema.cdEngagements.metricsCheckedAt,
    })
    .from(schema.cdEngagements)
    .leftJoin(
      schema.cdThreads,
      eq(schema.cdEngagements.threadId, schema.cdThreads.id),
    )
    .orderBy(desc(schema.cdEngagements.postedAt));

  return (
    <main className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="eyebrow text-[color:var(--color-primary)]">Metrics</span>
        <h1 className="font-display text-[28px] font-medium text-[color:var(--color-primary)]">
          Posted comments
        </h1>
        <p className="text-[14px] text-[color:var(--color-on-surface-variant)]">
          {rows.length} engagement{rows.length === 1 ? "" : "s"}. Karma cron
          refreshes daily at midnight ICT.
        </p>
      </div>

      {rows.length === 0 ? (
        <div className="hairline bg-[color:var(--color-surface-container-lowest)] px-6 py-12 text-center">
          <p className="font-display text-[15px] text-[color:var(--color-on-surface-variant)]">
            No engagements yet. Mark a thread as posted from its detail page.
          </p>
        </div>
      ) : (
        <table className="hairline w-full border-collapse text-left text-[13px]">
          <thead className="bg-[color:var(--color-surface-container-lowest)]">
            <tr>
              <th className="px-3 py-2 font-display text-[12px] uppercase tracking-[0.16em] text-[color:var(--color-on-surface-variant)]">
                Thread
              </th>
              <th className="px-3 py-2 font-display text-[12px] uppercase tracking-[0.16em] text-[color:var(--color-on-surface-variant)]">
                Posted
              </th>
              <th className="px-3 py-2 font-display text-[12px] uppercase tracking-[0.16em] text-[color:var(--color-on-surface-variant)]">
                Karma
              </th>
              <th className="px-3 py-2 font-display text-[12px] uppercase tracking-[0.16em] text-[color:var(--color-on-surface-variant)]">
                Replies
              </th>
              <th className="px-3 py-2 font-display text-[12px] uppercase tracking-[0.16em] text-[color:var(--color-on-surface-variant)]">
                Checked
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.engagementId} className="hairline-b">
                <td className="px-3 py-3">
                  <div className="font-display text-[14px] text-[color:var(--color-primary)]">
                    {r.threadTitle ?? "(unknown)"}
                  </div>
                  <div className="text-[11px] text-[color:var(--color-on-surface-variant)]">
                    r/{r.threadSub ?? "?"} ·{" "}
                    <a
                      href={r.commentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2"
                    >
                      Comment ↗
                    </a>
                  </div>
                </td>
                <td className="px-3 py-3 align-top text-[12px]">
                  {r.postedAt.toISOString().slice(0, 10)}
                </td>
                <td className="px-3 py-3 align-top text-[14px]">
                  {r.lastKarma ?? "—"}
                </td>
                <td className="px-3 py-3 align-top text-[14px]">
                  {r.lastReplies ?? "—"}
                </td>
                <td className="px-3 py-3 align-top text-[12px]">
                  {r.metricsCheckedAt
                    ? r.metricsCheckedAt.toISOString().slice(0, 10)
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
