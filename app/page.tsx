"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Hero } from "@/components/Hero";
import { CycleInput } from "@/components/CycleInput";
import { DemoToggle } from "@/components/DemoToggle";
import { MaterialIcon } from "@/components/MaterialIcon";
import {
  type CycleInput as CycleInputType,
} from "@/lib/cycle-calculator";
import { saveCycleInput, loadCycleInput } from "@/lib/storage";
import { track } from "@/lib/analytics";

export default function Home() {
  const router = useRouter();
  const [hasSavedPlan, setHasSavedPlan] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = loadCycleInput();
    setHasSavedPlan(stored !== null);
    setHydrated(true);
  }, []);

  function handleSubmit(values: CycleInputType, source: "form" | "demo" = "form") {
    saveCycleInput(values);
    track(source === "demo" ? "demo_loaded" : "calculator_complete", {
      cycle_length: values.cycleLength,
      period_length: values.periodLength,
    });
    router.push("/plan");
  }

  return (
    <main className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-4 pt-6 pb-20 sm:gap-16 sm:px-8 sm:pt-12 sm:pb-32 lg:px-12">
      {hydrated && hasSavedPlan && (
        <div
          className="hairline flex flex-col gap-2 bg-[color:var(--color-surface-container-low)] px-4 py-3 -mb-6 animate-fade-in sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:-mb-16"
        >
          <p className="font-display text-[13px] italic text-[color:var(--color-on-surface-variant)]">
            You have a saved cycle plan.
          </p>
          <a
            href="/plan"
            className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-primary)] transition-opacity hover:opacity-70"
          >
            View your plan
            <MaterialIcon name="arrow_forward" size={14} weight={400} />
          </a>
        </div>
      )}

      <Hero />

      <section
        id="check-cycle"
        className="hairline mx-auto w-full max-w-[600px] scroll-mt-24 bg-[color:var(--color-surface-container-lowest)] p-6 sm:p-10 lg:p-12 animate-scale-in"
        style={{ animationDelay: "400ms" }}
      >
        <div className="mb-6 sm:mb-8 flex flex-col gap-2 text-center">
          <span className="eyebrow text-[color:var(--color-primary)]">Begin</span>
          <h2 className="font-display text-[24px] sm:text-[32px] leading-[1.2] font-medium text-[color:var(--color-primary)]">
            Tell us about your cycle
          </h2>
          <p className="text-[13px] sm:text-[14px] text-[color:var(--color-on-surface-variant)]">
            Calculate your current phase in 30 seconds. We don&apos;t store
            anything.
          </p>
        </div>
        <CycleInput onSubmit={handleSubmit} />
      </section>

      <div className="animate-fade-up" style={{ animationDelay: "500ms" }}>
        <DemoToggle onDemo={(values) => handleSubmit(values, "demo")} />
      </div>
    </main>
  );
}
