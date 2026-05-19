"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MaterialIcon } from "./MaterialIcon";
import { CycleInput } from "./CycleInput";
import {
  calculateCycle,
  type CycleInput as CycleInputType,
  type Phase,
} from "@/lib/cycle-calculator";
import { saveCycleInput } from "@/lib/storage";
import { track } from "@/lib/analytics";
import type { CalculatorMode } from "@/lib/calculator-pages";

interface Props {
  mode: CalculatorMode;
}

const PHASE_LABEL: Record<Phase, string> = {
  menstrual: "Menstrual",
  follicular: "Follicular",
  ovulatory: "Ovulatory",
  luteal: "Luteal",
};

const PHASE_DESCRIPTION: Record<Phase, string> = {
  menstrual:
    "Bleeding phase. Estrogen and progesterone are at their lowest. Energy tends to be lower; recovery and rest are well-supported by biology.",
  follicular:
    "Estrogen is rising. Follicles in the ovary are maturing. Verbal fluency and learning capacity tend to peak here, especially in late follicular.",
  ovulatory:
    "Estrogen peaks then drops. Testosterone briefly spikes. Libido and confidence often rise. Conception is biologically possible in this window.",
  luteal:
    "Progesterone is the dominant hormone. Body temperature rises slightly. Late luteal can bring PMS-type symptoms; early luteal is often productive.",
};

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function addDays(d: Date, n: number): Date {
  const out = new Date(d);
  out.setDate(out.getDate() + n);
  return out;
}

