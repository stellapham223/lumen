// Warmup phase model — derived from docs/REDDIT_SEEDING_PLAYBOOK.md.
// Each phase has a day range, a karma gate to advance, and a posture summary.

export type WarmupPhase = {
  number: 1 | 2 | 3 | 4;
  label: string;
  startDay: number;
  endDay: number;
  karmaGate: number;
  posture: string;
};

export const PHASES: readonly WarmupPhase[] = [
  {
    number: 1,
    label: "Setup",
    startDay: 1,
    endDay: 14,
    karmaGate: 100,
    posture: "0 link drops. 100% helpful comments only.",
  },
  {
    number: 2,
    label: "Seeding light",
    startDay: 15,
    endDay: 28,
    karmaGate: 200,
    posture: "70/30 ratio. 1 link drop per 5 helpful comments.",
  },
  {
    number: 3,
    label: "Scaling",
    startDay: 29,
    endDay: 56,
    karmaGate: 500,
    posture: "1 self-post / week. Indexable threads target.",
  },
  {
    number: 4,
    label: "Optimize",
    startDay: 57,
    endDay: 90,
    karmaGate: 1000,
    posture: "Double down on top sub. Drop bottom 2.",
  },
] as const;

export type WarmupStatus = {
  phase: WarmupPhase;
  daysSinceCreation: number;
  daysIntoPhase: number;
  daysUntilNextPhase: number;
  currentKarma: number | null;
  karmaGate: number;
  karmaProgress: number;
  pastFinalPhase: boolean;
};

export function computeWarmupStatus(input: {
  accountCreatedAt: Date | null;
  currentKarma: number | null;
  now?: Date;
}): WarmupStatus | null {
  if (!input.accountCreatedAt) return null;
  const now = input.now ?? new Date();
  const days = Math.max(
    1,
    Math.floor((now.getTime() - input.accountCreatedAt.getTime()) / (1000 * 60 * 60 * 24)),
  );
  const phase = PHASES.find((p) => days >= p.startDay && days <= p.endDay) ?? PHASES[PHASES.length - 1];
  const daysIntoPhase = days - phase.startDay + 1;
  const daysUntilNextPhase = Math.max(0, phase.endDay - days);
  const karmaGate = phase.karmaGate;
  const karmaProgress =
    input.currentKarma === null
      ? 0
      : Math.min(1, input.currentKarma / karmaGate);
  return {
    phase,
    daysSinceCreation: days,
    daysIntoPhase,
    daysUntilNextPhase,
    currentKarma: input.currentKarma,
    karmaGate,
    karmaProgress,
    pastFinalPhase: days > PHASES[PHASES.length - 1].endDay,
  };
}
