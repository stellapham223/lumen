"use client";

import { useEffect } from "react";
import { MaterialIcon } from "./MaterialIcon";
import type { DayInfo } from "@/lib/cycle-calculator";
import { getDayDetails } from "@/lib/day-details";
import { phaseProfiles, taskLabels, type TaskType } from "@/lib/phase-data";

interface Props {
  day: DayInfo | null;
  cycleLength: number;
  periodLength: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  isToday: boolean;
}

const phaseEmoji: Record<string, string> = {
  menstrual: "🌙",
  follicular: "🌱",
  ovulatory: "🌞",
  luteal: "🌗",
};

const phaseTextColor: Record<string, string> = {
  menstrual: "text-[#8a3c42]",
  follicular: "text-[#a66d24]",
  ovulatory: "text-[#3d6a4c]",
  luteal: "text-[#684b7a]",
};

const taskMaterialIcon: Record<TaskType, string> = {
  deepWork: "psychology",
  meetings: "groups",
  creative: "lightbulb",
  admin: "checklist",
  learning: "school",
  planning: "edit_calendar",
  presentations: "campaign",
  hardConvos: "forum",
  detailWork: "search",
  networking: "hub",
};

export function DayDetailModal({
  day,
  cycleLength,
  periodLength,
  onClose,
  onPrev,
  onNext,
  isToday,
}: Props) {
  useEffect(() => {
    if (!day) return;
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    }
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = orig;
      window.removeEventListener("keydown", handleKey);
    };
  }, [day, onClose, onPrev, onNext]);

  if (!day) return null;

  const details = getDayDetails(day, cycleLength, periodLength);
  const profile = phaseProfiles[day.phase];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-[#1a1a1a]/40 p-0 backdrop-blur-sm sm:items-center sm:p-6 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="day-detail-title"
    >
      <div
        className="relative my-auto flex max-h-[92vh] w-full max-w-[720px] flex-col overflow-hidden border border-[color:var(--color-primary)]/10 bg-[color:var(--color-surface)] shadow-[0_10px_30px_rgba(66,0,147,0.06)] animate-slide-up sm:max-h-[90vh] sm:animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute right-2 top-2 sm:right-4 sm:top-4 z-20 flex h-11 w-11 items-center justify-center text-[color:var(--color-on-surface-variant)] transition-colors hover:text-[color:var(--color-primary)]"
        >
          <MaterialIcon name="close" size={20} weight={300} />
        </button>

        <div className="relative z-10 flex-1 overflow-y-auto">
          <header className="hairline-b space-y-4 sm:space-y-6 p-5 sm:p-8 lg:p-10 pt-12 sm:pt-8 text-center">
            <div className="flex items-center justify-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-on-surface-variant)]">
              <span>{formatDate(day.date).toUpperCase()}</span>
              {isToday && (
                <>
                  <span className="h-1 w-1 rounded-full bg-[color:var(--color-outline-variant)]" />
                  <span className="font-bold text-[color:var(--color-primary)]">Today</span>
                </>
              )}
            </div>

            <div className="space-y-2">
              <h1
                id="day-detail-title"
                className="font-display text-[24px] sm:text-[32px] lg:text-[40px] leading-tight flex items-center justify-center gap-2 sm:gap-3 flex-wrap text-[color:var(--color-on-surface)]"
              >
                <span className="text-[28px] sm:text-[36px]">{phaseEmoji[day.phase]}</span>
                <span className={`italic ${phaseTextColor[day.phase]}`}>
                  {profile.name}
                </span>
                <span className="text-[color:var(--color-outline-variant)] font-light mx-1 hidden sm:inline">
                  ·
                </span>
                <span>
                  Day {day.dayInPhase} of {day.phaseLength}
                </span>
              </h1>
              <p className="font-display text-[12px] sm:text-[14px] italic text-[color:var(--color-on-surface-variant)]">
                Day {day.dayInCycle} of {cycleLength}-day cycle · {profile.shortLabel} mode
              </p>
            </div>
          </header>

          <div className="space-y-8 sm:space-y-12 p-5 sm:p-8 lg:p-10">
            <section className="space-y-5 sm:space-y-6">
              <h2 className="eyebrow text-[color:var(--color-on-surface-variant)] hairline-b pb-2">
                Hormone state
              </h2>
              <p className="font-display text-[15px] sm:text-[18px] leading-relaxed text-[color:var(--color-on-surface)]">
                {details.hormoneSummary}
              </p>
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3 sm:grid-cols-4">
                <HormonePill
                  label="Estrogen"
                  value={details.hormones.estrogen}
                  color="primary"
                />
                <HormonePill
                  label="Progesterone"
                  value={details.hormones.progesterone}
                  color="amber"
                />
                <HormonePill label="LH" value={details.hormones.lh} color="rust" />
                <HormonePill label="FSH" value={details.hormones.fsh} color="slate" />
              </div>
            </section>

            <section className="hairline-t pt-6 sm:pt-8 grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-[color:var(--color-primary)]">
                    <MaterialIcon name="psychology" size={24} weight={300} />
                  </span>
                  <h3 className="font-display text-[20px] font-medium text-[color:var(--color-on-surface)]">
                    Cognitive focus
                  </h3>
                </div>
                <p className="text-[14px] leading-relaxed text-[color:var(--color-on-surface-variant)]">
                  {details.cognitiveNote}
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-[color:var(--color-primary)]">
                    <MaterialIcon name="fitness_center" size={24} weight={300} />
                  </span>
                  <h3 className="font-display text-[20px] font-medium text-[color:var(--color-on-surface)]">
                    Physical capacity
                  </h3>
                </div>
                <p className="text-[14px] leading-relaxed text-[color:var(--color-on-surface-variant)]">
                  {details.bodyNote}
                </p>
              </div>
            </section>

            <section className="hairline-t pt-6 sm:pt-8 grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2">
              <div className="space-y-4">
                <h2 className="eyebrow text-[#3d6a4c] border-b border-[#3d6a4c]/20 pb-2">
                  Best to schedule
                </h2>
                <div className="space-y-3">
                  {details.topTasks.slice(0, 2).map((t) => (
                    <div
                      key={t.task}
                      className="relative flex items-start gap-4 border border-[#3d6a4c]/15 bg-[color:var(--color-surface)] p-4"
                    >
                      {t.rating === 5 && (
                        <div className="absolute right-0 top-0 border-l border-b border-[#3d6a4c]/15 bg-[#3d6a4c]/10 px-2 py-1 text-[8px] font-semibold uppercase tracking-[0.16em] text-[#3d6a4c]">
                          Peak fit
                        </div>
                      )}
                      <span className="text-[#3d6a4c] mt-1 shrink-0">
                        <MaterialIcon
                          name={taskMaterialIcon[t.task]}
                          size={20}
                          weight={300}
                        />
                      </span>
                      <div className="pr-12">
                        <h4 className="font-display text-[16px] font-medium text-[color:var(--color-on-surface)]">
                          {taskLabels[t.task]}
                        </h4>
                        <p className="mt-1 text-[12px] italic text-[color:var(--color-on-surface-variant)]">
                          {t.reason}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="eyebrow text-[#c05b4a] border-b border-[#c05b4a]/20 pb-2">
                  Avoid if possible
                </h2>
                <div className="space-y-3">
                  {details.avoidTasks.slice(0, 2).map((t) => (
                    <div
                      key={t.task}
                      className="flex items-start gap-4 border border-[#c05b4a]/15 bg-[color:var(--color-surface)] p-4"
                    >
                      <span className="text-[#c05b4a] mt-1 shrink-0">
                        <MaterialIcon
                          name={taskMaterialIcon[t.task]}
                          size={20}
                          weight={300}
                        />
                      </span>
                      <div>
                        <h4 className="font-display text-[16px] font-medium text-[color:var(--color-on-surface)]">
                          {taskLabels[t.task]}
                        </h4>
                        <p className="mt-1 text-[12px] italic text-[color:var(--color-on-surface-variant)]">
                          {t.reason}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="hairline-t pt-6">
              <div className="flex items-start gap-3 text-[color:var(--color-on-surface-variant)]/80">
                <span className="shrink-0 mt-0.5">
                  <MaterialIcon name="menu_book" size={16} weight={300} />
                </span>
                <p className="font-display text-[13px] italic leading-relaxed">
                  {details.scienceNote}
                </p>
              </div>
            </section>
          </div>
        </div>

        <footer className="hairline-t flex items-center justify-between bg-[color:var(--color-surface-container-lowest)] px-3 py-3 sm:px-8 sm:py-5 z-10">
          <button
            onClick={onPrev}
            className="group flex min-h-[44px] items-center gap-2 px-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-on-surface-variant)] transition-colors hover:text-[color:var(--color-primary)]"
          >
            <span className="transition-transform group-hover:-translate-x-1">
              <MaterialIcon name="arrow_back" size={16} weight={400} />
            </span>
            Previous
          </button>
          <span className="hidden text-[11px] italic text-[color:var(--color-on-surface-variant)]/50 sm:inline">
            ←/→ to navigate · Esc to close
          </span>
          <button
            onClick={onNext}
            className="group flex min-h-[44px] items-center gap-2 px-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-on-surface-variant)] transition-colors hover:text-[color:var(--color-primary)]"
          >
            Next
            <span className="transition-transform group-hover:translate-x-1">
              <MaterialIcon name="arrow_forward" size={16} weight={400} />
            </span>
          </button>
        </footer>
      </div>
    </div>
  );
}

function HormonePill({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: "primary" | "amber" | "rust" | "slate";
}) {
  const colorMap = {
    primary: {
      border: "border-[color:var(--color-primary)]/15",
      bg: "bg-[color:var(--color-primary)]/5",
      text: "text-[color:var(--color-primary)]",
      bar: "bg-[color:var(--color-primary)]",
      barBg: "bg-[color:var(--color-primary)]/10",
    },
    amber: {
      border: "border-[#a66d24]/15",
      bg: "bg-[#a66d24]/5",
      text: "text-[#a66d24]",
      bar: "bg-[#a66d24]",
      barBg: "bg-[#a66d24]/10",
    },
    rust: {
      border: "border-[#552400]/15",
      bg: "bg-[#552400]/5",
      text: "text-[#552400]",
      bar: "bg-[#552400]",
      barBg: "bg-[#552400]/10",
    },
    slate: {
      border: "border-[#4a4453]/15",
      bg: "bg-[#4a4453]/5",
      text: "text-[#4a4453]",
      bar: "bg-[#4a4453]",
      barBg: "bg-[#4a4453]/10",
    },
  };
  const c = colorMap[color];
  return (
    <div className={`space-y-3 border ${c.border} ${c.bg} p-3`}>
      <div className="flex items-center justify-between">
        <span className={`text-[10px] font-semibold uppercase tracking-[0.12em] ${c.text}`}>
          {label}
        </span>
        <span className={`text-[11px] font-semibold ${c.text}`}>
          {Math.round(value)}
        </span>
      </div>
      <div className={`h-[2px] w-full ${c.barBg}`}>
        <div
          className={`h-full ${c.bar}`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  );
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}
