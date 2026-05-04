"use client";

import { useState } from "react";
import { MaterialIcon } from "./MaterialIcon";
import type { Phase } from "@/lib/cycle-calculator";
import { phaseProfiles } from "@/lib/phase-data";
import { phaseEncyclopedia } from "@/lib/phase-encyclopedia";

interface Props {
  phase: Phase;
}

const tabs: Array<{
  id: TabId;
  label: string;
  icon: string;
}> = [
  { id: "cognitive", label: "Brain", icon: "psychology" },
  { id: "physical", label: "Body", icon: "fitness_center" },
  { id: "leanInto", label: "Lean into", icon: "check_circle" },
  { id: "defer", label: "Defer", icon: "schedule" },
  { id: "mistakes", label: "Common mistakes", icon: "error_outline" },
];

type TabId = "cognitive" | "physical" | "leanInto" | "defer" | "mistakes";

export function PhaseDeepDive({ phase }: Props) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("cognitive");

  const profile = phaseProfiles[phase];
  const enc = phaseEncyclopedia[phase];

  return (
    <section className="hairline bg-[color:var(--color-surface-container-lowest)] p-4 sm:p-6 lg:p-10">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-start justify-between gap-4 text-left transition-opacity hover:opacity-80"
        aria-expanded={open}
      >
        <div className="min-w-0 flex-1">
          <span className="eyebrow text-[color:var(--color-primary)]">
            Encyclopedia
          </span>
          <h3 className="mt-1 font-display text-[20px] sm:text-[24px] font-medium text-[color:var(--color-primary)]">
            Learn about your {profile.name.toLowerCase()} phase
          </h3>
          <p className="mt-1 text-[13px] sm:text-[14px] italic text-[color:var(--color-on-surface-variant)]">
            Hormone profile, brain + body, what to lean into, common mistakes
          </p>
        </div>
        <span
          className={`shrink-0 text-[color:var(--color-primary)] transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          <MaterialIcon name="add" size={28} weight={300} />
        </span>
      </button>

      {open && (
        <div className="mt-8 space-y-8 animate-fade-up">
          <p className="font-display text-[18px] leading-relaxed text-[color:var(--color-on-surface)]">
            {enc.longDescription}
          </p>

          <div>
            <h4 className="eyebrow mb-3 text-[color:var(--color-on-surface-variant)] flex items-center gap-2">
              <MaterialIcon name="science" size={14} weight={300} />
              Hormone profile
            </h4>
            <ul className="space-y-2">
              {enc.hormoneProfile.map((h) => (
                <li
                  key={h.hormone}
                  className="hairline flex flex-col gap-0.5 px-4 py-3 sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <span className="font-display text-[15px] font-medium text-[color:var(--color-primary)]">
                    {h.hormone}
                  </span>
                  <span className="text-[14px] text-[color:var(--color-on-surface)]">
                    {h.level}
                  </span>
                  <span className="text-[12px] italic text-[color:var(--color-on-surface-variant)]">
                    {h.note}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="hairline-b -mx-4 sm:mx-0">
            <div className="flex gap-1 -mb-px overflow-x-auto overscroll-x-contain touch-pan-x px-4 sm:px-0 sm:flex-wrap">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex shrink-0 items-center gap-1.5 px-3 py-2 min-h-[40px] text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.1em] sm:tracking-[0.12em] transition-colors ${
                      isActive
                        ? "text-[color:var(--color-primary)]"
                        : "text-[color:var(--color-on-surface-variant)] hover:text-[color:var(--color-primary)]"
                    }`}
                  >
                    <MaterialIcon name={tab.icon} size={14} weight={300} />
                    {tab.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-px bg-[color:var(--color-primary)]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            {activeTab === "cognitive" && (
              <ul className="space-y-5">
                {enc.cognitiveChanges.map((c) => (
                  <li key={c.title}>
                    <p className="font-display text-[16px] font-medium text-[color:var(--color-primary)]">
                      {c.title}
                    </p>
                    <p className="mt-1 text-[14px] leading-relaxed text-[color:var(--color-on-surface-variant)]">
                      {c.detail}
                    </p>
                    {c.source && (
                      <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-[color:var(--color-on-surface-variant)]/60">
                        Source · {c.source}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}

            {activeTab === "physical" && (
              <ul className="space-y-5">
                {enc.physicalChanges.map((c) => (
                  <li key={c.title}>
                    <p className="font-display text-[16px] font-medium text-[color:var(--color-primary)]">
                      {c.title}
                    </p>
                    <p className="mt-1 text-[14px] leading-relaxed text-[color:var(--color-on-surface-variant)]">
                      {c.detail}
                    </p>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === "leanInto" && (
              <ul className="space-y-2">
                {enc.leanInto.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 hairline bg-[#f4f7f4] px-4 py-3"
                  >
                    <span className="text-[#3d6a4c] shrink-0 mt-0.5">
                      <MaterialIcon name="check" size={16} weight={400} />
                    </span>
                    <span className="text-[14px] text-[color:var(--color-on-surface)]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === "defer" && (
              <ul className="space-y-2">
                {enc.defer.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 hairline bg-[#fffaf0] px-4 py-3"
                  >
                    <span className="text-[#a66d24] shrink-0 mt-0.5">
                      <MaterialIcon name="schedule" size={16} weight={400} />
                    </span>
                    <span className="text-[14px] text-[color:var(--color-on-surface)]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === "mistakes" && (
              <ul className="space-y-2">
                {enc.commonMistakes.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 hairline bg-[#fdf5f5] px-4 py-3"
                  >
                    <span className="text-[#8a3c42] shrink-0 mt-0.5">
                      <MaterialIcon name="error_outline" size={16} weight={400} />
                    </span>
                    <span className="text-[14px] text-[color:var(--color-on-surface)]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h4 className="eyebrow mb-3 text-[color:var(--color-on-surface-variant)] flex items-center gap-2">
              <MaterialIcon name="menu_book" size={14} weight={300} />
              Recommended reading
            </h4>
            <ul className="space-y-2">
              {enc.recommendedReading.map((r, i) => (
                <li key={i}>
                  <span className="font-display text-[15px] font-medium italic text-[color:var(--color-primary)]">
                    {r.title}
                  </span>
                  <span className="text-[14px] text-[color:var(--color-on-surface-variant)]">
                    {" "}
                    by {r.author}
                  </span>
                  <p className="text-[12px] italic text-[color:var(--color-on-surface-variant)]/70">
                    {r.note}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
