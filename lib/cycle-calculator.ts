export type Phase = "menstrual" | "follicular" | "ovulatory" | "luteal";

export type EnergyLevel = "low" | "rising" | "peak" | "declining";

export interface CycleInput {
  lastPeriodStart: Date;
  cycleLength: number;
  periodLength: number;
}

export interface DayInfo {
  date: Date;
  dayInCycle: number;
  phase: Phase;
  dayInPhase: number;
  phaseLength: number;
  energy: EnergyLevel;
}

export interface CycleStatus extends DayInfo {
  daysToNextPhase: number;
  nextPhase: Phase;
  nextPeriodDate: Date;
  schedule: DayInfo[];
}

const MS_PER_DAY = 1000 * 60 * 60 * 24;

const phaseEnergy: Record<Phase, EnergyLevel> = {
  menstrual: "low",
  follicular: "rising",
  ovulatory: "peak",
  luteal: "declining",
};

const phaseOrder: Phase[] = ["menstrual", "follicular", "ovulatory", "luteal"];

function nextPhaseOf(phase: Phase): Phase {
  const idx = phaseOrder.indexOf(phase);
  return phaseOrder[(idx + 1) % phaseOrder.length];
}

function startOfDay(d: Date): Date {
  const out = new Date(d);
  out.setHours(0, 0, 0, 0);
  return out;
}

function addDays(d: Date, days: number): Date {
  const out = new Date(d);
  out.setDate(out.getDate() + days);
  return out;
}

function daysBetween(a: Date, b: Date): number {
  const aStart = startOfDay(a).getTime();
  const bStart = startOfDay(b).getTime();
  return Math.round((aStart - bStart) / MS_PER_DAY);
}

function getPhaseBoundaries(cycleLength: number, periodLength: number) {
  const ovulationDay = Math.max(cycleLength - 14, periodLength + 4);
  return {
    menstrualEnd: periodLength,
    follicularEnd: ovulationDay - 2,
    ovulatoryEnd: ovulationDay + 1,
    lutealEnd: cycleLength,
    ovulationDay,
  };
}

function getPhaseForDay(
  dayInCycle: number,
  cycleLength: number,
  periodLength: number,
): { phase: Phase; dayInPhase: number; phaseLength: number } {
  const b = getPhaseBoundaries(cycleLength, periodLength);

  if (dayInCycle <= b.menstrualEnd) {
    return {
      phase: "menstrual",
      dayInPhase: dayInCycle,
      phaseLength: b.menstrualEnd,
    };
  }
  if (dayInCycle <= b.follicularEnd) {
    return {
      phase: "follicular",
      dayInPhase: dayInCycle - b.menstrualEnd,
      phaseLength: b.follicularEnd - b.menstrualEnd,
    };
  }
  if (dayInCycle <= b.ovulatoryEnd) {
    return {
      phase: "ovulatory",
      dayInPhase: dayInCycle - b.follicularEnd,
      phaseLength: b.ovulatoryEnd - b.follicularEnd,
    };
  }
  return {
    phase: "luteal",
    dayInPhase: dayInCycle - b.ovulatoryEnd,
    phaseLength: b.lutealEnd - b.ovulatoryEnd,
  };
}

export function calculateCycle(
  input: CycleInput,
  today: Date = new Date(),
): CycleStatus {
  const { lastPeriodStart, cycleLength, periodLength } = input;
  const todayStart = startOfDay(today);
  const startStart = startOfDay(lastPeriodStart);

  const daysSince = daysBetween(todayStart, startStart);
  const dayInCycle = ((daysSince % cycleLength) + cycleLength) % cycleLength + 1;

  const { phase, dayInPhase, phaseLength } = getPhaseForDay(
    dayInCycle,
    cycleLength,
    periodLength,
  );

  const daysToNextPhase = phaseLength - dayInPhase + 1;
  const nextPhase = nextPhaseOf(phase);

  const cyclesElapsed = Math.floor(daysSince / cycleLength);
  const nextPeriodDate = addDays(startStart, (cyclesElapsed + 1) * cycleLength);

  const schedule: DayInfo[] = [];
  for (let i = 0; i < 28; i++) {
    const date = addDays(todayStart, i);
    const days = daysBetween(date, startStart);
    const dInCycle = ((days % cycleLength) + cycleLength) % cycleLength + 1;
    const p = getPhaseForDay(dInCycle, cycleLength, periodLength);
    schedule.push({
      date,
      dayInCycle: dInCycle,
      phase: p.phase,
      dayInPhase: p.dayInPhase,
      phaseLength: p.phaseLength,
      energy: phaseEnergy[p.phase],
    });
  }

  return {
    date: todayStart,
    dayInCycle,
    phase,
    dayInPhase,
    phaseLength,
    energy: phaseEnergy[phase],
    daysToNextPhase,
    nextPhase,
    nextPeriodDate,
    schedule,
  };
}
