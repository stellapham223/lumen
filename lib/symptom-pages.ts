// Symptom cluster manifest: single source for /symptoms index, sitemap, internal links.

export type SymptomPage = {
  slug: string;
  title: string;
  description: string;
  phase: "menstrual" | "follicular" | "ovulatory" | "luteal" | "any";
  publishedAt: string;
};

export const SYMPTOM_PAGES: ReadonlyArray<SymptomPage> = [
  {
    slug: "period-cramps-relief",
    title: "Period cramps relief: what actually works",
    description:
      "The evidence-grade list of cramp interventions: heat, NSAIDs, magnesium, movement. What helps, what is marketing, when to see a clinician.",
    phase: "menstrual",
    publishedAt: "2026-05-20",
  },
  {
    slug: "bloating-before-period",
    title: "Bloating before period: causes and what helps",
    description:
      "Premenstrual bloating is progesterone-driven sodium retention plus slowed gut motility. Why it happens, what reduces it, what does not.",
    phase: "luteal",
    publishedAt: "2026-05-20",
  },
  {
    slug: "luteal-phase-fatigue",
    title: "Luteal phase fatigue: why you are tired and what to do",
    description:
      "Late luteal fatigue is multifactorial: progesterone drop, disrupted sleep, lower insulin sensitivity, serotonin decline. The practical fixes.",
    phase: "luteal",
    publishedAt: "2026-05-20",
  },
  {
    slug: "pms-mood-swings",
    title: "PMS mood swings: mechanism and management",
    description:
      "PMS mood swings are hormone-withdrawal symptoms: estrogen, allopregnanolone, and serotonin all drop in late luteal. Evidence-graded management.",
    phase: "luteal",
    publishedAt: "2026-05-20",
  },
  {
    slug: "breast-tenderness-pms",
    title: "Breast tenderness before period: causes and relief",
    description:
      "Cyclical breast tenderness is progesterone-driven fluid retention in breast tissue. Why it peaks late luteal, what reduces it, when to see a clinician.",
    phase: "luteal",
    publishedAt: "2026-05-20",
  },
] as const;
