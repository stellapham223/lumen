import { latestKarmaSnapshot } from "@/lib/db/queries";
import { computeWarmupStatus } from "@/lib/admin/warmup";
import { KarmaUpdateForm } from "./KarmaUpdateForm";

function envAccountCreatedAt(): Date | null {
  const raw = process.env.REDDIT_ACCOUNT_CREATED_AT;
  if (!raw) return null;
  const d = new Date(raw);
  return isNaN(d.getTime()) ? null : d;
}

export async function WarmupBanner() {
  const snapshot = await latestKarmaSnapshot();
  const accountCreatedAt = snapshot?.accountCreatedAt ?? envAccountCreatedAt();
  const status = computeWarmupStatus({
    accountCreatedAt,
    currentKarma: snapshot?.totalKarma ?? null,
  });

  if (!status) {
    return (
      <div className="hairline bg-[color:var(--color-surface-container-lowest)] px-4 py-3 text-[12px] text-[color:var(--color-on-surface-variant)]">
        Set <code className="font-mono">REDDIT_ACCOUNT_CREATED_AT</code> env var
        (e.g. <code>2026-04-29</code>) or post a karma update below.
        <KarmaUpdateForm />
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
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
        <p className="text-[12px] text-[color:var(--color-on-surface-variant)]">
          Posture: {status.phase.posture}
        </p>
        <KarmaUpdateForm
          defaultTotal={status.currentKarma ?? 0}
          defaultLink={snapshot?.linkKarma ?? 0}
          defaultComment={snapshot?.commentKarma ?? 0}
        />
      </div>
      {snapshot ? (
        <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-[color:var(--color-on-surface-variant)] opacity-70">
          Last updated {snapshot.capturedAt.toISOString().slice(0, 16).replace("T", " ")}
        </p>
      ) : null}
    </div>
  );
}
