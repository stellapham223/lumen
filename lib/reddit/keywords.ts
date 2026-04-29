// Keywords used to match thread titles + bodies for Lumen relevance.
// A thread matches if it contains at least one keyword (case-insensitive).
// Tune this list as you see false positives/negatives in the dashboard.

export const KEYWORDS: readonly string[] = [
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

export function matchKeywords(text: string): string[] {
  const lower = text.toLowerCase();
  return KEYWORDS.filter((k) => lower.includes(k));
}
