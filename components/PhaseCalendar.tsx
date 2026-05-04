import { MaterialIcon } from "./MaterialIcon";
import type { CycleStatus, DayInfo } from "@/lib/cycle-calculator";
import { phaseProfiles } from "@/lib/phase-data";

interface Props {
  status: CycleStatus;
  onDayClick: (day: DayInfo) => void;
}

const phaseAccent: Record<string, string> = {
  menstrual: "bg-[#8a3c42]",
  follicular: "bg-[#a66d24]",
  ovulatory: "bg-[#3d6a4c]",
  luteal: "bg-[#684b7a]",
};

const phaseLight: Record<string, string> = {
  menstrual: "bg-[#fdf5f5] text-[#8a3c42] hover:bg-[#faeded]",
  follicular: "bg-[#fffaf0] text-[#a66d24] hover:bg-[#fff5e0]",
  ovulatory: "bg-[#f4f7f4] text-[#3d6a4c] hover:bg-[#e9f0e9]",
  luteal: "bg-[#f8f5f9] text-[#684b7a] hover:bg-[#f1ebf4]",
};

export function PhaseCalendar({ status, onDayClick }: Props) {
  return (
    <section className="hairline bg-[color:var(--color-surface-container-lowest)] p-4 sm:p-6 lg:p-10">
      <div className="flex flex-col gap-3 mb-5 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="eyebrow text-[color:var(--color-primary)]">Ahead</span>
          <h3 className="mt-1 font-display text-[20px] sm:text-[24px] font-medium text-[color:var(--color-primary)]">
            Your next 4 weeks
          </h3>
          <p className="mt-1 text-[13px] sm:text-[14px] italic text-[color:var(--color-on-surface-variant)]">
            Tap any day for hormone state, cognitive notes, and recommendations.
          </p>
        </div>
        <Legend />
      </div>

      <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div
            key={d}
            className="text-center text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.12em] sm:tracking-[0.16em] text-[color:var(--color-on-surface-variant)]"
          >
            <span className="sm:hidden">{d.slice(0, 1)}</span>
            <span className="hidden sm:inline">{d}</span>
          </div>
        ))}
        {alignToWeekGrid(status.schedule).map((day, i) =>
          day === null ? (
            <div key={`empty-${i}`} aria-hidden />
          ) : (
            <DayCell
              key={i}
              day={day}
              isToday={i === firstTodayIndex(status.schedule)}
              onClick={() => onDayClick(day)}
            />
          ),
        )}
      </div>
    </section>
  );
}

function DayCell({
  day,
  isToday,
  onClick,
}: {
  day: DayInfo;
  isToday: boolean;
  onClick: () => void;
}) {
  const profile = phaseProfiles[day.phase];
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex aspect-square min-h-[40px] flex-col items-center justify-center transition-all duration-200 ${phaseLight[day.phase]} ${
        isToday ? "ring-1 ring-[color:var(--color-primary)] ring-offset-1" : ""
      } hover:-translate-y-0.5`}
      aria-label={`${day.date.toDateString()}, ${profile.name} phase day ${day.dayInPhase} of ${day.phaseLength}`}
    >
      <span className="font-display text-[13px] sm:text-[15px] font-medium leading-none">
        {day.date.getDate()}
      </span>
      <span className="mt-0.5 text-[7px] sm:text-[8px] font-semibold uppercase tracking-[0.1em] sm:tracking-[0.12em] opacity-60">
        {profile.shortLabel}
      </span>
    </button>
  );
}

function Legend() {
  return (
    <div className="flex flex-wrap gap-x-3 gap-y-1.5 sm:gap-3">
      {(["menstrual", "follicular", "ovulatory", "luteal"] as const).map((p) => (
        <div key={p} className="flex items-center gap-1.5">
          <span className={`inline-block h-2 w-2 rounded-full ${phaseAccent[p]}`} />
          <span className="text-[10px] uppercase tracking-[0.12em] text-[color:var(--color-on-surface-variant)]">
            {phaseProfiles[p].name}
          </span>
        </div>
      ))}
    </div>
  );
}

function alignToWeekGrid(schedule: DayInfo[]): (DayInfo | null)[] {
  if (schedule.length === 0) return [];
  const first = schedule[0].date;
  const dayOfWeek = first.getDay();
  const mondayOffset = (dayOfWeek + 6) % 7;
  const padding: (DayInfo | null)[] = Array(mondayOffset).fill(null);
  return [...padding, ...schedule];
}

function firstTodayIndex(schedule: DayInfo[]): number {
  if (schedule.length === 0) return -1;
  const dayOfWeek = schedule[0].date.getDay();
  const mondayOffset = (dayOfWeek + 6) % 7;
  return mondayOffset;
}
