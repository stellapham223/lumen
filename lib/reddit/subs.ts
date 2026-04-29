// Source of truth for Reddit subreddits we monitor.
// Mirrored from docs/REDDIT_SEEDING_PLAYBOOK.md priority list.

export type SubConfig = {
  name: string;
  members: string;
  strictness: "loose" | "medium" | "strict";
};

export const SUBS: readonly SubConfig[] = [
  { name: "CycleSyncing", members: "5K", strictness: "loose" },
  { name: "WomensHealth", members: "50K", strictness: "medium" },
  { name: "Periods", members: "150K", strictness: "medium" },
  { name: "femalefitness", members: "50K", strictness: "loose" },
  { name: "xxfitness", members: "600K", strictness: "strict" },
  { name: "PCOS", members: "250K", strictness: "strict" },
  { name: "Endo", members: "80K", strictness: "strict" },
  { name: "getdisciplined", members: "2M", strictness: "strict" },
] as const;

export function rssUrl(subName: string): string {
  return `https://www.reddit.com/r/${subName}/new.rss`;
}
