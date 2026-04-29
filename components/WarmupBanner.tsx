import { latestKarmaSnapshot } from "@/lib/db/queries";
import { computeWarmupStatus } from "@/lib/admin/warmup";

export async function WarmupBanner() {
  const snapshot = await latestKarmaSnapshot();
  const status = computeWarmupStatus({
    accountCreatedAt: snapshot?.accountCreatedAt ?? null,
    currentKarma: snapshot?.totalKarma ?? null,
  });

  if (!status) {
    return (
      <div className="hairline bg-[color:var(--color-surface-container-lowest)] px-4 py-3 text-[12px] text-[color:var(--color-on-surface-variant)]">
        No karma snapshot yet. Trigger{" "}
        <code className="font-mono">/api/cron/karma-snapshot</code> to populate.
      </div>
    );
  }

  const meetsGate = (status.currentKarma ?? 0) >= status.karmaGate;
  const passedFinalPhase = status.pastFinalPhase;

  return (
    <div className="hairline bg-[color:var(--color-surface-container-lowest)] px-4 py-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-display text-[14px] font-medium text-[color:var(--color-primary)]">
          Phase {status.phase.number}: {status.phase.label}
          <span className="ml-2 text-[12px] font-normal text-[color:var(--color-on-surface-variant)]">
            Day {status.daysSinceCreation}
            {!passedFinalPhase &&
              ` of ${status.phase.endDay} · ${status.daysUntilNextPhase}d to next phase`}
          </span>
        </p>
        <p className="text-[12px] text-[color:var(--color-on-surface-variant)]">
          Karma{" "}
          <strong className="text-[color:var(--color-primary)]">
            {status.currentKarma ?? 0}
          </strong>{" "}
          / gate {status.karmaGate}
          {meetsGate ? " ✓" : ""}
        </p>
      </div>
      <div className="mt-2 h-1 w-full bg-[color:var(--color-background)]">
        <div
          className="h-full bg-[color:var(--color-primary)] transition-[width]"
          style={{ width: `${Math.round(status.karmaProgress * 100)}%` }}
        />
      </div>
      <p className="mt-2 text-[12px] text-[color:var(--color-on-surface-variant)]">
        Posture: {status.phase.posture}
      </p>
    </div>
  );
}
