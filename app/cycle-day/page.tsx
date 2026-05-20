import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { CYCLE_DAY_PAGES } from "@/lib/cycle-day-pages";

export const metadata: Metadata = {
  title: "Cycle day guides: day-by-day what is happening",
  description:
    "Day-by-day guides to the menstrual cycle. What is happening hormonally, energy level, what to schedule, what to skip, on each meaningful cycle day.",
  alternates: { canonical: "/cycle-day" },
  openGraph: {
    title: "Cycle day guides | Lumen",
    description:
      "Day-by-day guides to the menstrual cycle. Hormones, energy, what to do, on each meaningful cycle day.",
    url: "/cycle-day",
    type: "website",
  },
};

const PHASE_LABEL: Record<string, string> = {
  menstrual: "Menstrual",
  follicular: "Follicular",
  ovulatory: "Ovulatory",
  luteal: "Luteal",
};

export default function CycleDayIndex() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Lumen", path: "/" },
          { name: "Cycle day", path: "/cycle-day" },
        ]}
      />

      <header className="mb-8 sm:mb-12">
        <span className="eyebrow text-[color:var(--color-primary)] tracking-[0.2em]">
          Cycle day guides
        </span>
        <h1 className="mt-3 font-display text-[32px] leading-[1.08] tracking-[-0.02em] text-[color:var(--color-primary)] sm:mt-4 sm:text-[44px] sm:leading-[1.05] lg:text-[56px]">
          What is happening today.
        </h1>
        <p className="mt-4 font-display text-[16px] leading-[1.45] text-[color:var(--color-on-surface-variant)] sm:mt-6 sm:text-[20px] sm:leading-[1.4]">
          Day-by-day reference for the menstrual cycle. Hormones, energy,
          what to schedule, what to skip. Anchored to a 28-day reference cycle;
          adjust to your own length using the{" "}
          <Link
            href="/calculator/cycle-phase"
            className="underline underline-offset-2 text-[color:var(--color-primary)] hover:opacity-70"
          >
            cycle phase calculator
          </Link>
          .
        </p>
      </header>

      <div className="hairline-b mb-8 sm:mb-12" />

      <ul className="space-y-6 sm:space-y-8">
        {CYCLE_DAY_PAGES.map((p) => (
          <li
            key={p.day}
            className="hairline-b last:border-0 pb-6 sm:pb-8 last:pb-0"
          >
            <article>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-on-surface-variant)]">
                Day {p.day} · {PHASE_LABEL[p.phase]} phase
              </p>
              <h2 className="mt-3 font-display text-[20px] sm:text-[24px] lg:text-[28px] font-medium leading-tight">
                <Link
                  href={`/cycle-day/${p.day}`}
                  className="text-[color:var(--color-primary)] transition-opacity hover:opacity-70"
                >
                  {p.title}
                </Link>
              </h2>
              <p className="mt-3 text-[15px] sm:text-[16px] leading-relaxed text-[color:var(--color-on-surface)]">
                {p.description}
              </p>
              <Link
                href={`/cycle-day/${p.day}`}
                className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-primary)] transition-opacity hover:opacity-70"
              >
                Read day {p.day} →
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}
