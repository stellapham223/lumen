import type { Metadata } from "next";
import Link from "next/link";
import { listThreads } from "@/lib/db/queries";

export const metadata: Metadata = {
  title: "Admin · Threads",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function formatAge(date: Date): string {
  const ms = Date.now() - date.getTime();
  const hours = Math.floor(ms / (60 * 60 * 1000));
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}

export default async function AdminHomePage() {
  const threads = await listThreads(100);

  return (
    <main className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="eyebrow text-[color:var(--color-primary)]">Threads</span>
        <h1 className="font-display text-[28px] font-medium text-[color:var(--color-primary)]">
          Reddit watchlist
        </h1>
        <p className="text-[14px] text-[color:var(--color-on-surface-variant)]">
          {threads.length} thread{threads.length === 1 ? "" : "s"} matching
          Lumen keywords. Scraped daily at 8am ICT.
        </p>
      </div>

      {threads.length === 0 ? (
        <div className="hairline bg-[color:var(--color-surface-container-lowest)] px-6 py-12 text-center">
          <p className="font-display text-[15px] text-[color:var(--color-on-surface-variant)]">
            No threads yet. Trigger scrape manually with:
          </p>
          <code className="mt-3 inline-block bg-[color:var(--color-background)] px-3 py-2 text-[12px]">
            curl -H &quot;Authorization: Bearer $CRON_SECRET&quot;{" "}
            https://lumencal.com/api/cron/scrape
          </code>
        </div>
      ) : (
        <ul className="flex flex-col">
          {threads.map((t) => (
            <li
              key={t.id}
              className="hairline-b flex flex-col gap-1 py-4 first:border-t first:border-[color:var(--color-outline,rgba(0,0,0,0.12))]"
            >
              <div className="flex items-baseline justify-between gap-4">
                <Link
                  href={`/admin/threads/${t.id}`}
                  className="font-display text-[16px] text-[color:var(--color-primary)] hover:underline"
                >
                  {t.title}
                </Link>
                <span className="shrink-0 text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-on-surface-variant)]">
                  r/{t.sub} · {formatAge(t.publishedAt)} ago
                </span>
              </div>
              {t.matchedKeywords.length > 0 ? (
                <p className="text-[12px] text-[color:var(--color-on-surface-variant)]">
                  Matched: {t.matchedKeywords.join(", ")}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
