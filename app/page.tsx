"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { CycleInput } from "@/components/CycleInput";
import { DemoToggle } from "@/components/DemoToggle";
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
import { MaterialIcon } from "@/components/MaterialIcon";
import {
  calculateCycle,
  type CycleInput as CycleInputType,
  type CycleStatus,
  type DayInfo,
} from "@/lib/cycle-calculator";
import { saveCycleInput, loadCycleInput, clearCycleInput } from "@/lib/storage";

export default function Home() {
  const [status, setStatus] = useState<CycleStatus | null>(null);
  const [input, setInput] = useState<CycleInputType | null>(null);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = loadCycleInput();
    if (stored) {
      setInput(stored);
      setStatus(calculateCycle(stored));
    }
    setHydrated(true);
  }, []);

  function handleSubmit(values: CycleInputType) {
    setInput(values);
    setStatus(calculateCycle(values));
    saveCycleInput(values);
  }

  function handleReset() {
    setStatus(null);
    setInput(null);
    setSelectedDayIndex(null);
    clearCycleInput();
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

  return (
    <>
      <Navbar />

      {!hydrated ? (
        <main className="mx-auto max-w-[880px] px-6 pt-24 pb-32 sm:px-8">
          <div className="mx-auto h-32 max-w-md animate-pulse bg-[color:var(--color-surface-container)]" />
        </main>
      ) : !status ? (
        <main className="mx-auto flex max-w-[880px] flex-col gap-24 px-6 pt-20 pb-24 sm:px-8 sm:pt-24 sm:pb-32">
          <Hero />

          <section
            className="hairline mx-auto w-full max-w-[600px] bg-[color:var(--color-surface-container-lowest)] p-8 sm:p-12 animate-scale-in"
            style={{ animationDelay: "400ms" }}
          >
            <div className="mb-8 flex flex-col gap-2 text-center">
              <span className="eyebrow text-[color:var(--color-primary)]">
                Begin
              </span>
              <h2 className="font-display text-[32px] leading-[1.2] font-medium text-[color:var(--color-primary)]">
                Tell us about your cycle
              </h2>
              <p className="text-[14px] text-[color:var(--color-on-surface-variant)]">
                Calculate your current phase in 30 seconds. We don&apos;t store
                anything.
              </p>
            </div>
            <CycleInput onSubmit={handleSubmit} />
          </section>

          <div
            className="animate-fade-up"
            style={{ animationDelay: "500ms" }}
          >
            <DemoToggle onDemo={handleSubmit} />
          </div>
        </main>
      ) : (
        <main className="mx-auto flex max-w-[960px] flex-col gap-8 px-6 py-12 sm:px-8 sm:py-16">
          <div className="hairline-b flex flex-col gap-2 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-display text-[14px] italic text-[color:var(--color-on-surface-variant)]">
              Cycle: {input?.cycleLength} days · Period: {input?.periodLength}{" "}
              days · Saved in your browser
            </p>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-primary)] transition-opacity hover:opacity-70"
            >
              Edit cycle
              <MaterialIcon name="refresh" size={14} weight={400} />
            </button>
          </div>

          <TodayWidget status={status} />

          <div
            className="animate-fade-up"
            style={{ animationDelay: "100ms" }}
          >
            <PhaseDeepDive phase={status.phase} />
          </div>

          <div
            className="animate-fade-up"
            style={{ animationDelay: "150ms" }}
          >
            <HormoneChart
              status={status}
              cycleLength={input!.cycleLength}
              periodLength={input!.periodLength}
            />
          </div>

          <div
            className="animate-fade-up"
            style={{ animationDelay: "200ms" }}
          >
            <PhaseCalendar status={status} onDayClick={handleDayClick} />
          </div>

          <div
            className="hairline grid grid-cols-1 gap-8 bg-[color:var(--color-surface-container-lowest)] p-6 sm:grid-cols-2 sm:p-10 animate-fade-up"
            style={{ animationDelay: "250ms" }}
          >
            <ScheduleTodayPanel status={status} />
            <TodayAvoidPanel status={status} />
          </div>

          <div
            className="animate-fade-up"
            style={{ animationDelay: "300ms" }}
          >
            <TaskRecommendations status={status} />
          </div>

          <div
            className="animate-fade-up"
            style={{ animationDelay: "350ms" }}
          >
            <ReferencesFooter />
          </div>
        </main>
      )}

      <Footer />

      {status && input && (
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
      )}
    </>
  );
}
