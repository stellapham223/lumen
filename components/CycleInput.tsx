"use client";

import { useState } from "react";
import { MaterialIcon } from "./MaterialIcon";
import type { CycleInput as CycleInputType } from "@/lib/cycle-calculator";

interface Props {
  onSubmit: (input: CycleInputType) => void;
  initialValues?: Partial<CycleInputType>;
}

export function CycleInput({ onSubmit, initialValues }: Props) {
  const today = new Date();
  const defaultDate = initialValues?.lastPeriodStart
    ? formatDateInput(initialValues.lastPeriodStart)
    : formatDateInput(today);

  const [lastPeriodStart, setLastPeriodStart] = useState(defaultDate);
  const [cycleLength, setCycleLength] = useState(initialValues?.cycleLength ?? 28);
  const [periodLength, setPeriodLength] = useState(initialValues?.periodLength ?? 5);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      lastPeriodStart: new Date(lastPeriodStart + "T00:00:00"),
      cycleLength,
      periodLength,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="lastPeriod"
          className="eyebrow text-[color:var(--color-on-surface)]"
        >
          First day of last period
        </label>
        <input
          id="lastPeriod"
          type="date"
          value={lastPeriodStart}
          max={formatDateInput(today)}
          onChange={(e) => setLastPeriodStart(e.target.value)}
          className="border-0 border-b border-[color:var(--color-primary)]/20 bg-transparent px-0 py-2 text-[16px] text-[color:var(--color-primary)] transition-colors focus:border-[color:var(--color-primary)] focus:outline-none focus:ring-0"
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="cycleLength"
            className="eyebrow text-[color:var(--color-on-surface)]"
          >
            Cycle length
          </label>
          <input
            id="cycleLength"
            type="number"
            min={21}
            max={45}
            placeholder="28"
            value={cycleLength}
            onChange={(e) => setCycleLength(Number(e.target.value))}
            className="border-0 border-b border-[color:var(--color-primary)]/20 bg-transparent px-0 py-2 text-[16px] text-[color:var(--color-primary)] transition-colors focus:border-[color:var(--color-primary)] focus:outline-none focus:ring-0"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="periodLength"
            className="eyebrow text-[color:var(--color-on-surface)]"
          >
            Period length
          </label>
          <input
            id="periodLength"
            type="number"
            min={2}
            max={10}
            placeholder="5"
            value={periodLength}
            onChange={(e) => setPeriodLength(Number(e.target.value))}
            className="border-0 border-b border-[color:var(--color-primary)]/20 bg-transparent px-0 py-2 text-[16px] text-[color:var(--color-primary)] transition-colors focus:border-[color:var(--color-primary)] focus:outline-none focus:ring-0"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-2 sm:mt-4 flex min-h-[48px] items-center justify-center gap-2 rounded bg-[color:var(--color-primary)] px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition-all hover:bg-[color:var(--color-primary)]/90 hover:gap-3 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]/30 focus:ring-offset-2 active:scale-[0.99]"
      >
        See my cycle plan
        <MaterialIcon name="arrow_forward" size={16} weight={400} />
      </button>

      <div className="mt-2 flex items-center justify-center gap-2 text-[color:var(--color-on-surface-variant)]">
        <MaterialIcon name="lock" size={14} weight={300} />
        <span className="text-[12px]">
          Your data is processed locally and never leaves your device.
        </span>
      </div>
    </form>
  );
}

function formatDateInput(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
