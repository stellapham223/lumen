import type { Metadata } from "next";
import Link from "next/link";
import { CalculatorWidget } from "@/components/CalculatorWidget";
import {
  ArticleJsonLd,
  BreadcrumbJsonLd,
  FaqJsonLd,
} from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Period predictor: when is my next period?",
  description:
    "Free period predictor. Calculates your next 3 period start dates from your cycle length and last period. Honest about model limits for irregular cycles.",
  alternates: { canonical: "/calculator/period-prediction" },
  openGraph: {
    title: "Period predictor: when is my next period?",
    description:
      "Free period predictor. Next 3 period start dates, honest about accuracy.",
    url: "/calculator/period-prediction",
    type: "website",
  },
};

export default function PeriodPredictionCalculatorPage() {
  return (
    <>
      <ArticleJsonLd
        headline="Period predictor: when is my next period?"
        description="Free period predictor. Next 3 period start dates with accuracy caveats."
        path="/calculator/period-prediction"
        datePublished="2026-05-19"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Lumen", path: "/" },
          { name: "Calculator", path: "/calculator/period-prediction" },
          {
            name: "Period predictor",
            path: "/calculator/period-prediction",
          },
        ]}
      />
      <FaqJsonLd
        faqs={[
          {
            question: "How does the period predictor work?",
            answer:
              "It adds your cycle length to your last period start to estimate the next period. It then adds another cycle length to estimate the period after that, and so on. The math is straightforward; the accuracy depends entirely on how consistent your cycle length actually is.",
          },
          {
            question: "How accurate is calendar-based period prediction?",
            answer:
              "For women with regular cycles (varying by less than 5 days month to month), calendar prediction is accurate within 2 to 3 days. For more variable cycles, accuracy drops proportionally. Cycles often vary more than people remember, so treat predictions as a window, not a fixed date.",
          },
          {
            question: "What makes a cycle 'regular' or 'irregular'?",
            answer:
              "A typical regular cycle is 21 to 35 days, with month-to-month variation less than 7 days. Cycles longer than 35 days, shorter than 21 days, or varying more than 7 days month to month are considered irregular and may warrant medical evaluation, especially for fertility planning or if symptoms accompany them.",
          },
          {
            question: "What can make my period come earlier or later than predicted?",
            answer:
              "Stress, significant weight change, intense exercise, sleep disruption, illness, travel across time zones, and hormonal changes (including peri-menopause and post-pill recovery) all affect cycle timing. Even regular cycles drift by a few days. Use the prediction as a planning window, not a commitment.",
          },
          {
            question: "Should I track my period for fertility or contraception?",
            answer:
              "For fertility planning, period tracking is useful as a starting frame but should be paired with ovulation prediction kits or basal body temperature for precision timing. For contraception, calendar-based tracking alone has a typical-use failure rate too high to rely on; use sympto-thermal method or another method.",
          },
        ]}
      />

      <main className="mx-auto flex w-full max-w-[960px] flex-col gap-12 px-4 pt-6 pb-20 sm:gap-16 sm:px-8 sm:pt-12 sm:pb-32 lg:px-12">
        <header className="flex flex-col gap-4">
          <span className="eyebrow text-[color:var(--color-primary)] tracking-[0.2em]">
            Calculator
          </span>
          <h1 className="font-display text-[32px] leading-[1.08] tracking-[-0.02em] text-[color:var(--color-primary)] sm:text-[44px] sm:leading-[1.05] lg:text-[56px]">
            Period predictor
          </h1>
          <p className="max-w-[640px] font-display text-[16px] leading-[1.45] text-[color:var(--color-on-surface-variant)] sm:text-[20px] sm:leading-[1.4]">
            See your next 3 period start dates. Calendar math, free, runs in
            your browser. Honest about where the prediction is reliable and
            where it is not.
          </p>
        </header>

        <CalculatorWidget mode="period-prediction" />

        <section className="flex flex-col gap-6">
          <h2 className="font-display text-[24px] sm:text-[28px] leading-tight text-[color:var(--color-primary)]">
            How the prediction works
          </h2>
          <p className="text-[15px] sm:text-[16px] leading-relaxed text-[color:var(--color-on-surface)]">
            The math is simple. Last period start plus your typical cycle
            length equals next period start. Plus another cycle length equals
            the period after that. The calculator shows the next 3 dates so
            you can plan ahead.
          </p>
          <p className="text-[15px] sm:text-[16px] leading-relaxed text-[color:var(--color-on-surface)]">
            What makes the prediction useful or not is how stable your cycle
            length is. The math assumes you keep cycling at the same length.
            Real cycles drift by a few days even for women considered regular.
          </p>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="font-display text-[24px] sm:text-[28px] leading-tight text-[color:var(--color-primary)]">
            How accurate calendar prediction is
          </h2>
          <ul className="flex flex-col gap-3 text-[15px] sm:text-[16px] leading-relaxed text-[color:var(--color-on-surface)]">
            <li>
              <strong>Cycles varying less than 3 days</strong>: prediction is
              typically within 1 to 2 days of actual.
            </li>
            <li>
              <strong>Cycles varying 3 to 5 days</strong>: prediction is
              within 2 to 4 days of actual.
            </li>
            <li>
              <strong>Cycles varying 5 to 7 days</strong>: prediction can be
              off by a week. Use as a rough planning window only.
            </li>
            <li>
              <strong>Cycles varying more than 7 days</strong>: calendar
              prediction is not reliable. Track 3 to 6 cycles to find your
              actual range, or consult a clinician about the underlying cause
              of variability.
            </li>
          </ul>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="font-display text-[24px] sm:text-[28px] leading-tight text-[color:var(--color-primary)]">
            When the prediction is wrong, what to think about
          </h2>
          <p className="text-[15px] sm:text-[16px] leading-relaxed text-[color:var(--color-on-surface)]">
            Several factors shift cycle timing in ways the calendar cannot
            see:
          </p>
          <ul className="flex flex-col gap-2 text-[15px] sm:text-[16px] leading-relaxed text-[color:var(--color-on-surface)]">
            <li>
              <strong>Stress</strong>. Cortisol can delay ovulation, which
              delays the period.
            </li>
            <li>
              <strong>Sleep disruption or travel</strong>. Shift work and
              significant time zone changes can shift cycles by days.
            </li>
            <li>
              <strong>Significant weight change</strong>. Both gains and
              losses, especially over short periods, affect ovulation timing.
            </li>
            <li>
              <strong>Intense exercise</strong>. Especially with low energy
              availability, can delay or skip ovulation entirely.
            </li>
            <li>
              <strong>Illness or medication change</strong>. Acute illness,
              antibiotics, and many medications can affect a single cycle.
            </li>
            <li>
              <strong>Post-pill recovery</strong>. Cycles often take 3 to 12
              months to fully regularize after stopping hormonal birth
              control.
            </li>
            <li>
              <strong>Perimenopause</strong>. Starting in the late 30s to mid
              40s, cycle length variability increases as ovarian reserve
              declines. Predictions become less reliable.
            </li>
            <li>
              <strong>PCOS or PMOS</strong>. The condition formerly called
              PCOS, now PMOS as of May 2026, often involves anovulatory or
              irregular cycles. Calendar prediction is not reliable. See{" "}
              <Link
                href="/blog/pcos-renamed-pmos"
                className="underline underline-offset-2 text-[color:var(--color-primary)] hover:opacity-70"
              >
                PCOS renamed to PMOS
              </Link>{" "}
              for context.
            </li>
          </ul>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="font-display text-[24px] sm:text-[28px] leading-tight text-[color:var(--color-primary)]">
            Frequently asked questions
          </h2>
          <div className="flex flex-col gap-5">
            <FaqBlock
              q="How does the period predictor work?"
              a="It adds your cycle length to your last period start to estimate the next period. It then adds another cycle length to estimate the period after that, and so on. The math is straightforward; the accuracy depends entirely on how consistent your cycle length actually is."
            />
            <FaqBlock
              q="How accurate is calendar-based period prediction?"
              a="For women with regular cycles (varying by less than 5 days month to month), calendar prediction is accurate within 2 to 3 days. For more variable cycles, accuracy drops proportionally. Cycles often vary more than people remember, so treat predictions as a window, not a fixed date."
            />
            <FaqBlock
              q="What makes a cycle 'regular' or 'irregular'?"
              a="A typical regular cycle is 21 to 35 days, with month-to-month variation less than 7 days. Cycles longer than 35 days, shorter than 21 days, or varying more than 7 days month to month are considered irregular and may warrant medical evaluation, especially for fertility planning or if symptoms accompany them."
            />
            <FaqBlock
              q="What can make my period come earlier or later than predicted?"
              a="Stress, significant weight change, intense exercise, sleep disruption, illness, travel across time zones, and hormonal changes (including peri-menopause and post-pill recovery) all affect cycle timing. Even regular cycles drift by a few days. Use the prediction as a planning window, not a commitment."
            />
            <FaqBlock
              q="Should I track my period for fertility or contraception?"
              a="For fertility planning, period tracking is useful as a starting frame but should be paired with ovulation prediction kits or basal body temperature for precision timing. For contraception, calendar-based tracking alone has a typical-use failure rate too high to rely on; use sympto-thermal method or another method."
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
                href="/calculator/follicular-phase"
                className="underline underline-offset-2 text-[color:var(--color-primary)] hover:opacity-70"
              >
                Follicular phase calculator
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
