import { categorizeText, type CategorizedMatch } from "./keywords";
import type { RawThread } from "./rss";

export type FilteredThread = RawThread &
  CategorizedMatch & { matchedKeywords: string[] };

export type FilterOptions = {
  maxAgeHours: number;
  now?: Date;
};

const DEFAULT_OPTIONS: FilterOptions = {
  maxAgeHours: 72,
};

export function filterThreads(
  threads: RawThread[],
  options: Partial<FilterOptions> = {},
): FilteredThread[] {
  const opts: FilterOptions = { ...DEFAULT_OPTIONS, ...options };
  const now = opts.now ?? new Date();
  const minTime = now.getTime() - opts.maxAgeHours * 60 * 60 * 1000;

  return threads.flatMap((t) => {
    if (t.publishedAt.getTime() < minTime) return [];
    const match = categorizeText(`${t.title} ${t.body}`);
    if (!match) return [];
    return [{ ...t, ...match, matchedKeywords: match.matched }];
  });
}
