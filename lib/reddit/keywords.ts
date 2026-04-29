// Two keyword tiers:
// - LUMEN_KEYWORDS: thread is directly relevant to a Lumen blog post.
//   When matched, the thread goes into the main "Threads" queue and the
//   prompt generator can suggest dropping a Lumen blog link.
// - GIVEBACK_KEYWORDS: thread is in the same audience but not on a topic
//   Lumen has content for. These go into the "Giveback" queue: pure
//   karma-building, zero link drop, 100% helpful answers.

export const LUMEN_KEYWORDS: readonly string[] = [
  "cycle sync",
  "cycle syncing",
  "follicular",
  "luteal",
  "ovulat",
  "menstrual cycle",
  "period productivity",
  "phase based",
  "cycle aware",
  "hormonal phase",
  "tracking my cycle",
  "schedule by phase",
  "period and work",
  "pms productivity",
  "cycle and work",
  "energy and cycle",
];

export const GIVEBACK_KEYWORDS: readonly string[] = [
  "burnout",
  "deep work",
  "focus tips",
  "productive day",
  "morning routine",
  "energy crash",
  "brain fog",
  "circadian",
  "sleep quality",
  "iron deficien",
  "magnesium",
  "stress and",
  "balance hormones",
  "endometri",
  "polycystic",
  "thyroid",
  "perimenopause",
  "habit stacking",
  "time block",
];

export type CategorizedMatch = {
  category: "lumen" | "giveback";
  matched: string[];
};

function matchAgainst(text: string, list: readonly string[]): string[] {
  const lower = text.toLowerCase();
  return list.filter((k) => lower.includes(k));
}

export function categorizeText(text: string): CategorizedMatch | null {
  const lumenMatches = matchAgainst(text, LUMEN_KEYWORDS);
  if (lumenMatches.length > 0) {
    return { category: "lumen", matched: lumenMatches };
  }
  const givebackMatches = matchAgainst(text, GIVEBACK_KEYWORDS);
  if (givebackMatches.length > 0) {
    return { category: "giveback", matched: givebackMatches };
  }
  return null;
}
