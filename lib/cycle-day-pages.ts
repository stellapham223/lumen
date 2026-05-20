// Cycle-day cluster manifest: single source for /cycle-day index, sitemap, internal links.
// Only days with real search intent + unique content are listed. Days without entries 404.

export type CycleDayPhase = "menstrual" | "follicular" | "ovulatory" | "luteal";

export type CycleDayPage = {
  day: number;
  phase: CycleDayPhase;
  title: string;
  description: string;
  publishedAt: string;
};

export const CYCLE_DAY_PAGES: ReadonlyArray<CycleDayPage> = [
  {
    day: 1,
    phase: "menstrual",
    title: "Cycle day 1: what is happening and how to plan it",
    description:
      "Day 1 is the first day of full menstrual flow. Hormones at cycle minimum, energy low, prostaglandins peak. Here is what to schedule and what to skip.",
    publishedAt: "2026-05-20",
  },
  {
    day: 5,
    phase: "menstrual",
    title: "Cycle day 5: energy returning, what to schedule",
    description:
      "Day 5 is typically the last bleeding day or first post-period day. Estrogen begins to rise. Mood and focus start lifting. A practical day-5 plan.",
    publishedAt: "2026-05-20",
  },
  {
    day: 10,
    phase: "follicular",
    title: "Cycle day 10: peak follicular energy and how to use it",
    description:
      "Day 10 sits in the late follicular window. Estrogen climbs, BDNF rises, openness to new work peaks. Best use of a day-10 work block.",
    publishedAt: "2026-05-20",
  },
  {
    day: 14,
    phase: "ovulatory",
    title: "Cycle day 14: ovulation, peak performance, fertile window",
    description:
      "Day 14 is the classic ovulation day on a 28-day cycle. Estrogen peaks, LH surges, verbal fluency is measurably higher. What to do, what to know.",
    publishedAt: "2026-05-20",
  },
  {
    day: 17,
    phase: "luteal",
    title: "Cycle day 17: early luteal, detail-orientation peak",
    description:
      "Day 17 sits in early luteal phase. Progesterone rises, estrogen drops, calm focus and editing capacity peak. The right work to schedule on day 17.",
    publishedAt: "2026-05-20",
  },
  {
    day: 21,
    phase: "luteal",
    title: "Cycle day 21: mid-luteal symptoms and how to manage them",
    description:
      "Day 21 is mid-luteal. Progesterone is high, body temperature is up, early PMS symptoms can appear. What is normal, what to do.",
    publishedAt: "2026-05-20",
  },
  {
    day: 25,
    phase: "luteal",
    title: "Cycle day 25: late luteal, PMS onset, demand reduction",
    description:
      "Day 25 is late luteal. Serotonin and allopregnanolone drop, PMS symptoms peak for many. A practical demand-reduction plan for day 25.",
    publishedAt: "2026-05-20",
  },
  {
    day: 28,
    phase: "luteal",
    title: "Cycle day 28: pre-period, what is happening and what comes next",
    description:
      "Day 28 is the last cycle day on a 28-day cycle. Estrogen and progesterone fall sharply, period imminent. What to expect physically and mentally.",
    publishedAt: "2026-05-20",
  },
] as const;
