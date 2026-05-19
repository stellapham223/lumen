// Registry for the 4 Tier 2 phase deep-dive pages (Phase 3.2).
// These are TOP-LEVEL /[phase] pages, not /blog/. They target the canonical
// phase-keyword intent (Healthline-style reference). The /blog/[phase]-complete-guide
// pages remain as audience-specific lifestyle deep-dives (ambitious-women framing).

import type { CalculatorMode } from "./calculator-pages";

export type PhaseSlug =
  | "menstrual-phase"
  | "follicular-phase"
  | "ovulatory-phase"
  | "luteal-phase";

export interface PhasePage {
  slug: PhaseSlug;
  title: string;
  description: string;
  publishedAt: string;
  // Calculator widget embedded inline on the page
  calculatorMode: CalculatorMode | null;
}

export const PHASE_PAGES: ReadonlyArray<PhasePage> = [
  {
    slug: "menstrual-phase",
    title: "Menstrual phase: hormones, symptoms, and what is normal",
    description:
      "An evidence-based reference on the menstrual phase: what hormones do, what symptoms are typical, what is not, and when to see a doctor. Plus an embedded cycle calculator.",
    publishedAt: "2026-05-19",
    calculatorMode: "cycle-phase",
  },
  {
    slug: "follicular-phase",
    title: "Follicular phase: hormones, energy, and what to expect",
    description:
      "An evidence-based reference on the follicular phase: hormone pattern, cognition shifts, common variations (PCOS/PMOS, perimenopause, post-pill), and an embedded calculator.",
    publishedAt: "2026-05-19",
    calculatorMode: "follicular-phase",
  },
  {
    slug: "ovulatory-phase",
    title: "Ovulatory phase: when ovulation happens and how to know",
    description:
      "An evidence-based reference on the ovulatory phase: the 3 to 5 day window of egg release, how to detect ovulation, fertile window math, and an embedded ovulation calculator.",
    publishedAt: "2026-05-19",
    calculatorMode: "ovulation",
  },
  {
    slug: "luteal-phase",
    title: "Luteal phase: hormones, PMS, and what is normal",
    description:
      "An evidence-based reference on the luteal phase: progesterone biology, PMS vs PMDD, body temperature rise, common symptoms, and when to see a doctor. Plus an embedded calculator.",
    publishedAt: "2026-05-19",
    calculatorMode: "luteal-phase",
  },
] as const;
