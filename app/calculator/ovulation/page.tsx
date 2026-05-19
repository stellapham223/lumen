import type { Metadata } from "next";
import Link from "next/link";
import { CalculatorWidget } from "@/components/CalculatorWidget";
import {
  ArticleJsonLd,
  BreadcrumbJsonLd,
  FaqJsonLd,
} from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Ovulation calculator: when do I ovulate?",
  description:
    "Free ovulation calculator. Estimates your ovulation day and fertile window from your cycle length and last period. Uses the standard luteal-phase model with caveats explained honestly.",
  alternates: { canonical: "/calculator/ovulation" },
  openGraph: {
    title: "Ovulation calculator: when do I ovulate?",
    description:
      "Free ovulation calculator. Estimates your ovulation day and fertile window.",
    url: "/calculator/ovulation",
    type: "website",
  },
};

export default function OvulationCalculatorPage() {
  return (
    <>
      <ArticleJsonLd
        headline="Ovulation calculator: when do I ovulate?"
        description="Free ovulation calculator. Estimates ovulation day and fertile window."
        path="/calculator/ovulation"
        datePublished="2026-05-19"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Lumen", path: "/" },
          { name: "Calculator", path: "/calculator/ovulation" },
          {
            name: "Ovulation calculator",
            path: "/calculator/ovulation",
          },
        ]}
      />
      <FaqJsonLd
        faqs={[
          {
            question: "How does the ovulation calculator work?",
            answer:
              "It uses the standard luteal-phase model. Ovulation is placed 14 days before your next expected period. So for a 28-day cycle, ovulation is around day 14. For a 32-day cycle, around day 18. The model assumes a consistent luteal phase, which holds for most women within a few days.",
          },
          {
            question: "What is the fertile window?",
            answer:
              "The fertile window is the span when conception is biologically possible. The egg lives about 24 hours after ovulation, but sperm can survive in the reproductive tract up to 5 days. So the window is roughly 5 days before ovulation through 1 day after, a 6 to 7 day span centered on the day of ovulation.",
          },
          {
            question: "How accurate is calendar-based ovulation prediction?",
            answer:
              "Calendar prediction is reliable within 1 to 3 days for women with regular cycles. It is less reliable if cycles vary by more than 5 days, on hormonal birth control, in perimenopause, or with PCOS (now called PMOS). For trying to conceive or for natural family planning, pair calendar tracking with basal body temperature or LH testing.",
          },
          {
            question: "Can I use this calculator for natural family planning?",
            answer:
              "Not as the sole method. Calendar-based prediction has a typical-use failure rate too high for reliable contraception. For contraception, combine calendar tracking with basal body temperature and cervical mucus monitoring (sympto-thermal method), or use a certified fertility monitor with LH testing.",
          },
          {
            question: "What if I have irregular cycles?",
            answer:
              "Calendar prediction does not work well for irregular cycles. Track a minimum of 3 cycles to find your personal range. If your cycles vary by more than 7 days, the calendar method is not suitable. Use ovulation prediction kits (LH strips) or fertility monitors for direct hormone-based detection.",
          },
        ]}
      />

      <main className="mx-auto flex w-full max-w-[960px] flex-col gap-12 px-4 pt-6 pb-20 sm:gap-16 sm:px-8 sm:pt-12 sm:pb-32 lg:px-12">
        <header className="flex flex-col gap-4">
          <span className="eyebrow text-[color:var(--color-primary)] tracking-[0.2em]">
            Calculator
          </span>
          <h1 className="font-display text-[32px] leading-[1.08] tracking-[-0.02em] text-[color:var(--color-primary)] sm:text-[44px] sm:leading-[1.05] lg:text-[56px]">
            Ovulation calculator
          </h1>
          <p className="max-w-[640px] font-display text-[16px] leading-[1.45] text-[color:var(--color-on-surface-variant)] sm:text-[20px] sm:leading-[1.4]">
            See your estimated ovulation date and the 6 to 7 day fertile window
            around it. Calendar-based, free, runs in your browser, with the
            caveats spelled out so you know what the model can and cannot tell
            you.
          </p>
        </header>

        <CalculatorWidget mode="ovulation" />

        <section className="flex flex-col gap-6">
          <h2 className="font-display text-[24px] sm:text-[28px] leading-tight text-[color:var(--color-primary)]">
            How ovulation is calculated
          </h2>
          <p className="text-[15px] sm:text-[16px] leading-relaxed text-[color:var(--color-on-surface)]">
            The standard model assumes a luteal phase of about 14 days,
            meaning ovulation happens roughly 14 days before your next period.
            This is the convention used in most clinical fertility guidance.
            For a 28-day cycle, ovulation is around day 14. For a 30-day cycle,
            around day 16. For a 32-day cycle, around day 18.
          </p>
          <p className="text-[15px] sm:text-[16px] leading-relaxed text-[color:var(--color-on-surface)]">
            The model holds for most women with regular cycles. It is less
            reliable in the situations covered in the FAQ below.
          </p>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="font-display text-[24px] sm:text-[28px] leading-tight text-[color:var(--color-primary)]">
            Why the fertile window is 6 to 7 days, not 1
          </h2>
          <p className="text-[15px] sm:text-[16px] leading-relaxed text-[color:var(--color-on-surface)]">
            Eggs live about 24 hours after release. Sperm can survive in the
            reproductive tract for up to 5 days, sometimes longer. That means
            intercourse 4 or 5 days before ovulation can still result in
            conception. The fertile window is the span where viable sperm and
            a viable egg overlap.
          </p>
          <ul className="flex flex-col gap-2 text-[15px] sm:text-[16px] leading-relaxed text-[color:var(--color-on-surface)]">
            <li>
              <strong>Most fertile</strong>: the 2 days before ovulation and
              the day of ovulation itself.
            </li>
            <li>
              <strong>Fertile</strong>: 3 to 5 days before ovulation; sperm is
              waiting when the egg releases.
            </li>
            <li>
              <strong>Edge of fertile</strong>: the day after ovulation. The
              egg is still viable for up to 24 hours.
            </li>
          </ul>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="font-display text-[24px] sm:text-[28px] leading-tight text-[color:var(--color-primary)]">
            When calendar prediction is not enough
          </h2>
          <p className="text-[15px] sm:text-[16px] leading-relaxed text-[color:var(--color-on-surface)]">
            Calendar-based ovulation prediction is best used as a planning
            tool, not as primary contraception or precision conception timing.
            For those use cases, pair it with one of:
          </p>
          <ul className="flex flex-col gap-2 text-[15px] sm:text-[16px] leading-relaxed text-[color:var(--color-on-surface)]">
            <li>
              <strong>Basal body temperature (BBT)</strong>. Tracks the
              progesterone-driven temperature rise after ovulation. Confirms
              ovulation retrospectively.
            </li>
            <li>
              <strong>LH testing strips</strong>. Detects the luteinizing
              hormone surge that triggers ovulation 24 to 36 hours later. The
              most direct prospective signal.
            </li>
            <li>
              <strong>Cervical mucus tracking</strong>. Fertile mucus is clear
              and stretchy in the days leading up to ovulation. Part of the
              sympto-thermal method.
            </li>
            <li>
              <strong>Fertility monitors</strong>. Combine LH and sometimes
              estrogen detection. Higher accuracy than calendar alone.
            </li>
          </ul>
          <p className="text-[15px] sm:text-[16px] leading-relaxed text-[color:var(--color-on-surface)]">
            For irregular cycles, especially those linked to PCOS or PMOS (see{" "}
            <Link
              href="/blog/pcos-renamed-pmos"
              className="underline underline-offset-2 text-[color:var(--color-primary)] hover:opacity-70"
            >
              the May 2026 PMOS rename
            </Link>
            ), calendar prediction is not reliable. Use direct hormone
            detection.
          </p>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="font-display text-[24px] sm:text-[28px] leading-tight text-[color:var(--color-primary)]">
            Frequently asked questions
          </h2>
          <div className="flex flex-col gap-5">
            <FaqBlock
              q="How does the ovulation calculator work?"
              a="It uses the standard luteal-phase model. Ovulation is placed 14 days before your next expected period. So for a 28-day cycle, ovulation is around day 14. For a 32-day cycle, around day 18. The model assumes a consistent luteal phase, which holds for most women within a few days."
            />
            <FaqBlock
              q="What is the fertile window?"
              a="The fertile window is the span when conception is biologically possible. The egg lives about 24 hours after ovulation, but sperm can survive in the reproductive tract up to 5 days. So the window is roughly 5 days before ovulation through 1 day after, a 6 to 7 day span centered on the day of ovulation."
            />
            <FaqBlock
              q="How accurate is calendar-based ovulation prediction?"
              a="Calendar prediction is reliable within 1 to 3 days for women with regular cycles. It is less reliable if cycles vary by more than 5 days, on hormonal birth control, in perimenopause, or with PCOS (now called PMOS). For trying to conceive or for natural family planning, pair calendar tracking with basal body temperature or LH testing."
            />
            <FaqBlock
              q="Can I use this calculator for natural family planning?"
              a="Not as the sole method. Calendar-based prediction has a typical-use failure rate too high for reliable contraception. For contraception, combine calendar tracking with basal body temperature and cervical mucus monitoring (sympto-thermal method), or use a certified fertility monitor with LH testing."
            />
            <FaqBlock
              q="What if I have irregular cycles?"
              a="Calendar prediction does not work well for irregular cycles. Track a minimum of 3 cycles to find your personal range. If your cycles vary by more than 7 days, the calendar method is not suitable. Use ovulation prediction kits (LH strips) or fertility monitors for direct hormone-based detection."
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
            <li>
              <Link
                href="/calculator/period-prediction"
                className="underline underline-offset-2 text-[color:var(--color-primary)] hover:opacity-70"
              >
                Period predictor
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
