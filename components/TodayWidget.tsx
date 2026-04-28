import { MaterialIcon } from "./MaterialIcon";
import type { CycleStatus } from "@/lib/cycle-calculator";
import { phaseProfiles } from "@/lib/phase-data";

interface Props {
  status: CycleStatus;
}

const phaseHeroBg: Record<string, string> = {
  menstrual: "bg-[#fdf5f5]",
  follicular: "bg-[#fdfaef]",
  ovulatory: "bg-[#f4f7f4]",
  luteal: "bg-[#f8f5f9]",
};

const phaseTextColor: Record<string, string> = {
  menstrual: "text-[#8a3c42]",
  follicular: "text-[#a66d24]",
  ovulatory: "text-[#3d6a4c]",
  luteal: "text-[#684b7a]",
};

export function TodayWidget({ status }: Props) {
  const profile = phaseProfiles[status.phase];
  const nextProfile = phaseProfiles[status.nextPhase];

  return (
    <section
      className={`hairline ${phaseHeroBg[status.phase]} flex flex-col items-start gap-8 p-6 sm:p-12 md:flex-row animate-fade-up`}
    >
      <div className="flex-1 space-y-4">
        <div className="space-y-1">
          <span className="eyebrow text-[color:var(--color-on-surface-variant)] tracking-widest">
            Day {status.dayInCycle} of cycle · {profile.shortLabel} mode
          </span>
          <h1
            className={`font-display text-[40px] sm:text-[48px] leading-[1.1] tracking-[-0.02em] italic ${phaseTextColor[status.phase]}`}
          >
            {profile.name} phase
          </h1>
          <p className="font-display text-[16px] italic text-[color:var(--color-on-surface-variant)]">
            Day {status.dayInPhase} of {status.phaseLength}
          </p>
        </div>

        <p className="max-w-prose text-[18px] leading-relaxed text-[color:var(--color-on-surface-variant)]">
          {profile.description}
        </p>

        <div className="flex items-center gap-2 pt-2 font-display text-[14px] italic text-[color:var(--color-on-surface-variant)]">
          <span>
            Next phase in {status.daysToNextPhase}{" "}
            {status.daysToNextPhase === 1 ? "day" : "days"}
          </span>
          <MaterialIcon name="arrow_forward" size={14} weight={300} />
          <span>{nextProfile.name}</span>
        </div>
      </div>

      <div className="hairline flex flex-col gap-3 bg-[color:var(--color-surface-container-lowest)] p-6 md:w-72">
        <div
          className={`flex items-center gap-2 ${phaseTextColor[status.phase]}`}
        >
          <MaterialIcon name="lightbulb" size={20} weight={300} fill />
          <h3 className="eyebrow">Today&apos;s energy strategy</h3>
        </div>
        <p className="text-[14px] leading-relaxed text-[color:var(--color-on-surface-variant)]">
          {profile.energyTip}
        </p>
      </div>
    </section>
  );
}
