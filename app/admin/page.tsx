import type { Metadata } from "next";
import Link from "next/link";
import { listThreads, countThreadsByStatus } from "@/lib/db/queries";
import { THREAD_STATUSES, type ThreadStatus } from "@/lib/db/schema";
import { AdminStatusTabs } from "@/components/AdminStatusTabs";
import { WarmupBanner } from "@/components/WarmupBanner";
import { AdminRefreshButton } from "@/components/AdminRefreshButton";

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

function parseStatus(input: string | undefined): ThreadStatus | "all" {
  if (input === "all") return "all";
  if (input && (THREAD_STATUSES as readonly string[]).includes(input)) {
    return input as ThreadStatus;
  }
  return "new";
}

export default async function AdminHomePage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status: statusParam } = await searchParams;
  const status = parseStatus(statusParam);

  const [threads, counts] = await Promise.all([
    listThreads({ category: "lumen", status, limit: 100 }),
    countThreadsByStatus("lumen"),
  ]);

  return (
    <main className="flex flex-col gap-6">
      <WarmupBanner />

      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between gap-4">
          <span className="eyebrow text-[color:var(--color-primary)]">Threads</span>
          <AdminRefreshButton />
        </div>
        <h1 className="font-display text-[28px] font-medium text-[color:var(--color-primary)]">
          Reddit watchlist
        </h1>
        <p className="text-[14px] text-[color:var(--color-on-surface-variant)]">
          Lumen-relevant threads. Daily auto-scrape at 8am ICT. Hit Refresh
          when you want fresher threads (Reddit posts peak in 1-3 hours).
        </p>
      </div>

      <AdminStatusTabs basePath="/admin" current={status} counts={counts} />

      {threads.length === 0 ? (
        <div className="hairline bg-[color:var(--color-surface-container-lowest)] px-6 py-12 text-center">
          <p className="font-display text-[15px] text-[color:var(--color-on-surface-variant)]">
            No threads in this view.
          </p>
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
                  r/{t.sub} · {formatAge(t.publishedAt)} ago · {t.status}
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
