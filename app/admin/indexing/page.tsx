import type { Metadata } from "next";
import { listRecentIndexingLogs } from "@/lib/db/queries";
import { IndexingControls } from "@/components/IndexingControls";

export const metadata: Metadata = {
  title: "Admin · Indexing",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function formatAge(date: Date): string {
  const ms = Date.now() - date.getTime();
  const minutes = Math.floor(ms / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default async function IndexingPage() {
  // Recent log fetch is best-effort; if the table does not exist yet (migration
  // not applied), we render an empty list rather than 500-ing the page.
  let logs: Awaited<ReturnType<typeof listRecentIndexingLogs>> = [];
  let logError: string | null = null;
  try {
    logs = await listRecentIndexingLogs(40);
  } catch (err) {
    logError =
      err instanceof Error
        ? err.message
        : "Could not load indexing log. Migration 0002 may not be applied yet.";
  }

  const googleOk = logs.filter((l) => l.provider === "google" && l.status === "ok").length;
  const googleFail = logs.filter((l) => l.provider === "google" && l.status === "fail").length;
  const indexnowOk = logs.filter((l) => l.provider === "indexnow" && l.status === "ok").length;
  const indexnowFail = logs.filter((l) => l.provider === "indexnow" && l.status === "fail").length;

  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-display text-[28px] sm:text-[32px] text-[color:var(--color-primary)]">
          Indexing
        </h1>
        <p className="mt-2 max-w-[680px] text-[14px] text-[color:var(--color-on-surface-variant)]">
          Submit URLs to Google Indexing API (gray area for non-JobPosting
          content but widely used) and to IndexNow (Bing + Yandex, fully
          supported). Recently-submitted URLs are skipped automatically.
        </p>
      </header>

      <section>
        <h2 className="mb-4 font-display text-[20px] text-[color:var(--color-on-surface)]">
          Submit
        </h2>
        <IndexingControls />
      </section>

      <section>
        <h2 className="mb-4 font-display text-[20px] text-[color:var(--color-on-surface)]">
          Recent activity (last 40)
        </h2>
        <div className="mb-3 flex flex-wrap gap-4 text-[13px] text-[color:var(--color-on-surface-variant)]">
          <span>
            Google: {googleOk} ok · {googleFail} fail
          </span>
          <span>
            IndexNow: {indexnowOk} ok · {indexnowFail} fail
          </span>
        </div>
        {logError ? (
          <div className="hairline border-l-2 border-amber-600 p-3 text-[13px] text-amber-800">
            {logError}
          </div>
        ) : logs.length === 0 ? (
          <p className="text-[14px] text-[color:var(--color-on-surface-variant)]">
            No submissions yet. Use the form above to submit URLs.
          </p>
        ) : (
          <ul className="hairline divide-y divide-[color:var(--color-outline-variant)]">
            {logs.map((l) => (
              <li key={l.id} className="grid grid-cols-12 gap-2 px-3 py-2 text-[12px]">
                <span className="col-span-2 font-medium uppercase tracking-[0.08em] text-[color:var(--color-on-surface-variant)]">
                  {l.provider}
                </span>
                <span
                  className={`col-span-1 font-mono ${
                    l.status === "ok" ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {l.responseStatus}
                </span>
                <span className="col-span-7 truncate">{l.url}</span>
                <span className="col-span-2 text-right text-[color:var(--color-on-surface-variant)]">
                  {formatAge(new Date(l.submittedAt))}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
