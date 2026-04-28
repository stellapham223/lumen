export interface HormoneLevels {
  estrogen: number;
  progesterone: number;
  lh: number;
  fsh: number;
}

export interface HormoneCurvePoint extends HormoneLevels {
  dayInCycle: number;
}

const LUTEAL_LENGTH = 14;

export function getHormoneLevels(
  dayInCycle: number,
  cycleLength: number,
  periodLength: number,
): HormoneLevels {
  const ovulationDay = Math.max(cycleLength - LUTEAL_LENGTH, periodLength + 4);

  const estrogen = computeEstrogen(dayInCycle, periodLength, ovulationDay, cycleLength);
  const progesterone = computeProgesterone(dayInCycle, ovulationDay, cycleLength);
  const lh = computeLH(dayInCycle, ovulationDay);
  const fsh = computeFSH(dayInCycle, periodLength);

  return { estrogen, progesterone, lh, fsh };
}

export function getHormoneCurve(
  cycleLength: number,
  periodLength: number,
): HormoneCurvePoint[] {
  const points: HormoneCurvePoint[] = [];
  for (let day = 1; day <= cycleLength; day++) {
    points.push({
      dayInCycle: day,
      ...getHormoneLevels(day, cycleLength, periodLength),
    });
  }
  return points;
}

function computeEstrogen(
  day: number,
  periodLength: number,
  ovulationDay: number,
  cycleLength: number,
): number {
  if (day <= periodLength) return 15;
  if (day < ovulationDay - 1) {
    const progress = (day - periodLength) / Math.max(ovulationDay - 1 - periodLength, 1);
    return 20 + 65 * progress;
  }
  if (day === ovulationDay - 1) return 90;
  if (day === ovulationDay) return 70;
  if (day === ovulationDay + 1) return 60;

  const lutealDay = day - ovulationDay;
  const lutealLength = cycleLength - ovulationDay;
  const peakAt = Math.floor(lutealLength / 2);
  if (lutealDay <= peakAt) {
    return 55 + (30 / Math.max(peakAt, 1)) * lutealDay;
  }
  const decline = (lutealDay - peakAt) / Math.max(lutealLength - peakAt, 1);
  return Math.max(15, 85 - 70 * decline);
}

function computeProgesterone(
  day: number,
  ovulationDay: number,
  cycleLength: number,
): number {
  if (day < ovulationDay) return 8;
  if (day === ovulationDay) return 12;

  const lutealDay = day - ovulationDay;
  const lutealLength = cycleLength - ovulationDay;
  const peakAt = Math.floor(lutealLength * 0.6);
  if (lutealDay <= peakAt) {
    return 10 + (85 / Math.max(peakAt, 1)) * lutealDay;
  }
  const decline = (lutealDay - peakAt) / Math.max(lutealLength - peakAt, 1);
  return Math.max(15, 95 - 80 * decline);
}

function computeLH(day: number, ovulationDay: number): number {
  if (day === ovulationDay - 1) return 35;
  if (day === ovulationDay) return 95;
  if (day === ovulationDay + 1) return 30;
  return 8;
}

function computeFSH(day: number, periodLength: number): number {
  if (day >= 2 && day <= periodLength + 2) return 28;
  return 15;
}
