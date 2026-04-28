"use client";

import { MaterialIcon } from "./MaterialIcon";
import type { CycleInput, Phase } from "@/lib/cycle-calculator";

interface Props {
  onDemo: (input: CycleInput) => void;
}

const demoConfigs: Array<{
  phase: Phase;
  label: string;
  daysAgo: number;
  modeLabel: string;
  icon: string;
  color: string;
  bg: string;
  bgHover: string;
}> = [
  {
    phase: "menstrual",
    label: "Menstrual",
    daysAgo: 1,
    modeLabel: "Reflect",
    icon: "self_improvement",
    color: "text-[#8a3c42]",
    bg: "bg-[#fdf5f5]",
    bgHover: "hover:bg-[#faeded]",
  },
  {
    phase: "follicular",
    label: "Follicular",
    daysAgo: 8,
    modeLabel: "Build",
    icon: "architecture",
    color: "text-[#a66d24]",
    bg: "bg-[#fffaf0]",
    bgHover: "hover:bg-[#fff5e0]",
  },
  {
    phase: "ovulatory",
    label: "Ovulatory",
    daysAgo: 13,
    modeLabel: "Connect",
    icon: "hub",
    color: "text-[#3d6a4c]",
    bg: "bg-[#f4f7f4]",
    bgHover: "hover:bg-[#e9f0e9]",
  },
  {
    phase: "luteal",
    label: "Luteal",
    daysAgo: 21,
    modeLabel: "Finish",
    icon: "task_alt",
    color: "text-[#684b7a]",
    bg: "bg-[#f8f5f9]",
    bgHover: "hover:bg-[#f1ebf4]",
  },
];

export function DemoToggle({ onDemo }: Props) {
  function handleClick(daysAgo: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const lastPeriodStart = new Date(today);
    lastPeriodStart.setDate(today.getDate() - daysAgo);
    onDemo({
      lastPeriodStart,
      cycleLength: 28,
      periodLength: 5,
    });
  }

  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <span className="eyebrow text-[color:var(--color-primary)]">
          Or preview a phase
        </span>
        <p className="text-[16px] text-[color:var(--color-on-surface-variant)]">
          See what each looks like instantly.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {demoConfigs.map((d) => (
          <button
            key={d.phase}
            type="button"
            onClick={() => handleClick(d.daysAgo)}
            className={`group hairline flex cursor-pointer flex-col gap-4 p-6 text-left transition-all duration-300 ${d.bg} ${d.bgHover} hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(66,0,147,0.06)] active:scale-[0.99]`}
          >
            <span
              className={`${d.color} transition-transform duration-300 group-hover:scale-110`}
            >
              <MaterialIcon name={d.icon} size={24} weight={200} />
            </span>
            <div className="flex flex-col">
              <span
                className={`font-display text-[14px] italic ${d.color} opacity-70`}
              >
                {d.label}
              </span>
              <span
                className={`font-display text-[24px] leading-tight font-medium ${d.color}`}
              >
                {d.modeLabel}
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
