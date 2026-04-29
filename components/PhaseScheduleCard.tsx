import { MaterialIcon } from "./MaterialIcon";

const PHASE_ACCENTS = {
  Menstrual: "#D8829E",
  Follicular: "#D4A65A",
  Ovulatory: "#D97757",
  Luteal: "#8B6FB8",
} as const;

type PhaseName = keyof typeof PHASE_ACCENTS;

interface ScheduleItem {
  icon: string;
  label: string;
}

export interface PhaseScheduleCardProps {
  phase: PhaseName;
  days: string;
  mode: string;
  best: ScheduleItem[];
  avoid: ScheduleItem[];
}

export function PhaseScheduleCard({
  phase,
  days,
  mode,
  best,
  avoid,
}: PhaseScheduleCardProps) {
  return (
    <div className="my-6 hairline bg-[color:var(--color-surface-container-lowest)]">
      <div
        className="h-[3px]"
        style={{ backgroundColor: PHASE_ACCENTS[phase] }}
      />
      <div className="p-5 sm:p-6">
        <div className="mb-5 flex items-baseline justify-between gap-3">
          <div>
            <div className="eyebrow text-[color:var(--color-primary)]">
              {phase}
            </div>
            <div className="mt-1 text-[11px] text-[color:var(--color-on-surface-variant)]">
              Days {days}
            </div>
          </div>
          <div className="font-display text-[20px] font-medium text-[color:var(--color-primary)] sm:text-[24px]">
            {mode}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <ScheduleColumn label="Best for" items={best} accent="primary" />
          <ScheduleColumn label="Avoid" items={avoid} accent="muted" />
        </div>
      </div>
    </div>
  );
}

function ScheduleColumn({
  label,
  items,
  accent,
}: {
  label: string;
  items: ScheduleItem[];
  accent: "primary" | "muted";
}) {
  const iconColor =
    accent === "primary"
      ? "text-[color:var(--color-primary)]"
      : "text-[color:var(--color-on-surface-variant)]";
  return (
    <div>
      <div className="eyebrow mb-3 text-[color:var(--color-on-surface-variant)]">
        {label}
      </div>
      <ul className="m-0 list-none space-y-2 p-0">
        {items.map((it) => (
          <li
            key={it.label}
            className="flex items-start gap-2 text-[13px] leading-snug text-[color:var(--color-on-surface)]"
          >
            <MaterialIcon
              name={it.icon}
              size={18}
              className={`${iconColor} mt-0.5 shrink-0`}
            />
            <span>{it.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
