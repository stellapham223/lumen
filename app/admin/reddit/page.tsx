import type { Metadata } from "next";
import Link from "next/link";
import { listSubs, getSubByName } from "@/lib/db/queries";
import {
  WARMUP_SCHEDULE,
  AGE_GATE_CLEAR_DATE,
  findWarmupDay,
  todayLocalISO,
} from "@/lib/reddit/warmup-schedule";
import { CopyPromptButton } from "@/components/CopyPromptButton";
import type { CdSub } from "@/lib/db/schema";

export const metadata: Metadata = {
  title: "Admin · Reddit warmup",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function buildGenericPrompt(subName: string | null): string {
  if (!subName) return "";
  return `You are helping me write 2 high-quality Reddit comments in r/${subName}.

Constraints:
- Account is in warmup phase. NO Lumen links yet. NO self-promotion.
- 100 to 300 words per comment. Lead with empathy if topic is sensitive.
- Cite peer-reviewed sources when claiming evidence (Sundstrom-Poromaa 2014, McNulty 2024, ACOG, Cochrane reviews).
- Match the sub's tone, vocabulary, and length norms.
- Avoid AI-flag phrasing: no em dashes, no "delve into", no "it's important to note", no overly formal hedging.

Process:
1. I will paste 1-2 threads from r/${subName} sorted by New.
2. For each thread, draft 1 comment that adds real value (information the OP did not already have, with citation).
3. Show the comment as plain text, ready to paste.`;
}

function buildPerSubPrompt(sub: CdSub | undefined, subName: string | null): string {
  if (!sub || !sub.promptTemplate) return buildGenericPrompt(subName);
  return `${sub.promptTemplate}

Process:
1. I will paste 1-2 threads from r/${sub.name} sorted by New.
2. For each thread, draft 1 comment that adds real value.
3. Show the comment as plain text, ready to paste.`;
}

export default async function AdminRedditWarmupPage() {
  const today = todayLocalISO();
  const todayDay = findWarmupDay(today);

  let subs: CdSub[] = [];
  let dbError: string | null = null;
  try {
    subs = await listSubs({ onlyActive: true });
  } catch (err) {
    dbError = err instanceof Error ? err.message : "DB unreachable";
  }

  const todaySub = todayDay?.focusSub
    ? await getSubByName(todayDay.focusSub).catch(() => undefined)
    : undefined;
  const todayPrompt = buildPerSubPrompt(todaySub, todayDay?.focusSub ?? null);

  const ageGateDate = new Date(`${AGE_GATE_CLEAR_DATE}T00:00:00`);
  const todayDate = new Date(`${today}T00:00:00`);
  const daysToGate = Math.max(
    0,
    Math.round((ageGateDate.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24)),
  );

  return (
    <main className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <span className="eyebrow text-[color:var(--color-primary)]">Reddit</span>
        <h1 className="font-display text-[28px] font-medium text-[color:var(--color-primary)]">
          Warmup workflow
        </h1>
        <p className="text-[14px] text-[color:var(--color-on-surface-variant)]">
          15-day comment-only routine before age gate clears on {AGE_GATE_CLEAR_DATE}
          {" "}
          ({daysToGate} days from today). Daily target: 30 minutes, 2 quality
          comments, NO Lumen links. Full playbook in{" "}
          <span className="font-mono text-[12px]">docs/REDDIT_KARMA_PREP_2WEEKS.md</span>.
        </p>
      </div>

      {/* Today's task card */}
      {todayDay ? (
        <section className="hairline bg-[color:var(--color-surface-container-lowest)] p-6 sm:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <span className="eyebrow text-[color:var(--color-primary)]">
                Today · {todayDay.dayOfWeek} {today} · Day {todayDay.day} of 15
              </span>
              <h2 className="mt-1 font-display text-[24px] font-medium text-[color:var(--color-primary)]">
                {todayDay.focusSub
                  ? `Focus: r/${todayDay.focusSub}`
                  : "Off day (weekend)"}
              </h2>
            </div>
            <span className="text-[12px] uppercase tracking-[0.16em] text-[color:var(--color-on-surface-variant)]">
              Karma target {todayDay.karmaTarget}
            </span>
          </div>

          <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--color-on-surface)]">
            {todayDay.note}
          </p>

          {todayDay.focusSub && (
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href={`https://www.reddit.com/r/${todayDay.focusSub}/new/`}
                target="_blank"
                rel="noopener noreferrer"
                className="hairline border border-[color:var(--color-primary)] px-4 py-2 font-display text-[12px] uppercase tracking-[0.16em] text-[color:var(--color-primary)] transition-opacity hover:opacity-80"
              >
                Open r/{todayDay.focusSub} (New) ↗
              </a>
              <a
                href={`https://www.reddit.com/r/${todayDay.focusSub}/top/?t=week`}
                target="_blank"
                rel="noopener noreferrer"
                className="hairline border border-[color:var(--color-primary)] px-4 py-2 font-display text-[12px] uppercase tracking-[0.16em] text-[color:var(--color-primary)] transition-opacity hover:opacity-80"
              >
                Top (week) ↗
              </a>
              <CopyPromptButton text={todayPrompt} label="Copy comment prompt" />
              {!todaySub?.promptTemplate && (
                <span className="text-[11px] italic text-[color:var(--color-on-surface-variant)]">
                  Using generic prompt. Add per-sub template at
                  {" "}
                  <Link href="/admin/subs" className="underline">
                    /admin/subs
                  </Link>
                  .
                </span>
              )}
            </div>
          )}
        </section>
      ) : (
        <section className="hairline bg-[color:var(--color-surface-container-lowest)] p-6">
          <p className="text-[14px] text-[color:var(--color-on-surface-variant)]">
            Today ({today}) is outside the 15-day warmup window. Either before
            Day 1 ({WARMUP_SCHEDULE[0].date}) or after Day 15 (
            {WARMUP_SCHEDULE[WARMUP_SCHEDULE.length - 1].date}).
          </p>
        </section>
      )}

      {/* All subs with copy buttons */}
      <section className="flex flex-col gap-4">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-display text-[20px] font-medium text-[color:var(--color-primary)]">
            All monitored subs
          </h2>
          <Link
            href="/admin/subs"
            className="text-[12px] uppercase tracking-[0.16em] text-[color:var(--color-primary)] hover:underline"
          >
            Edit subs →
          </Link>
        </div>

        {dbError && (
          <p className="text-[12px] text-[color:var(--color-error,#b00020)]">
            DB error: {dbError}. Falling back to static list. Run migration to
            enable editable subs.
          </p>
        )}

        {subs.length === 0 ? (
          <p className="text-[14px] text-[color:var(--color-on-surface-variant)]">
            No active subs yet. Go to{" "}
            <Link href="/admin/subs" className="underline">
              /admin/subs
            </Link>{" "}
            to add some.
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {subs.map((sub) => (
              <li
                key={sub.id}
                className="hairline flex flex-col gap-2 bg-[color:var(--color-surface-container-lowest)] p-4"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-[16px] font-medium text-[color:var(--color-primary)]">
                      r/{sub.name}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-on-surface-variant)]">
                      {sub.members || "—"} · {sub.strictness}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={`https://www.reddit.com/r/${sub.name}/new/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[12px] uppercase tracking-[0.16em] text-[color:var(--color-primary)] hover:underline"
                    >
                      Open ↗
                    </a>
                    <CopyPromptButton
                      text={buildPerSubPrompt(sub, sub.name)}
                      label="Copy prompt"
                    />
                  </div>
                </div>
                {sub.notes && (
                  <p className="text-[12px] italic text-[color:var(--color-on-surface-variant)]">
                    {sub.notes}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Full 15-day schedule */}
      <section className="flex flex-col gap-3">
        <h2 className="font-display text-[20px] font-medium text-[color:var(--color-primary)]">
          15-day schedule
        </h2>
        <div className="hairline overflow-x-auto bg-[color:var(--color-surface-container-lowest)]">
          <table className="w-full text-[12px]">
            <thead className="text-[10px] uppercase tracking-[0.16em] text-[color:var(--color-on-surface-variant)]">
              <tr className="border-b border-[color:var(--color-outline,rgba(0,0,0,0.12))]">
                <th className="px-3 py-2 text-left">Day</th>
                <th className="px-3 py-2 text-left">Date</th>
                <th className="px-3 py-2 text-left">Focus sub</th>
                <th className="px-3 py-2 text-right">Karma target</th>
                <th className="px-3 py-2 text-left">Note</th>
              </tr>
            </thead>
            <tbody>
              {WARMUP_SCHEDULE.map((d) => {
                const isToday = d.date === today;
                return (
                  <tr
                    key={d.day}
                    className={`border-b border-[color:var(--color-outline,rgba(0,0,0,0.06))] ${
                      isToday ? "bg-[color:var(--color-primary)]/5 font-semibold" : ""
                    }`}
                  >
                    <td className="px-3 py-2">{d.day}</td>
                    <td className="px-3 py-2">
                      {d.date} ({d.dayOfWeek})
                    </td>
                    <td className="px-3 py-2">
                      {d.focusSub ? `r/${d.focusSub}` : <span className="opacity-50">off</span>}
                    </td>
                    <td className="px-3 py-2 text-right">{d.karmaTarget}</td>
                    <td className="px-3 py-2 text-[color:var(--color-on-surface-variant)]">
                      {d.note}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
