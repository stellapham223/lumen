import { MaterialIcon } from "./MaterialIcon";
import type { CycleStatus, Phase } from "@/lib/cycle-calculator";
import { phaseProfiles, taskLabels, taskRatings, type TaskType } from "@/lib/phase-data";

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

export function TodayAvoidPanel({ status }: Props) {
  const profile = phaseProfiles[status.phase];
  const tasks = Object.keys(taskLabels) as TaskType[];

  const sortedAscending = [...tasks].sort(
    (a, b) => taskRatings[a][status.phase] - taskRatings[b][status.phase],
  );
  const avoid = sortedAscending.slice(0, 3);

  const tips = getAvoidTip(status.phase);

  return (
    <section className="space-y-4">
      <div>
        <h2 className="eyebrow text-[#c05b4a] hairline-b pb-2">
          Avoid if possible
        </h2>
        <p className="mt-2 text-[12px] italic text-[color:var(--color-on-surface-variant)]">
          {tips.intro} {profile.name.toLowerCase()} phase.
        </p>
      </div>

      <div className="space-y-3">
        {avoid.map((task) => (
          <div
            key={task}
            className="hairline relative flex items-start gap-4 bg-[color:var(--color-surface)] p-4 transition-colors hover:bg-[#fdf5f5]/30"
            style={{ borderColor: "rgba(192, 91, 74, 0.2)" }}
          >
            <span className="text-[#c05b4a] mt-0.5 shrink-0">
              <MaterialIcon name={taskMaterialIcon[task]} size={20} weight={300} />
            </span>
            <div className="flex-1">
              <h4 className="font-display text-[16px] font-medium text-[color:var(--color-on-surface)]">
                {taskLabels[task]}
              </h4>
              <p className="mt-1 text-[12px] italic text-[color:var(--color-on-surface-variant)]">
                {tips.reasonsByTask[task] ??
                  "Lower fit for this phase: defer if you can."}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-2 text-[11px] italic text-[color:var(--color-on-surface-variant)]/70">
        {tips.outro}
      </p>
    </section>
  );
}

function getAvoidTip(phase: Phase) {
  const map: Record<
    Phase,
    {
      intro: string;
      outro: string;
      reasonsByTask: Partial<Record<TaskType, string>>;
    }
  > = {
    menstrual: {
      intro: "Hormones at cycle minimum during",
      outro:
        "If unavoidable, build in extra prep time and recovery.",
      reasonsByTask: {
        presentations: "Verbal recall and energy at cycle low.",
        meetings: "Social battery depleted; defer to follicular.",
        learning: "Memory consolidation suppressed.",
        networking: "Energy cost > value at this phase.",
        hardConvos: "Emotional reserves lowest.",
      },
    },
    follicular: {
      intro: "Brain hungry for novelty during",
      outro: "Follicular punishes repetition; batch admin elsewhere.",
      reasonsByTask: {
        admin: "Repetitive tasks feel painful: wasted bandwidth.",
        detailWork: "Brain wants new, not refining.",
      },
    },
    ovulatory: {
      intro: "Peak social cognition window during",
      outro: "Don't waste 3 days of peak cognition on solo work.",
      reasonsByTask: {
        admin: "Wasted peak window; defer admin.",
        detailWork: "Restlessness undermines fine-grained work.",
        deepWork: "Cognitive resources pulled toward social.",
      },
    },
    luteal: {
      intro: "Verbal fluency declining late in",
      outro: "Late-luteal hormone withdrawal: protect your energy.",
      reasonsByTask: {
        presentations: "Verbal recall slower late luteal.",
        hardConvos: "Emotional reactivity high.",
        networking: "Conserve energy for must-attend events.",
      },
    },
  };
  return map[phase];
}
