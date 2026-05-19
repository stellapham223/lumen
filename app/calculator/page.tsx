import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { CALCULATOR_PAGES } from "@/lib/calculator-pages";
import { PHASE_PAGES } from "@/lib/phase-pages";

export const metadata: Metadata = {
  title: "Cycle calculators: ovulation, phase, period, and more",
  description:
    "Free cycle calculators: cycle phase, ovulation, luteal phase, follicular phase, period prediction. No signup, no account, runs in your browser. Plus deep-dive references on each phase.",
  alternates: { canonical: "/calculator" },
  openGraph: {
    title: "Cycle calculators: ovulation, phase, period, and more",
    description:
      "Free cycle calculators and phase references. No signup, no account.",
    url: "/calculator",
    type: "website",
  },
};

export default function CalculatorIndexPage() {
  return (
    <main className="mx-auto w-full max-w-[960px] px-4 pt-8 pb-20 sm:px-6 sm:pt-12 sm:pb-24 lg:px-8 lg:pt-16 lg:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Lumen", path: "/" },
          { name: "Calculator", path: "/calculator" },
        ]}
      />

      <header className="mb-12 flex flex-col gap-4">
        <span className="eyebrow text-[color:var(--color-primary)] tracking-[0.2em]">
          Calculators
        </span>
        <h1 className="font-display text-[32px] leading-[1.08] tracking-[-0.02em] text-[color:var(--color-primary)] sm:text-[44px] sm:leading-[1.05] lg:text-[56px]">
          Cycle calculators
        </h1>
        <p className="max-w-[640px] font-display text-[16px] leading-[1.45] text-[color:var(--color-on-surface-variant)] sm:text-[20px] sm:leading-[1.4]">
          Five free calculators that answer the most common cycle questions.
          No signup, no account, runs in your browser. All five use the same
          underlying math; pick the one that matches what you want to know.
        </p>
      </header>

      <section className="mb-16">
        <h2 className="mb-6 font-display text-[20px] sm:text-[24px] text-[color:var(--color-primary)]">
          Calculators
        </h2>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {CALCULATOR_PAGES.map((p) => (
            <li
              key={p.slug}
              className="hairline bg-[color:var(--color-surface-container-lowest)] p-5 sm:p-6 transition-opacity hover:opacity-80"
            >
              <Link
                href={`/calculator/${p.slug}`}
                className="flex flex-col gap-2"
              >
                <span className="font-display text-[16px] sm:text-[18px] font-medium text-[color:var(--color-primary)]">
                  {p.title.split(":")[0]}
                </span>
                <span className="text-[13px] sm:text-[14px] leading-relaxed text-[color:var(--color-on-surface)]">
                  {p.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-16">
        <h2 className="mb-3 font-display text-[20px] sm:text-[24px] text-[color:var(--color-primary)]">
          Phase deep-dive references
        </h2>
        <p className="mb-6 text-[14px] sm:text-[15px] leading-relaxed text-[color:var(--color-on-surface-variant)]">
          Each phase has a reference page covering hormones, symptoms, what is
          normal, when to see a doctor, and embedded calculator. Use these for
          context; use the calculators above for quick answers.
        </p>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {PHASE_PAGES.map((p) => (
            <li
              key={p.slug}
              className="hairline bg-[color:var(--color-surface-container-lowest)] p-5 sm:p-6 transition-opacity hover:opacity-80"
            >
              <Link href={`/${p.slug}`} className="flex flex-col gap-2">
                <span className="font-display text-[16px] sm:text-[18px] font-medium text-[color:var(--color-primary)]">
                  {p.title.split(":")[0]}
                </span>
                <span className="text-[13px] sm:text-[14px] leading-relaxed text-[color:var(--color-on-surface)]">
                  {p.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="hairline bg-[color:var(--color-surface-container-lowest)] p-6 sm:p-10 lg:p-12">
        <span className="eyebrow text-[color:var(--color-primary)]">How these work</span>
        <p className="mt-4 text-[14px] sm:text-[15px] leading-relaxed text-[color:var(--color-on-surface)]">
          All calculators use the standard four-phase model with a 14-day
          luteal phase. Enter your last period start date and cycle length;
          the math runs in your browser. We do not store your cycle data on a
          server. Saved input persists locally on your device only and can be
          cleared anytime from the home page.
        </p>
        <p className="mt-3 text-[14px] sm:text-[15px] leading-relaxed text-[color:var(--color-on-surface)]">
          Calendar-based prediction is reliable for regular cycles within 1 to
          3 days. It is less accurate for irregular cycles, perimenopause,
          PMOS (formerly PCOS), or on hormonal birth control. The individual
          calculator pages cover the relevant caveats for each use case.
        </p>
      </section>
    </main>
  );
}