export function CalculatorWidget({ mode }: Props) {
  const [input, setInput] = useState<CycleInputType | null>(null);

  function handleSubmit(values: CycleInputType) {
    setInput(values);
    saveCycleInput(values);
    track("calculator_complete", {
      mode,
      cycle_length: values.cycleLength,
      period_length: values.periodLength,
    });
  }

  const result = useMemo(() => {
    if (!input) return null;
    return calculateCycle(input);
  }, [input]);

  return (
    <div className="flex flex-col gap-8">
      <div className="hairline bg-[color:var(--color-surface-container-lowest)] p-6 sm:p-10 lg:p-12">
        <div className="mb-6 sm:mb-8 flex flex-col gap-2 text-center">
          <span className="eyebrow text-[color:var(--color-primary)]">Calculate</span>
          <p className="font-display text-[20px] sm:text-[24px] leading-[1.2] font-medium text-[color:var(--color-primary)]">
            Tell us about your cycle
          </p>
          <p className="text-[13px] sm:text-[14px] text-[color:var(--color-on-surface-variant)]">
            30 seconds. We do not store anything on a server.
          </p>
        </div>
        <CycleInput onSubmit={handleSubmit} initialValues={input ?? undefined} />
      </div>

      {result && input && (
        <div className="hairline bg-[color:var(--color-surface-container-low)] p-6 sm:p-10 lg:p-12 animate-fade-in">
          <ResultPanel mode={mode} input={input} result={result} />
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/plan"
              className="inline-flex items-center gap-1.5 rounded bg-[color:var(--color-primary)] px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition-opacity hover:opacity-90"
            >
              See full 28-day plan
              <MaterialIcon name="arrow_forward" size={14} weight={400} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

interface ResultProps {
  mode: CalculatorMode;
  input: CycleInputType;
  result: ReturnType<typeof calculateCycle>;
}

function ResultPanel({ mode, input, result }: ResultProps) {
  if (mode === "cycle-phase") return <CyclePhaseResult result={result} />;
  if (mode === "ovulation") return <OvulationResult input={input} result={result} />;
  if (mode === "luteal-phase") return <PhaseWindowResult phase="luteal" input={input} result={result} />;
  if (mode === "follicular-phase") return <PhaseWindowResult phase="follicular" input={input} result={result} />;
  if (mode === "period-prediction") return <PeriodPredictionResult input={input} result={result} />;
  return null;
}

function CyclePhaseResult({ result }: { result: ReturnType<typeof calculateCycle> }) {
  return (
    <div className="flex flex-col gap-4">
      <span className="eyebrow text-[color:var(--color-primary)]">Today</span>
      <div className="font-display text-[28px] sm:text-[36px] leading-tight text-[color:var(--color-primary)]">
        You are in <strong>{PHASE_LABEL[result.phase]}</strong> phase,{" "}
        <strong>day {result.dayInPhase} of {result.phaseLength}</strong>.
      </div>
      <p className="max-w-[600px] text-[14px] sm:text-[15px] leading-relaxed text-[color:var(--color-on-surface)]">
        {PHASE_DESCRIPTION[result.phase]}
      </p>
      <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Stat label="Day in cycle" value={String(result.dayInCycle)} />
        <Stat
          label={`Days until ${PHASE_LABEL[result.nextPhase]}`}
          value={String(result.daysToNextPhase)}
        />
        <Stat label="Next period" value={formatDate(result.nextPeriodDate)} />
      </dl>
    </div>
  );
}

function OvulationResult({
  input,
  result,
}: {
  input: CycleInputType;
  result: ReturnType<typeof calculateCycle>;
}) {
  const ovulationDayInCycle = Math.max(
    input.cycleLength - 14,
    input.periodLength + 4,
  );

  const cyclesElapsed = Math.floor(
    (result.date.getTime() - new Date(input.lastPeriodStart).getTime()) /
      (1000 * 60 * 60 * 24) /
      input.cycleLength,
  );

  const periodStart = new Date(input.lastPeriodStart);
  periodStart.setHours(0, 0, 0, 0);

  const nextOvulationDate = addDays(
    periodStart,
    cyclesElapsed * input.cycleLength + (ovulationDayInCycle - 1),
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let daysToOvulation = Math.round(
    (nextOvulationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  let displayDate = nextOvulationDate;
  if (daysToOvulation < 0) {
    displayDate = addDays(displayDate, input.cycleLength);
    daysToOvulation += input.cycleLength;
  }

  const fertileStart = addDays(displayDate, -5);
  const fertileEnd = addDays(displayDate, 1);

  return (
    <div className="flex flex-col gap-4">
      <span className="eyebrow text-[color:var(--color-primary)]">Estimated ovulation</span>
      <div className="font-display text-[28px] sm:text-[36px] leading-tight text-[color:var(--color-primary)]">
        Around <strong>{formatDate(displayDate)}</strong>{" "}
        <span className="text-[color:var(--color-on-surface-variant)]">({daysToOvulation === 0 ? "today" : daysToOvulation === 1 ? "tomorrow" : `${daysToOvulation} days`})</span>
      </div>
      <p className="max-w-[640px] text-[14px] sm:text-[15px] leading-relaxed text-[color:var(--color-on-surface)]">
        Fertile window: <strong>{formatDate(fertileStart)}</strong> to{" "}
        <strong>{formatDate(fertileEnd)}</strong>. The egg lives about 24 hours;
        sperm can live up to 5 days. Conception is biologically possible
        anywhere in this 6 to 7 day window.
      </p>
      <p className="max-w-[640px] text-[13px] text-[color:var(--color-on-surface-variant)]">
        Calendar-based prediction. Less accurate if your cycle varies more than
        a few days. For contraception or conception planning, pair with basal
        body temperature or LH testing.
      </p>
    </div>
  );
}

function PhaseWindowResult({
  phase,
  input,
  result,
}: {
  phase: "luteal" | "follicular";
  input: CycleInputType;
  result: ReturnType<typeof calculateCycle>;
}) {
  const periodStart = new Date(input.lastPeriodStart);
  periodStart.setHours(0, 0, 0, 0);

  const ovulationDay = Math.max(input.cycleLength - 14, input.periodLength + 4);

  const cyclesElapsed = Math.floor(
    (result.date.getTime() - periodStart.getTime()) /
      (1000 * 60 * 60 * 24) /
      input.cycleLength,
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const cycleStartThis = addDays(periodStart, cyclesElapsed * input.cycleLength);
  let follicularStartThis = addDays(cycleStartThis, input.periodLength);
  let follicularEndThis = addDays(cycleStartThis, ovulationDay - 2);
  let lutealStartThis = addDays(cycleStartThis, ovulationDay + 1);
  let lutealEndThis = addDays(cycleStartThis, input.cycleLength - 1);

  const target = phase === "luteal" ? lutealStartThis : follicularStartThis;
  let displayStart = target;
  let displayEnd = phase === "luteal" ? lutealEndThis : follicularEndThis;

  if (displayEnd < today) {
    displayStart = addDays(displayStart, input.cycleLength);
    displayEnd = addDays(displayEnd, input.cycleLength);
  }

  const daysUntil = Math.max(
    0,
    Math.round((displayStart.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)),
  );

  const isNow = today >= displayStart && today <= displayEnd;
  const phaseName = phase === "luteal" ? "Luteal" : "Follicular";

  return (
    <div className="flex flex-col gap-4">
      <span className="eyebrow text-[color:var(--color-primary)]">{phaseName} phase</span>
      {isNow ? (
        <div className="font-display text-[28px] sm:text-[36px] leading-tight text-[color:var(--color-primary)]">
          You are currently in <strong>{phaseName.toLowerCase()}</strong> phase.
        </div>
      ) : (
        <div className="font-display text-[28px] sm:text-[36px] leading-tight text-[color:var(--color-primary)]">
          Next {phaseName.toLowerCase()} phase starts in{" "}
          <strong>{daysUntil === 0 ? "today" : daysUntil === 1 ? "1 day" : `${daysUntil} days`}</strong>.
        </div>
      )}
      <p className="max-w-[600px] text-[14px] sm:text-[15px] leading-relaxed text-[color:var(--color-on-surface)]">
        {phase === "luteal" ? PHASE_DESCRIPTION.luteal : PHASE_DESCRIPTION.follicular}
      </p>
      <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Stat label={`${phaseName} starts`} value={formatDate(displayStart)} />
        <Stat label={`${phaseName} ends`} value={formatDate(displayEnd)} />
        <Stat
          label="Phase length"
          value={`${Math.round(
            (displayEnd.getTime() - displayStart.getTime()) / (1000 * 60 * 60 * 24),
          ) + 1} days`}
        />
      </dl>
    </div>
  );
}

function PeriodPredictionResult({
  input,
  result,
}: {
  input: CycleInputType;
  result: ReturnType<typeof calculateCycle>;
}) {
  const next1 = result.nextPeriodDate;
  const next2 = addDays(next1, input.cycleLength);
  const next3 = addDays(next2, input.cycleLength);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysToNext = Math.round(
    (next1.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  return (
    <div className="flex flex-col gap-4">
      <span className="eyebrow text-[color:var(--color-primary)]">Next period</span>
      <div className="font-display text-[28px] sm:text-[36px] leading-tight text-[color:var(--color-primary)]">
        Around <strong>{formatDate(next1)}</strong>{" "}
        <span className="text-[color:var(--color-on-surface-variant)]">({daysToNext === 0 ? "today" : daysToNext === 1 ? "tomorrow" : `in ${daysToNext} days`})</span>
      </div>
      <p className="max-w-[640px] text-[14px] sm:text-[15px] leading-relaxed text-[color:var(--color-on-surface)]">
        Based on a {input.cycleLength}-day cycle. Most predictions are accurate
        to within 2 to 3 days. Cycles often vary more than people remember, so
        treat this as a window, not a fixed date.
      </p>
      <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Stat label="Next period" value={formatDate(next1)} />
        <Stat label="Then" value={formatDate(next2)} />
        <Stat label="Then" value={formatDate(next3)} />
      </dl>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="hairline bg-[color:var(--color-surface-container-lowest)] p-4">
      <dt className="eyebrow text-[color:var(--color-on-surface-variant)]">{label}</dt>
      <dd className="mt-1 font-display text-[18px] sm:text-[20px] leading-tight text-[color:var(--color-primary)]">
        {value}
      </dd>
    </div>
  );
}
