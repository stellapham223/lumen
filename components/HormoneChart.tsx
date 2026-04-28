import { MaterialIcon } from "./MaterialIcon";
import { getHormoneCurve } from "@/lib/hormone-data";
import type { CycleStatus } from "@/lib/cycle-calculator";

interface Props {
  status: CycleStatus;
  cycleLength: number;
  periodLength: number;
}

const PADDING = { top: 28, right: 24, bottom: 32, left: 36 };
const HEIGHT = 240;

export function HormoneChart({ status, cycleLength, periodLength }: Props) {
  const curve = getHormoneCurve(cycleLength, periodLength);
  const ovulationDay = Math.max(cycleLength - 14, periodLength + 4);

  const innerWidth = 600;
  const innerHeight = HEIGHT - PADDING.top - PADDING.bottom;
  const totalWidth = innerWidth + PADDING.left + PADDING.right;
  const totalHeight = HEIGHT;

  const xFor = (day: number) =>
    PADDING.left + ((day - 1) / Math.max(cycleLength - 1, 1)) * innerWidth;
  const yFor = (level: number) =>
    PADDING.top + innerHeight - (level / 100) * innerHeight;

  const buildPath = (key: "estrogen" | "progesterone") =>
    curve
      .map((p, i) => `${i === 0 ? "M" : "L"} ${xFor(p.dayInCycle)} ${yFor(p[key])}`)
      .join(" ");

  const phaseBounds = getPhaseBounds(cycleLength, periodLength);

  return (
    <section className="hairline bg-[color:var(--color-surface-container-lowest)] p-6 sm:p-10">
      <div className="flex flex-col gap-2 mb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="eyebrow text-[color:var(--color-primary)]">Your cycle</span>
          <h3 className="mt-1 font-display text-[24px] font-medium text-[color:var(--color-primary)]">
            Hormone curve
          </h3>
          <p className="mt-1 text-[14px] italic text-[color:var(--color-on-surface-variant)]">
            Day {status.dayInCycle} of {cycleLength}. The dashed line marks today.
          </p>
        </div>
        <Legend />
      </div>

      <div className="-mx-2 overflow-x-auto">
        <svg
          viewBox={`0 0 ${totalWidth} ${totalHeight}`}
          className="w-full min-w-[560px]"
          role="img"
          aria-label="Hormone curves across the menstrual cycle"
        >
          {phaseBounds.map((b) => (
            <rect
              key={b.phase}
              x={xFor(b.start)}
              y={PADDING.top}
              width={xFor(b.end + 1) - xFor(b.start)}
              height={innerHeight}
              fill={b.fill}
              opacity={0.5}
            />
          ))}

          {[0, 25, 50, 75, 100].map((v) => (
            <g key={v}>
              <line
                x1={PADDING.left}
                x2={PADDING.left + innerWidth}
                y1={yFor(v)}
                y2={yFor(v)}
                stroke="rgba(66, 0, 147, 0.06)"
                strokeWidth={1}
                strokeDasharray={v === 0 ? "" : "2 4"}
              />
              <text
                x={PADDING.left - 8}
                y={yFor(v) + 4}
                textAnchor="end"
                style={{ fontSize: "10px", fill: "#7b7485" }}
              >
                {v}
              </text>
            </g>
          ))}

          {[1, Math.ceil(cycleLength / 4), Math.ceil(cycleLength / 2), Math.ceil((cycleLength * 3) / 4), cycleLength].map(
            (d) => (
              <text
                key={d}
                x={xFor(d)}
                y={HEIGHT - 8}
                textAnchor="middle"
                style={{ fontSize: "10px", fill: "#7b7485" }}
              >
                D{d}
              </text>
            ),
          )}

          <path
            d={buildPath("estrogen")}
            fill="none"
            stroke="#420093"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={buildPath("progesterone")}
            fill="none"
            stroke="#a66d24"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="0"
          />

          <circle cx={xFor(ovulationDay)} cy={yFor(95)} r={4} fill="#552400" />
          <text
            x={xFor(ovulationDay)}
            y={yFor(95) - 10}
            textAnchor="middle"
            style={{
              fontSize: "9px",
              fill: "#552400",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            LH surge
          </text>

          <line
            x1={xFor(status.dayInCycle)}
            x2={xFor(status.dayInCycle)}
            y1={PADDING.top}
            y2={PADDING.top + innerHeight}
            stroke="#420093"
            strokeWidth={1.5}
            strokeDasharray="3 3"
          />
          <text
            x={xFor(status.dayInCycle)}
            y={PADDING.top - 10}
            textAnchor="middle"
            style={{
              fontSize: "9px",
              fill: "#420093",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            Today
          </text>
        </svg>
      </div>

      <p className="mt-4 flex items-center gap-2 text-[12px] italic text-[color:var(--color-on-surface-variant)]/70">
        <MaterialIcon name="info" size={14} weight={300} />
        Curves are illustrative averages. Real hormone levels vary per person.
      </p>
    </section>
  );
}

function Legend() {
  return (
    <div className="flex gap-4 text-[10px] uppercase tracking-[0.12em] text-[color:var(--color-on-surface-variant)]">
      <span className="flex items-center gap-1.5">
        <span className="inline-block h-0.5 w-3 bg-[color:var(--color-primary)]" />
        Estrogen
      </span>
      <span className="flex items-center gap-1.5">
        <span className="inline-block h-0.5 w-3 bg-[#a66d24]" />
        Progesterone
      </span>
      <span className="flex items-center gap-1.5">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#552400]" />
        LH surge
      </span>
    </div>
  );
}

function getPhaseBounds(cycleLength: number, periodLength: number) {
  const ovulationDay = Math.max(cycleLength - 14, periodLength + 4);
  return [
    { phase: "menstrual", start: 1, end: periodLength, fill: "#fdf5f5" },
    { phase: "follicular", start: periodLength + 1, end: ovulationDay - 2, fill: "#fffaf0" },
    { phase: "ovulatory", start: ovulationDay - 1, end: ovulationDay + 1, fill: "#f4f7f4" },
    { phase: "luteal", start: ovulationDay + 2, end: cycleLength, fill: "#f8f5f9" },
  ];
}
