import type { Metadata } from "next";
import Link from "next/link";
import { listThreads, countThreadsByStatus } from "@/lib/db/queries";
import { THREAD_STATUSES, type ThreadStatus } from "@/lib/db/schema";
import { AdminStatusTabs } from "@/components/AdminStatusTabs";

export const metadata: Metadata = {
  title: "Admin · Giveback",
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

export default async function AdminGivebackPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status: statusParam } = await searchParams;
  const status = parseStatus(statusParam);

  const [threads, counts] = await Promise.all([
    listThreads({ category: "giveback", status, limit: 100 }),
    countThreadsByStatus("giveback"),
  ]);

  return (
    <main className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="eyebrow text-[color:var(--color-primary)]">Giveback</span>
        <h1 className="font-display text-[28px] font-medium text-[color:var(--color-primary)]">
          Karma-building queue
        </h1>
        <p className="text-[14px] text-[color:var(--color-on-surface-variant)]">
          Adjacent-audience threads where you give pure value. <strong>No Lumen
          link, no brand mention</strong>. This is your 70% of the 70/30 ratio.
        </p>
      </div>

      <AdminStatusTabs basePath="/admin/giveback" current={status} counts={counts} />

      {threads.length === 0 ? (
        <div className="hairline bg-[color:var(--color-surface-container-lowest)] px-6 py-12 text-center">
          <p className="font-display text-[15px] text-[color:var(--color-on-surface-variant)]">
            No giveback threads in this view.
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
                  Adjacent: {t.matchedKeywords.join(", ")}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
