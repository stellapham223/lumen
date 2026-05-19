import type { Metadata } from "next";
import Link from "next/link";
import { CalculatorWidget } from "@/components/CalculatorWidget";
import {
  ArticleJsonLd,
  BreadcrumbJsonLd,
  FaqJsonLd,
} from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Cycle phase calculator: what phase am I in right now?",
  description:
    "Free cycle phase calculator. Enter your last period and cycle length, see which of the four menstrual phases you are in today, day in phase, and what is coming next. No signup, no account.",
  alternates: { canonical: "/calculator/cycle-phase" },
  openGraph: {
    title: "Cycle phase calculator: what phase am I in right now?",
    description:
      "Free cycle phase calculator. See which menstrual phase you are in today, day in phase, and what comes next.",
    url: "/calculator/cycle-phase",
    type: "website",
  },
};

export default function CyclePhaseCalculatorPage() {
  return (
    <>
      <ArticleJsonLd
        headline="Cycle phase calculator: what phase am I in right now?"
        description="Free cycle phase calculator. See which of the four menstrual phases you are in today."
        path="/calculator/cycle-phase"
        datePublished="2026-05-19"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Lumen", path: "/" },
          { name: "Calculator", path: "/calculator/cycle-phase" },
          {
            name: "Cycle phase calculator",
            path: "/calculator/cycle-phase",
          },
        ]}
      />
      <FaqJsonLd
        faqs={[
          {
            question: "How does this cycle phase calculator work?",
            answer:
              "It uses the standard four-phase model: menstrual, follicular, ovulatory, and luteal. Given your last period start date and cycle length, it counts days from period day 1 to find which phase you are in today. Ovulation is placed at cycle length minus 14, which is the convention used by clinical fertility tracking.",
          },
          {
            question: "What are the four phases of the menstrual cycle?",
            answer:
              "Menstrual phase covers the bleeding days, typically 3 to 7. Follicular phase runs from end of period to about 2 days before ovulation, with rising estrogen. Ovulatory phase is the 3 to 4 day window around egg release. Luteal phase is the 10 to 16 days after ovulation when progesterone dominates.",
          },
          {
            question: "How accurate is the calculator if my cycle is irregular?",
            answer:
              "Calendar-based calculation is approximate. It assumes your cycle is similar to your reported average. If your cycles vary by more than 5 days month to month, the phase estimate can be off by a similar amount. Track 2 or 3 cycles to get a personal average, then come back.",
          },
          {
            question: "Does this work if I am on birth control?",
            answer:
              "Hormonal birth control suppresses the natural cycle. The 'period' you have on combined pills is a withdrawal bleed, not real menstruation. The phase model does not apply meaningfully on most hormonal birth control. See our guide to cycle syncing on birth control for the method-by-method picture.",
          },
          {
            question: "Is my data private?",
            answer:
              "Your cycle data is computed in your browser and stored only on your device. Lumen does not have an account system. We do not transmit your cycle details to any server. You can clear the saved data anytime from the home page.",
          },
        ]}
      />

      <main className="mx-auto flex w-full max-w-[960px] flex-col gap-12 px-4 pt-6 pb-20 sm:gap-16 sm:px-8 sm:pt-12 sm:pb-32 lg:px-12">
        <header className="flex flex-col gap-4">
          <span className="eyebrow text-[color:var(--color-primary)] tracking-[0.2em]">
            Calculator
          </span>
          <h1 className="font-display text-[32px] leading-[1.08] tracking-[-0.02em] text-[color:var(--color-primary)] sm:text-[44px] sm:leading-[1.05] lg:text-[56px]">
            Cycle phase calculator
          </h1>
          <p className="max-w-[640px] font-display text-[16px] leading-[1.45] text-[color:var(--color-on-surface-variant)] sm:text-[20px] sm:leading-[1.4]">
            See which of the four menstrual phases you are in today, day in
            phase, days until the next phase, and your next period date. Free,
            no signup, runs entirely in your browser.
          </p>
        </header>

        <CalculatorWidget mode="cycle-phase" />

        <section className="flex flex-col gap-6">
          <h2 className="font-display text-[24px] sm:text-[28px] leading-tight text-[color:var(--color-primary)]">
            What the calculator tells you
          </h2>
          <p className="text-[15px] sm:text-[16px] leading-relaxed text-[color:var(--color-on-surface)]">
            The calculator finds your current phase using the standard
            four-phase model, the same one used in clinical fertility tracking
            and in the underlying physiology research. Day 1 is the first day
            of bleeding. The calculator counts forward from there.
          </p>
          <ul className="flex flex-col gap-3 text-[15px] sm:text-[16px] leading-relaxed text-[color:var(--color-on-surface)]">
            <li>
              <strong>Menstrual phase</strong>: day 1 through the end of your
              period, typically 3 to 7 days. Estrogen and progesterone are at
              their lowest.
            </li>
            <li>
              <strong>Follicular phase</strong>: from period end until 2 days
              before ovulation. Estrogen rises. Verbal fluency, learning, and
              mood tend to lift through this phase.
            </li>
            <li>
              <strong>Ovulatory phase</strong>: the 3 to 4 day window when an
              egg is released. Testosterone briefly spikes. Conception is
              biologically possible in this window.
            </li>
            <li>
              <strong>Luteal phase</strong>: after ovulation through the start
              of your next period, typically 10 to 14 days. Progesterone is
              dominant. Body temperature rises slightly. PMS-type symptoms tend
              to cluster late in this phase.
            </li>
          </ul>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="font-display text-[24px] sm:text-[28px] leading-tight text-[color:var(--color-primary)]">
            Why phase awareness is useful, and where it is not
          </h2>
          <p className="text-[15px] sm:text-[16px] leading-relaxed text-[color:var(--color-on-surface)]">
            Hormonal context affects energy, mood, sleep, appetite, and
            cognitive performance in measurable ways. Knowing your phase lets
            you plan a hard week with the grain of your biology rather than
            against it. That is the strong, well-supported version of cycle
            awareness.
          </p>
          <p className="text-[15px] sm:text-[16px] leading-relaxed text-[color:var(--color-on-surface)]">
            What this calculator does not do: prescribe foods, supplements, or
            workout splits per phase. Those prescriptions are not well
            supported by clinical evidence. We cover the research honestly in{" "}
            <Link
              href="/blog/is-cycle-syncing-legit"
              className="underline underline-offset-2 text-[color:var(--color-primary)] hover:opacity-70"
            >
              is cycle syncing legit
            </Link>{" "}
            and{" "}
            <Link
              href="/blog/does-cycle-syncing-work"
              className="underline underline-offset-2 text-[color:var(--color-primary)] hover:opacity-70"
            >
              does cycle syncing work
            </Link>
            .
          </p>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="font-display text-[24px] sm:text-[28px] leading-tight text-[color:var(--color-primary)]">
            How accurate is calendar-based phase tracking?
          </h2>
          <p className="text-[15px] sm:text-[16px] leading-relaxed text-[color:var(--color-on-surface)]">
            The standard model assumes a regular cycle. For most women with
            cycles between 25 and 32 days that do not vary by more than 3 to 4
            days, calendar-based estimation is accurate within 1 to 2 days. For
            shorter or longer cycles, the calculator adjusts ovulation by
            keeping a 14-day luteal phase, which matches most clinical
            literature.
          </p>
          <p className="text-[15px] sm:text-[16px] leading-relaxed text-[color:var(--color-on-surface)]">
            For very irregular cycles, PCOS or PMOS (
            <Link
              href="/blog/pcos-renamed-pmos"
              className="underline underline-offset-2 text-[color:var(--color-primary)] hover:opacity-70"
            >
              PCOS was renamed to PMOS in May 2026
            </Link>
            ), perimenopause, or post-pill recovery, calendar tracking is less
            reliable. Pair it with body signals like cervical fluid, basal body
            temperature, or LH testing.
          </p>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="font-display text-[24px] sm:text-[28px] leading-tight text-[color:var(--color-primary)]">
            Frequently asked questions
          </h2>
          <div className="flex flex-col gap-5">
            <FaqBlock
              q="How does this cycle phase calculator work?"
              a="It uses the standard four-phase model: menstrual, follicular, ovulatory, and luteal. Given your last period start date and cycle length, it counts days from period day 1 to find which phase you are in today. Ovulation is placed at cycle length minus 14, which is the convention used by clinical fertility tracking."
            />
            <FaqBlock
              q="What are the four phases of the menstrual cycle?"
              a="Menstrual phase covers the bleeding days, typically 3 to 7. Follicular phase runs from end of period to about 2 days before ovulation, with rising estrogen. Ovulatory phase is the 3 to 4 day window around egg release. Luteal phase is the 10 to 16 days after ovulation when progesterone dominates."
            />
            <FaqBlock
              q="How accurate is the calculator if my cycle is irregular?"
              a="Calendar-based calculation is approximate. It assumes your cycle is similar to your reported average. If your cycles vary by more than 5 days month to month, the phase estimate can be off by a similar amount. Track 2 or 3 cycles to get a personal average, then come back."
            />
            <FaqBlock
              q="Does this work if I am on birth control?"
              a="Hormonal birth control suppresses the natural cycle. The 'period' you have on combined pills is a withdrawal bleed, not real menstruation. The phase model does not apply meaningfully on most hormonal birth control. See our guide to cycle syncing on birth control for the method-by-method picture."
            />
            <FaqBlock
              q="Is my data private?"
              a="Your cycle data is computed in your browser and stored only on your device. Lumen does not have an account system. We do not transmit your cycle details to any server. You can clear the saved data anytime from the home page."
            />
          </div>
        </section>

        <section className="hairline bg-[color:var(--color-surface-container-lowest)] p-6 sm:p-10 lg:p-12 flex flex-col gap-4">
          <span className="eyebrow text-[color:var(--color-primary)]">Related</span>
          <ul className="flex flex-col gap-2 text-[14px] sm:text-[15px] text-[color:var(--color-on-surface)]">
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
                href="/blog/cycle-syncing-chart"
                className="underline underline-offset-2 text-[color:var(--color-primary)] hover:opacity-70"
              >
                Cycle syncing chart: hormones, energy, and work per phase
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
