import type { CycleInput } from "./cycle-calculator";

const STORAGE_KEY = "cycle-flow:input:v1";

interface StoredInput {
  lastPeriodStart: string;
  cycleLength: number;
  periodLength: number;
  savedAt: string;
}

export function saveCycleInput(input: CycleInput): void {
  if (typeof window === "undefined") return;
  try {
    const payload: StoredInput = {
      lastPeriodStart: input.lastPeriodStart.toISOString(),
      cycleLength: input.cycleLength,
      periodLength: input.periodLength,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // ignore storage errors (private mode, quota, etc.)
  }
}

export function loadCycleInput(): CycleInput | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredInput>;
    if (
      typeof parsed.lastPeriodStart !== "string" ||
      typeof parsed.cycleLength !== "number" ||
      typeof parsed.periodLength !== "number"
    ) {
      return null;
    }
    return {
      lastPeriodStart: new Date(parsed.lastPeriodStart),
      cycleLength: parsed.cycleLength,
      periodLength: parsed.periodLength,
    };
  } catch {
    return null;
  }
}

export function clearCycleInput(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
