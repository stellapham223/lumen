// Registry for the 5 Tier 1 calculator pages (Phase 3.2).
// Single source for: sitemap, internal links, indexing API scope.

export type CalculatorMode =
  | "cycle-phase"
  | "ovulation"
  | "luteal-phase"
  | "follicular-phase"
  | "period-prediction";

export interface CalculatorPage {
  slug: CalculatorMode;
  title: string;
  description: string;
  publishedAt: string;
}

export const CALCULATOR_PAGES: ReadonlyArray<CalculatorPage> = [
  {
    slug: "cycle-phase",
    title: "Cycle phase calculator: what phase am I in right now?",
    description:
      "Free cycle phase calculator. Enter your last period and cycle length, see which of the four menstrual phases you are in today, day in phase, and what is coming next. No signup.",
    publishedAt: "2026-05-19",
  },
  {
    slug: "ovulation",
    title: "Ovulation calculator: when do I ovulate?",
    description:
      "Free ovulation calculator. Estimates your ovulation day and fertile window from your cycle length and last period start. Uses the standard luteal-phase model with caveats explained.",
    publishedAt: "2026-05-19",
  },
  {
    slug: "luteal-phase",
    title: "Luteal phase calculator: when does my luteal phase start?",
    description:
      "Free luteal phase calculator. Shows luteal start date, end date, and days remaining. Plus what to expect in the luteal phase and how it differs from PMS.",
    publishedAt: "2026-05-19",
  },
  {
    slug: "follicular-phase",
    title: "Follicular phase calculator: when is my follicular phase?",
    description:
      "Free follicular phase calculator. Shows follicular start date, end date, and days until it begins. Plus what your body does during follicular phase and why it matters.",
    publishedAt: "2026-05-19",
  },
  {
    slug: "period-prediction",
    title: "Period predictor: when is my next period?",
    description:
      "Free period predictor. Calculates your next 3 period start dates from your cycle length and last period. Honest about model limits for irregular cycles.",
    publishedAt: "2026-05-19",
  },
] as const;
