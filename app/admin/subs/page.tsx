import type { Metadata } from "next";
import { listSubs } from "@/lib/db/queries";
import { SubsEditor } from "@/components/SubsEditor";

export const metadata: Metadata = {
  title: "Admin · Subs",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminSubsPage() {
  let subs: Awaited<ReturnType<typeof listSubs>> = [];
  let dbError: string | null = null;
  try {
    subs = await listSubs();
  } catch (err) {
    dbError = err instanceof Error ? err.message : "DB unreachable";
  }

  return (
    <main className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="eyebrow text-[color:var(--color-primary)]">Reddit</span>
        <h1 className="font-display text-[28px] font-medium text-[color:var(--color-primary)]">
          Monitored subs
        </h1>
        <p className="text-[14px] text-[color:var(--color-on-surface-variant)]">
          Source of truth for the daily scrape and the warmup workflow. Inactive
          subs are skipped by the cron. Per-sub prompt templates feed the copy
          buttons on the warmup page.
        </p>
      </div>

      {dbError ? (
        <div className="hairline bg-[color:var(--color-surface-container-lowest)] p-4">
          <p className="text-[14px] text-[color:var(--color-error,#b00020)]">
            Database error: {dbError}
          </p>
          <p className="mt-2 text-[12px] text-[color:var(--color-on-surface-variant)]">
            Did you run the migration?
            {" "}
            <code className="font-mono">
              psql $DATABASE_URL -f lib/db/migrations/0001_add_cd_subs.sql
            </code>
          </p>
        </div>
      ) : subs.length === 0 ? (
        <div className="hairline bg-[color:var(--color-surface-container-lowest)] p-4">
          <p className="text-[14px] text-[color:var(--color-on-surface-variant)]">
            No subs configured yet. Run the seed migration or add one below.
            Until then, the scrape job falls back to the hardcoded list in
            <code className="font-mono"> lib/reddit/subs.ts</code>.
          </p>
          <SubsEditor subs={[]} />
        </div>
      ) : (
        <SubsEditor subs={subs} />
      )}
    </main>
  );
}
