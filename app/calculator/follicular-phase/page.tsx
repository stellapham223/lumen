import type { Metadata } from "next";
import Link from "next/link";
import { CalculatorWidget } from "@/components/CalculatorWidget";
import {
  ArticleJsonLd,
  BreadcrumbJsonLd,
  FaqJsonLd,
} from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Follicular phase calculator: when is my follicular phase?",
  description:
    "Free follicular phase calculator. Shows follicular start date, end date, and days until it begins. Plus what your body does during follicular phase and why it matters.",
  alternates: { canonical: "/calculator/follicular-phase" },
  openGraph: {
    title: "Follicular phase calculator: when is my follicular phase?",
    description:
      "Free follicular phase calculator. Start date, end date, days remaining.",
    url: "/calculator/follicular-phase",
    type: "website",
  },
};

export default function FollicularPhaseCalculatorPage() {
  return (
    <>
      <ArticleJsonLd
        headline="Follicular phase calculator: when is my follicular phase?"
        description="Free follicular phase calculator. Start date, end date, and days remaining."
        path="/calculator/follicular-phase"
        datePublished="2026-05-19"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Lumen", path: "/" },
          { name: "Calculator", path: "/calculator/follicular-phase" },
          {
            name: "Follicular phase calculator",
            path: "/calculator/follicular-phase",
          },
        ]}
      />
      <FaqJsonLd
        faqs={[
          {
            question: "When does the follicular phase start?",
            answer:
              "Technically the follicular phase begins on day 1 of your cycle (the first day of bleeding) and ends at ovulation. In practical use, especially in cycle syncing, 'follicular phase' usually refers to the post-period stretch from the end of bleeding until 2 days before ovulation, when rising estrogen produces a noticeable energy and mood lift.",
          },
          {
            question: "How long is the follicular phase?",
            answer:
              "Using the practical definition (post-period to pre-ovulation), the follicular phase is typically 7 to 10 days. The full follicular phase from day 1 of bleeding to ovulation is longer, typically 12 to 16 days. Length varies more than the luteal phase because cycle length differences usually come from variable follicular length.",
          },
          {
            question: "What happens in the follicular phase?",
            answer:
              "Estrogen rises steadily through the follicular phase. Follicles in the ovary mature, and one becomes dominant. Verbal fluency, learning, mood, and energy tend to peak in late follicular. Insulin sensitivity is highest. The brain's neuroplasticity markers (BDNF) rise with estrogen, supporting cognitive performance.",
          },
          {
            question: "Why is follicular phase considered the best for hard tasks?",
            answer:
              "Multiple studies show modest but consistent improvements in verbal fluency, learning consolidation, and self-reported mood and energy in late follicular. If you have flexibility in when you schedule demanding work, follicular phase is a defensible default for it. Effect sizes are modest; do not expect transformation, expect a small edge.",
          },
          {
            question: "Does the follicular phase apply on birth control?",
            answer:
              "Hormonal birth control suppresses natural follicular development. On combined pills or hormonal IUD, you do not have a meaningful follicular phase in the natural sense. The 'period' you have on the pill is a withdrawal bleed. The phase model does not apply meaningfully. See our guide to cycle syncing on birth control for a method-by-method picture.",
          },
        ]}
      />

      <main className="mx-auto flex w-full max-w-[960px] flex-col gap-12 px-4 pt-6 pb-20 sm:gap-16 sm:px-8 sm:pt-12 sm:pb-32 lg:px-12">
        <header className="flex flex-col gap-4">
          <span className="eyebrow text-[color:var(--color-primary)] tracking-[0.2em]">
            Calculator
          </span>
          <h1 className="font-display text-[32px] leading-[1.08] tracking-[-0.02em] text-[color:var(--color-primary)] sm:text-[44px] sm:leading-[1.05] lg:text-[56px]">
            Follicular phase calculator
          </h1>
          <p className="max-w-[640px] font-display text-[16px] leading-[1.45] text-[color:var(--color-on-surface-variant)] sm:text-[20px] sm:leading-[1.4]">
            See when your follicular phase starts, ends, and how many days
            until it begins. Plus the honest version of why this phase often
            gets called the cognitive peak, and where that claim is well or
            weakly supported.
          </p>
        </header>

        <CalculatorWidget mode="follicular-phase" />

        <section className="flex flex-col gap-6">
          <h2 className="font-display text-[24px] sm:text-[28px] leading-tight text-[color:var(--color-primary)]">
            What the follicular phase is
          </h2>
          <p className="text-[15px] sm:text-[16px] leading-relaxed text-[color:var(--color-on-surface)]">
            The follicular phase is the part of your cycle when follicles in
            the ovary mature in preparation for ovulation. Strictly, it runs
            from day 1 of your period through ovulation. In cycle syncing
            usage, it usually refers to the post-period window, after bleeding
            stops and before ovulation, when estrogen is rising clearly.
          </p>
          <p className="text-[15px] sm:text-[16px] leading-relaxed text-[color:var(--color-on-surface)]">
            This calculator uses the practical post-period definition because
            that is the window where the typical "follicular phase advice"
            applies (energy lift, focus, planning ahead). The full technical
            follicular phase includes your period days.
          </p>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="font-display text-[24px] sm:text-[28px] leading-tight text-[color:var(--color-primary)]">
            What is well supported about follicular phase cognition
          </h2>
          <ul className="flex flex-col gap-3 text-[15px] sm:text-[16px] leading-relaxed text-[color:var(--color-on-surface)]">
            <li>
              <strong>Verbal fluency rises with estrogen</strong>. Multiple
              studies using standard verbal-fluency tasks show a modest
              improvement in late follicular and around ovulation.
            </li>
            <li>
              <strong>Learning consolidation improves</strong>. BDNF
              (brain-derived neurotrophic factor) rises with estrogen,
              supporting neural plasticity and memory formation.
            </li>
            <li>
              <strong>Mood tends to lift</strong>. Self-reported mood, energy,
              and motivation tend to climb through follicular and peak around
              ovulation.
            </li>
            <li>
              <strong>Insulin sensitivity is highest</strong>. Glucose
              handling is better in follicular than luteal for most women,
              which can affect appetite and energy stability.
            </li>
          </ul>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="font-display text-[24px] sm:text-[28px] leading-tight text-[color:var(--color-primary)]">
            What the research does not support
          </h2>
          <ul className="flex flex-col gap-3 text-[15px] sm:text-[16px] leading-relaxed text-[color:var(--color-on-surface)]">
            <li>
              <strong>Phase-specific food prescriptions</strong>. Eating
              specific foods in follicular vs other phases is not clinically
              validated. Seed cycling has essentially no trial backing.
            </li>
            <li>
              <strong>Phase-synced workout splits as superior</strong>. Despite
              the popular claim that follicular is "the workout phase",
              meta-analyses do not show that cycle-synced training
              outperforms consistent training for most women.
            </li>
            <li>
              <strong>Universally required for performance</strong>. The
              follicular advantage is modest and inter-individual. Some women
              feel a clear lift; others do not. Both are normal.
            </li>
          </ul>
          <p className="text-[15px] sm:text-[16px] leading-relaxed text-[color:var(--color-on-surface)]">
            See{" "}
            <Link
              href="/blog/is-cycle-syncing-legit"
              className="underline underline-offset-2 text-[color:var(--color-primary)] hover:opacity-70"
            >
              is cycle syncing legit
            </Link>{" "}
            for the full evidence review.
          </p>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="font-display text-[24px] sm:text-[28px] leading-tight text-[color:var(--color-primary)]">
            Frequently asked questions
          </h2>
          <div className="flex flex-col gap-5">
            <FaqBlock
              q="When does the follicular phase start?"
              a="Technically the follicular phase begins on day 1 of your cycle (the first day of bleeding) and ends at ovulation. In practical use, especially in cycle syncing, 'follicular phase' usually refers to the post-period stretch from the end of bleeding until 2 days before ovulation, when rising estrogen produces a noticeable energy and mood lift."
            />
            <FaqBlock
              q="How long is the follicular phase?"
              a="Using the practical definition (post-period to pre-ovulation), the follicular phase is typically 7 to 10 days. The full follicular phase from day 1 of bleeding to ovulation is longer, typically 12 to 16 days. Length varies more than the luteal phase because cycle length differences usually come from variable follicular length."
            />
            <FaqBlock
              q="What happens in the follicular phase?"
              a="Estrogen rises steadily through the follicular phase. Follicles in the ovary mature, and one becomes dominant. Verbal fluency, learning, mood, and energy tend to peak in late follicular. Insulin sensitivity is highest. The brain's neuroplasticity markers (BDNF) rise with estrogen, supporting cognitive performance."
            />
            <FaqBlock
              q="Why is follicular phase considered the best for hard tasks?"
              a="Multiple studies show modest but consistent improvements in verbal fluency, learning consolidation, and self-reported mood and energy in late follicular. If you have flexibility in when you schedule demanding work, follicular phase is a defensible default for it. Effect sizes are modest; do not expect transformation, expect a small edge."
            />
            <FaqBlock
              q="Does the follicular phase apply on birth control?"
              a="Hormonal birth control suppresses natural follicular development. On combined pills or hormonal IUD, you do not have a meaningful follicular phase in the natural sense. The 'period' you have on the pill is a withdrawal bleed. The phase model does not apply meaningfully. See our guide to cycle syncing on birth control for a method-by-method picture."
            />
          </div>
        </section>

        <section className="hairline bg-[color:var(--color-surface-container-lowest)] p-6 sm:p-10 lg:p-12 flex flex-col gap-4">
          <span className="eyebrow text-[color:var(--color-primary)]">Related</span>
          <ul className="flex flex-col gap-2 text-[14px] sm:text-[15px] text-[color:var(--color-on-surface)]">
            <li>
              <Link
                href="/calculator/cycle-phase"
                className="underline underline-offset-2 text-[color:var(--color-primary)] hover:opacity-70"
              >
                Cycle phase calculator
              </Link>
            </li>
            <li>
              <Link
                href="/calculator/ovulation"
                className="underline underline-offset-2 text-[color:var(--color-primary)] hover:opacity-70"
              >
                Ovulation calculator
              </Link>
            </li>
            <li>
              <Link
                href="/calculator/luteal-phase"
                className="underline underline-offset-2 text-[color:var(--color-primary)] hover:opacity-70"
              >
                Luteal phase calculator
              </Link>
            </li>
            <li>
              <Link
                href="/calculator/period-prediction"
                className="underline underline-offset-2 text-[color:var(--color-primary)] hover:opacity-70"
              >
                Period predictor
              </Link>
            </li>
            <li>
              <Link
                href="/blog/follicular-phase-complete-guide"
                className="underline underline-offset-2 text-[color:var(--color-primary)] hover:opacity-70"
              >
                Follicular phase complete guide
              </Link>
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}

function FaqBlock({ q, a }: { q: string; a: string }) {
  return (
    <details className="hairline bg-[color:var(--color-surface-container-lowest)] p-5">
      <summary className="cursor-pointer font-display text-[16px] sm:text-[18px] font-medium text-[color:var(--color-primary)]">
        {q}
      </summary>
      <p className="mt-3 text-[14px] sm:text-[15px] leading-relaxed text-[color:var(--color-on-surface)]">
        {a}
      </p>
    </details>
  );
}
