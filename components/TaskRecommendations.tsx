"use client";

import { Fragment, useState } from "react";
import { MaterialIcon } from "./MaterialIcon";
import type { CycleStatus, Phase } from "@/lib/cycle-calculator";
import {
  phaseProfiles,
  taskLabels,
  taskRatings,
  getRatingLabel,
  type TaskType,
} from "@/lib/phase-data";

interface Props {
  status: CycleStatus;
}

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

const ratingColor: Record<number, string> = {
  5: "bg-[#3d6a4c]",
  4: "bg-[#76a07f]",
  3: "bg-[#7b7485]/50",
  2: "bg-[#a66d24]/60",
  1: "bg-[#c05b4a]",
};

export function ScheduleTodayPanel({ status }: { status: CycleStatus }) {
  const profile = phaseProfiles[status.phase];
  const tasks = Object.keys(taskLabels) as TaskType[];

  const sortedByCurrentPhase = [...tasks].sort(
    (a, b) => taskRatings[b][status.phase] - taskRatings[a][status.phase],
  );

  return (
    <section className="space-y-4">
      <div>
        <h2 className="eyebrow text-[#3d6a4c] hairline-b pb-2">
          Best to schedule today
        </h2>
        <p className="mt-2 text-[12px] italic text-[color:var(--color-on-surface-variant)]">
          Based on your current {profile.name.toLowerCase()} phase.
        </p>
      </div>

      <div className="space-y-3">
        {sortedByCurrentPhase.slice(0, 3).map((task) => {
          const rating = taskRatings[task][status.phase];
          return (
            <div
              key={task}
              className="hairline relative flex items-start gap-4 bg-[color:var(--color-surface)] p-4 transition-colors hover:bg-[#f4f7f4]/30"
              style={{ borderColor: "rgba(74, 93, 35, 0.18)" }}
            >
              {rating === 5 && (
                <div className="absolute right-0 top-0 hairline border-r-0 border-t-0 bg-[#4a5d23]/10 px-2 py-1 text-[8px] font-semibold uppercase tracking-[0.16em] text-[#4a5d23]">
                  Peak fit
                </div>
              )}
              <span className="text-[#3d6a4c] mt-0.5 shrink-0">
                <MaterialIcon name={taskMaterialIcon[task]} size={20} weight={300} />
              </span>
              <div className="flex-1 pr-12">
                <h4 className="font-display text-[16px] font-medium text-[color:var(--color-on-surface)]">
                  {taskLabels[task]}
                </h4>
                <p className="mt-1 text-[12px] italic text-[color:var(--color-on-surface-variant)]">
                  {getTaskReason(task, status.phase)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function TaskRecommendations({ status }: Props) {
  const tasks = Object.keys(taskLabels) as TaskType[];
  const [expandedTask, setExpandedTask] = useState<TaskType | null>(null);

  return (
    <section className="hairline bg-[color:var(--color-surface-container-lowest)] p-6 sm:p-10">
      <span className="eyebrow text-[color:var(--color-primary)]">Comparison</span>
      <h3 className="mt-1 font-display text-[24px] font-medium text-[color:var(--color-primary)]">
        Full cycle matrix
      </h3>
      <p className="mt-1 text-[14px] italic text-[color:var(--color-on-surface-variant)]">
        Click any task to see why it scores how it does in each phase.
      </p>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-[14px]">
          <thead>
            <tr className="hairline-b">
              <th className="py-3 pr-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-on-surface-variant)]">
                Task
              </th>
              {(["menstrual", "follicular", "ovulatory", "luteal"] as const).map(
                (p) => (
                  <th
                    key={p}
                    className="px-3 py-3 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-on-surface-variant)]"
                  >
                    {phaseProfiles[p].name}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => {
              const isOpen = expandedTask === task;
              return (
                <Fragment key={task}>
                  <tr
                    className={`cursor-pointer hairline-b transition-colors hover:bg-[color:var(--color-surface-container-low)]/50 ${
                      isOpen ? "bg-[color:var(--color-surface-container-low)]/50" : ""
                    }`}
                    onClick={() => setExpandedTask(isOpen ? null : task)}
                  >
                    <td className="py-3 pr-4">
                      <span className="flex items-center gap-2.5">
                        <span
                          className={`text-[color:var(--color-primary)] transition-transform duration-200 ${
                            isOpen ? "rotate-90" : ""
                          }`}
                        >
                          <MaterialIcon name="chevron_right" size={16} weight={300} />
                        </span>
                        <span className="text-[color:var(--color-on-surface-variant)]">
                          <MaterialIcon name={taskMaterialIcon[task]} size={16} weight={300} />
                        </span>
                        <span className="font-display font-medium text-[color:var(--color-on-surface)]">
                          {taskLabels[task]}
                        </span>
                      </span>
                    </td>
                    {(["menstrual", "follicular", "ovulatory", "luteal"] as const).map(
                      (p) => (
                        <td
                          key={p}
                          className={`px-3 py-3 text-center ${
                            status.phase === p
                              ? "bg-[color:var(--color-primary)]/[0.04]"
                              : ""
                          }`}
                        >
                          <RatingDot rating={taskRatings[task][p]} />
                        </td>
                      ),
                    )}
                  </tr>
                  {isOpen && (
                    <tr className="hairline-b">
                      <td colSpan={5} className="bg-[color:var(--color-surface-container-low)]/30 p-4">
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                          {(["menstrual", "follicular", "ovulatory", "luteal"] as const).map(
                            (p) => (
                              <div
                                key={p}
                                className={`hairline p-3 ${
                                  status.phase === p
                                    ? "bg-[color:var(--color-surface-container-lowest)]"
                                    : "bg-[color:var(--color-surface)]/60"
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="eyebrow text-[color:var(--color-on-surface-variant)]">
                                    {phaseProfiles[p].name}
                                  </span>
                                  <RatingDotSm rating={taskRatings[task][p]} />
                                </div>
                                <p className="mt-2 text-[12px] italic leading-relaxed text-[color:var(--color-on-surface-variant)]">
                                  {getTaskReason(task, p)}
                                </p>
                              </div>
                            ),
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.12em] text-[color:var(--color-on-surface-variant)]">
        <span className="font-semibold text-[color:var(--color-primary)]">Score</span>
        {[5, 4, 3, 2, 1].map((r) => (
          <span key={r} className="flex items-center gap-1.5">
            <span className={`inline-block h-2 w-2 rounded-full ${ratingColor[r]}`} />
            {r} · {getRatingLabel(r)}
          </span>
        ))}
      </div>
    </section>
  );
}

function RatingDot({ rating }: { rating: number }) {
  return (
    <div className="flex justify-center">
      <span
        className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold text-white ${ratingColor[rating]}`}
      >
        {rating}
      </span>
    </div>
  );
}

function RatingDotSm({ rating }: { rating: number }) {
  return (
    <span
      className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white ${ratingColor[rating]}`}
    >
      {rating}
    </span>
  );
}

function getTaskReason(task: TaskType, phase: Phase): string {
  const reasons: Record<TaskType, Record<Phase, string>> = {
    deepWork: {
      menstrual: "Mental fog limits sustained focus; reflective work better.",
      follicular: "Rising estrogen enhances learning and concentration capacity.",
      ovulatory: "Cognitive resources pulled toward social/verbal; solo focus feels restless.",
      luteal: "Progesterone calming; sustained focus on familiar problems works well.",
    },
    meetings: {
      menstrual: "Social energy lowest; reschedule non-critical meetings.",
      follicular: "Verbal fluency climbing; collaboration productive.",
      ovulatory: "Peak verbal and emotional cognition; schedule the high-stakes meetings.",
      luteal: "Patience for back-to-backs reduced; batch shorter meetings.",
    },
    creative: {
      menstrual: "Right-brain reflective mode: useful for connecting patterns.",
      follicular: "Novelty-seeking dopamine peak; brainstorming thrives.",
      ovulatory: "Confidence high but social cognition pulls outward.",
      luteal: "Detail-creative (editing, refining) better than open ideation.",
    },
    admin: {
      menstrual: "Low-stimulation tasks tolerable; clear inbox during this window.",
      follicular: "Brain craves new; admin feels punishing.",
      ovulatory: "Wasted peak window; defer admin if possible.",
      luteal: "Detail-focus peak: perfect for admin, expense reports, organizing.",
    },
    learning: {
      menstrual: "Memory consolidation suppressed; absorption low.",
      follicular: "Estrogen-driven neuroplasticity peak: best learning window of cycle.",
      ovulatory: "Learning OK but social cognition demands attention.",
      luteal: "Reviewing learned material works; new acquisition harder.",
    },
    planning: {
      menstrual: "Big-picture strategic thinking peak: plan the next cycle.",
      follicular: "Tactical planning energetic but may overcommit.",
      ovulatory: "Planning under social cognition skew; beware optimistic estimates.",
      luteal: "Detail planning excellent; risk-aware mindset.",
    },
    presentations: {
      menstrual: "Verbal recall and energy lowest; high failure risk.",
      follicular: "Confidence and fluency climbing; solid choice.",
      ovulatory: "Peak verbal cognition: schedule here for maximum impact.",
      luteal: "Progesterone reduces verbal fluency late phase.",
    },
    hardConvos: {
      menstrual: "Emotional reserves lowest; defer.",
      follicular: "Diplomatic capacity present.",
      ovulatory: "Emotional recognition and confidence peak: best window.",
      luteal: "Hormone drop late phase amplifies emotional reactivity.",
    },
    detailWork: {
      menstrual: "Possible but not ideal; focus inconsistent.",
      follicular: "Detail-tolerance moderate; brain wants new.",
      ovulatory: "Restlessness undermines fine-grained work.",
      luteal: "Peak window for editing, proofing, finishing.",
    },
    networking: {
      menstrual: "Social battery depleted; defer.",
      follicular: "Confidence rising; small networking productive.",
      ovulatory: "Peak social cognition: best networking window.",
      luteal: "Energy declining; conserve for must-attend only.",
    },
  };
  return reasons[task][phase];
}
