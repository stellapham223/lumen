// 15-day Reddit karma warmup schedule mirrored from
// docs/REDDIT_KARMA_PREP_2WEEKS.md. Day 1 starts 2026-05-15.
// Each entry maps a date to the focus sub for that day and the cumulative
// karma target. Off-days have no sub.

export const WARMUP_START_DATE = "2026-05-15";
export const AGE_GATE_CLEAR_DATE = "2026-05-30";

export type WarmupDay = {
  day: number;
  date: string; // YYYY-MM-DD
  dayOfWeek: string;
  focusSub: string | null;
  karmaTarget: number;
  note: string;
};

export const WARMUP_SCHEDULE: readonly WarmupDay[] = [
  { day: 1, date: "2026-05-15", dayOfWeek: "Fri", focusSub: "CycleSyncing", karmaTarget: 5, note: "Day 1. Read top 10 posts of past week. 2 comments. Tone-match." },
  { day: 2, date: "2026-05-16", dayOfWeek: "Sat", focusSub: null, karmaTarget: 5, note: "Weekend off. Reddit notices 'human' patterns." },
  { day: 3, date: "2026-05-17", dayOfWeek: "Sun", focusSub: null, karmaTarget: 5, note: "Weekend off." },
  { day: 4, date: "2026-05-18", dayOfWeek: "Mon", focusSub: "WomensHealth", karmaTarget: 12, note: "Vet sidebar. 2 comments. Avoid medical advice, share experiences." },
  { day: 5, date: "2026-05-19", dayOfWeek: "Tue", focusSub: "Periods", karmaTarget: 22, note: "Test E gate measurement day (see TEST_E_MEASUREMENT.md). Then 2 Reddit comments." },
  { day: 6, date: "2026-05-20", dayOfWeek: "Wed", focusSub: "femalefitness", karmaTarget: 32, note: "Workout/cycle questions. Hedge claims." },
  { day: 7, date: "2026-05-21", dayOfWeek: "Thu", focusSub: "CycleSyncing", karmaTarget: 42, note: "Return to anchor sub. Now 7 days of comment history." },
  { day: 8, date: "2026-05-22", dayOfWeek: "Fri", focusSub: "xxfitness", karmaTarget: 50, note: "Ship Post #11 today. 2 Reddit comments, NO link drop yet." },
  { day: 9, date: "2026-05-23", dayOfWeek: "Sat", focusSub: null, karmaTarget: 50, note: "Weekend off." },
  { day: 10, date: "2026-05-24", dayOfWeek: "Sun", focusSub: null, karmaTarget: 50, note: "Weekend off." },
  { day: 11, date: "2026-05-25", dayOfWeek: "Mon", focusSub: "PCOS", karmaTarget: 60, note: "Sensitive audience. Lead with empathy. Recheck automod since last attempt 2026-04-30." },
  { day: 12, date: "2026-05-26", dayOfWeek: "Tue", focusSub: "CycleSyncing", karmaTarget: 70, note: "Ship Post #12 today (follicular hub). 2 Reddit comments." },
  { day: 13, date: "2026-05-27", dayOfWeek: "Wed", focusSub: "AskWomenOver30", karmaTarget: 80, note: "Broader audience. Stay on cycle topics." },
  { day: 14, date: "2026-05-28", dayOfWeek: "Thu", focusSub: "getdisciplined", karmaTarget: 90, note: "Productivity angle. NO link (comment-only sub per playbook)." },
  { day: 15, date: "2026-05-29", dayOfWeek: "Fri", focusSub: "CycleSyncing", karmaTarget: 100, note: "Day before age gate clears. Audit karma. Plan first link drop." },
];

export function findWarmupDay(today: string): WarmupDay | null {
  return WARMUP_SCHEDULE.find((d) => d.date === today) ?? null;
}

export function todayLocalISO(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
