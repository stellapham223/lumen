import type { Metadata } from "next";
import Link from "next/link";
import { listRevisitQueue } from "@/lib/db/queries";
import { RevisitClearButton } from "@/components/RevisitClearButton";

export const metadata: Metadata = {
  title: "Admin · Revisit",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminRevisitPage() {
  const rows = await listRevisitQueue();

  return (
    <main className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="eyebrow text-[color:var(--color-primary)]">Revisit</span>
        <h1 className="font-display text-[28px] font-medium text-[color:var(--color-primary)]">
          Threads with new replies
        </h1>
        <p className="text-[14px] text-[color:var(--color-on-surface-variant)]">
          {rows.length} engagement{rows.length === 1 ? "" : "s"} have received
          new replies since last karma check. Reply within 24h to maintain the
          conversation and earn upvote momentum.
        </p>
      </div>

      {rows.length === 0 ? (
        <div className="hairline bg-[color:var(--color-surface-container-lowest)] px-6 py-12 text-center">
          <p className="font-display text-[15px] text-[color:var(--color-on-surface-variant)]">
            Nothing to revisit. Karma cron flags new replies daily.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col">
          {rows.map((r) => {
            const delta =
              (r.lastReplies ?? 0) - (r.previousReplies ?? 0);
            return (
              <li
                key={r.engagementId}
                className="hairline-b flex flex-col gap-2 py-4 first:border-t first:border-[color:var(--color-outline,rgba(0,0,0,0.12))]"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <Link
                    href={`/admin/threads/${r.threadId}`}
                    className="font-display text-[16px] text-[color:var(--color-primary)] hover:underline"
                  >
                    {r.threadTitle ?? "(unknown thread)"}
                  </Link>
                  <span className="shrink-0 text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-on-surface-variant)]">
                    r/{r.threadSub ?? "?"} · +{delta} new repl
                    {delta === 1 ? "y" : "ies"}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[12px] text-[color:var(--color-on-surface-variant)]">
                  <a
                    href={r.commentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[color:var(--color-primary)] underline underline-offset-2"
                  >
                    Open comment ↗
                  </a>
                  <span>karma {r.lastKarma ?? "—"}</span>
                  <span>
                    last checked{" "}
                    {r.metricsCheckedAt
                      ? r.metricsCheckedAt.toISOString().slice(0, 16).replace("T", " ")
                      : "—"}
                  </span>
                  <RevisitClearButton engagementId={r.engagementId} />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
