"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TodayWidget } from "@/components/TodayWidget";
import { TodayAvoidPanel } from "@/components/TodayAvoidPanel";
import { PhaseCalendar } from "@/components/PhaseCalendar";
import {
  TaskRecommendations,
  ScheduleTodayPanel,
} from "@/components/TaskRecommendations";
import { HormoneChart } from "@/components/HormoneChart";
import { PhaseDeepDive } from "@/components/PhaseDeepDive";
import { DayDetailModal } from "@/components/DayDetailModal";
import { ReferencesFooter } from "@/components/ReferencesFooter";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { PhaseAffiliateShelf } from "@/components/PhaseAffiliateShelf";
import { MaterialIcon } from "@/components/MaterialIcon";
import {
  calculateCycle,
  type CycleInput as CycleInputType,
  type CycleStatus,
  type DayInfo,
} from "@/lib/cycle-calculator";
import { loadCycleInput, clearCycleInput } from "@/lib/storage";

export default function Plan() {
  const router = useRouter();
  const [status, setStatus] = useState<CycleStatus | null>(null);
  const [input, setInput] = useState<CycleInputType | null>(null);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = loadCycleInput();
    if (!stored) {
      router.replace("/");
      return;
    }
    setInput(stored);
    setStatus(calculateCycle(stored));
    setHydrated(true);
  }, [router]);

  function handleEdit() {
    clearCycleInput();
    router.push("/");
  }

  function handleDayClick(day: DayInfo) {
    if (!status) return;
    const idx = status.schedule.findIndex(
      (d) => d.date.toDateString() === day.date.toDateString(),
    );
    if (idx >= 0) setSelectedDayIndex(idx);
  }

  function handlePrevDay() {
    if (selectedDayIndex === null || !status) return;
    setSelectedDayIndex(Math.max(0, selectedDayIndex - 1));
  }

  function handleNextDay() {
    if (selectedDayIndex === null || !status) return;
    setSelectedDayIndex(
      Math.min(status.schedule.length - 1, selectedDayIndex + 1),
    );
  }

  const selectedDay =
    selectedDayIndex !== null && status
      ? status.schedule[selectedDayIndex]
      : null;

  if (!hydrated || !status || !input) {
    return (
      <main className="mx-auto w-full max-w-[960px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="h-32 animate-pulse bg-[color:var(--color-surface-container)]" />
      </main>
    );
  }

  return (
    <>
      <main className="mx-auto flex w-full max-w-[960px] flex-col gap-6 px-4 py-8 sm:gap-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="hairline-b flex flex-col gap-2 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-[12px] sm:text-[14px] italic text-[color:var(--color-on-surface-variant)]">
            Cycle: {input.cycleLength} days · Period: {input.periodLength} days
            · Saved in your browser
          </p>
          <button
            onClick={handleEdit}
            className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-primary)] transition-opacity hover:opacity-70"
          >
            Edit cycle
            <MaterialIcon name="refresh" size={14} weight={400} />
          </button>
        </div>

        <TodayWidget status={status} />

        <div className="animate-fade-up" style={{ animationDelay: "100ms" }}>
          <PhaseDeepDive phase={status.phase} />
        </div>

        <div className="animate-fade-up" style={{ animationDelay: "150ms" }}>
          <HormoneChart
            status={status}
            cycleLength={input.cycleLength}
            periodLength={input.periodLength}
          />
        </div>

        <div className="animate-fade-up" style={{ animationDelay: "200ms" }}>
          <PhaseCalendar status={status} onDayClick={handleDayClick} />
        </div>

        <div
          className="hairline grid grid-cols-1 gap-6 bg-[color:var(--color-surface-container-lowest)] p-4 sm:grid-cols-2 sm:gap-8 sm:p-6 lg:p-10 animate-fade-up"
          style={{ animationDelay: "250ms" }}
        >
          <ScheduleTodayPanel status={status} />
          <TodayAvoidPanel status={status} />
        </div>

        <div className="animate-fade-up" style={{ animationDelay: "300ms" }}>
          <TaskRecommendations status={status} />
        </div>

        <div className="animate-fade-up" style={{ animationDelay: "315ms" }}>
          <PhaseAffiliateShelf phase={status.phase} />
        </div>

        <div className="animate-fade-up" style={{ animationDelay: "325ms" }}>
          <AffiliateDisclosure />
        </div>

        <div className="animate-fade-up" style={{ animationDelay: "350ms" }}>
          <ReferencesFooter />
        </div>
      </main>

      <DayDetailModal
        day={selectedDay}
        cycleLength={input.cycleLength}
        periodLength={input.periodLength}
        onClose={() => setSelectedDayIndex(null)}
        onPrev={handlePrevDay}
        onNext={handleNextDay}
        isToday={
          selectedDay !== null &&
          selectedDay.date.toDateString() === new Date().toDateString()
        }
      />
    </>
  );
}
