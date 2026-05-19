import type { Metadata } from "next";
import Link from "next/link";
import { CalculatorWidget } from "@/components/CalculatorWidget";
import {
  ArticleJsonLd,
  BreadcrumbJsonLd,
  FaqJsonLd,
} from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Luteal phase calculator: when does my luteal phase start?",
  description:
    "Free luteal phase calculator. Shows luteal start date, end date, and days remaining. Plus what to expect in the luteal phase and how it differs from PMS.",
  alternates: { canonical: "/calculator/luteal-phase" },
  openGraph: {
    title: "Luteal phase calculator: when does my luteal phase start?",
    description:
      "Free luteal phase calculator. Luteal start, end, days remaining.",
    url: "/calculator/luteal-phase",
    type: "website",
  },
};

export default function LutealPhaseCalculatorPage() {
  return (
    <>
      <ArticleJsonLd
        headline="Luteal phase calculator: when does my luteal phase start?"
        description="Free luteal phase calculator. Luteal start, end, and days remaining."
        path="/calculator/luteal-phase"
        datePublished="2026-05-19"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Lumen", path: "/" },
          { name: "Calculator", path: "/calculator/luteal-phase" },
          {
            name: "Luteal phase calculator",
            path: "/calculator/luteal-phase",
          },
        ]}
      />
      <FaqJsonLd
        faqs={[
          {
            question: "When does the luteal phase start?",
            answer:
              "The luteal phase begins the day after ovulation. For a 28-day cycle with ovulation around day 14, the luteal phase starts around day 15 and runs through day 28, the day before your next period. The luteal phase is about 14 days for most women, though 10 to 16 days is in the normal range.",
          },
          {
            question: "What happens during the luteal phase?",
            answer:
              "Progesterone is the dominant hormone in the luteal phase. The corpus luteum (the structure left in the ovary after the egg released) produces progesterone, which prepares the uterus for a potential pregnancy. Body temperature rises slightly. If pregnancy does not happen, progesterone drops in late luteal, which triggers the next period.",
          },
          {
            question: "Why do I feel different in my luteal phase?",
            answer:
              "Progesterone and the late-luteal estrogen drop affect mood, energy, sleep, body temperature, and appetite. Most women report slightly lower energy, increased cravings (especially carbs), increased core temperature, and some emotional reactivity in the days before their period. The magnitude varies. The late-luteal window is when PMS symptoms cluster.",
          },
          {
            question: "How is the luteal phase different from PMS?",
            answer:
              "PMS (premenstrual syndrome) is the cluster of symptoms occurring in the last days of the luteal phase. The luteal phase is the entire 10 to 14 day stretch after ovulation. PMS is the symptomatic last 5 to 10 days. Severe PMS that impairs daily life is PMDD (premenstrual dysphoric disorder), a recognized clinical diagnosis.",
          },
          {
            question: "Can I exercise normally during my luteal phase?",
            answer:
              "Yes. Research does not show meaningful performance differences across cycle phases for most women. You may perceive workouts as harder in late luteal because of higher body temperature and progesterone-driven perceived exertion, but absolute strength and aerobic capacity are largely unchanged. Train as you normally would unless symptoms specifically interfere.",
          },
        ]}
      />

      <main className="mx-auto flex w-full max-w-[960px] flex-col gap-12 px-4 pt-6 pb-20 sm:gap-16 sm:px-8 sm:pt-12 sm:pb-32 lg:px-12">
        <header className="flex flex-col gap-4">
          <span className="eyebrow text-[color:var(--color-primary)] tracking-[0.2em]">
            Calculator
          </span>
          <h1 className="font-display text-[32px] leading-[1.08] tracking-[-0.02em] text-[color:var(--color-primary)] sm:text-[44px] sm:leading-[1.05] lg:text-[56px]">
            Luteal phase calculator
          </h1>
          <p className="max-w-[640px] font-display text-[16px] leading-[1.45] text-[color:var(--color-on-surface-variant)] sm:text-[20px] sm:leading-[1.4]">
            See when your luteal phase starts, when it ends, and how many days
            remain. Plus the honest version of what to expect, including the
            difference between the full luteal phase and the shorter PMS
            window.
          </p>
        </header>

        <CalculatorWidget mode="luteal-phase" />

        <section className="flex flex-col gap-6">
          <h2 className="font-display text-[24px] sm:text-[28px] leading-tight text-[color:var(--color-primary)]">
            What the luteal phase is
          </h2>
          <p className="text-[15px] sm:text-[16px] leading-relaxed text-[color:var(--color-on-surface)]">
            The luteal phase is the part of your cycle from the day after
            ovulation until the day before your next period. It is named for
            the corpus luteum, the temporary endocrine structure that forms
            from the follicle that released the egg. The corpus luteum produces
            progesterone for about 10 to 14 days. If pregnancy does not happen,
            it breaks down, progesterone drops, and the next period starts.
          </p>
          <p className="text-[15px] sm:text-[16px] leading-relaxed text-[color:var(--color-on-surface)]">
            For most women, the luteal phase is the most stable part of the
            cycle in terms of length. The 14-day luteal phase is the convention
            most clinical fertility guidance uses, although individual luteal
            phases range from 10 to 16 days normally.
          </p>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="font-display text-[24px] sm:text-[28px] leading-tight text-[color:var(--color-primary)]">
            What changes in the luteal phase
          </h2>
          <ul className="flex flex-col gap-3 text-[15px] sm:text-[16px] leading-relaxed text-[color:var(--color-on-surface)]">
            <li>
              <strong>Body temperature rises by 0.3 to 0.5 °C</strong>. This is
              the basis of basal body temperature tracking and confirms
              ovulation happened.
            </li>
            <li>
              <strong>Appetite increases slightly</strong>. Most studies show a
              modest increase in food intake in luteal compared to follicular.
              Resting metabolic rate also rises, partially offsetting it.
            </li>
            <li>
              <strong>Sleep can shift</strong>. Higher body temperature can
              fragment sleep in late luteal. Sleep onset is sometimes faster
              from the sedative effect of progesterone metabolites.
            </li>
            <li>
              <strong>Emotional reactivity may increase</strong>. This is the
              biological substrate of PMS. The magnitude varies enormously
              between women; about 75 percent report at least mild symptoms,
              and 3 to 8 percent meet criteria for PMDD.
            </li>
            <li>
              <strong>Performance stays largely the same</strong>. Despite
              perception that workouts are harder, objective performance does
              not change meaningfully across phases for most women.
            </li>
          </ul>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="font-display text-[24px] sm:text-[28px] leading-tight text-[color:var(--color-primary)]">
            Luteal phase vs PMS
          </h2>
          <p className="text-[15px] sm:text-[16px] leading-relaxed text-[color:var(--color-on-surface)]">
            These get conflated often. They are not the same. The luteal phase
            is the entire 10 to 14 days after ovulation. PMS is the
            symptomatic last 5 to 10 days. You can be in luteal phase and feel
            fine for most of it, with symptoms appearing only in the last few
            days.
          </p>
          <p className="text-[15px] sm:text-[16px] leading-relaxed text-[color:var(--color-on-surface)]">
            For severe symptoms (mood changes that impair work or
            relationships, profound fatigue, suicidal thoughts), see a clinician
            about PMDD. It is a real and treatable diagnosis, separate from
            ordinary PMS.
          </p>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="font-display text-[24px] sm:text-[28px] leading-tight text-[color:var(--color-primary)]">
            Frequently asked questions
          </h2>
          <div className="flex flex-col gap-5">
            <FaqBlock
              q="When does the luteal phase start?"
              a="The luteal phase begins the day after ovulation. For a 28-day cycle with ovulation around day 14, the luteal phase starts around day 15 and runs through day 28, the day before your next period. The luteal phase is about 14 days for most women, though 10 to 16 days is in the normal range."
            />
            <FaqBlock
              q="What happens during the luteal phase?"
              a="Progesterone is the dominant hormone in the luteal phase. The corpus luteum (the structure left in the ovary after the egg released) produces progesterone, which prepares the uterus for a potential pregnancy. Body temperature rises slightly. If pregnancy does not happen, progesterone drops in late luteal, which triggers the next period."
            />
            <FaqBlock
              q="Why do I feel different in my luteal phase?"
              a="Progesterone and the late-luteal estrogen drop affect mood, energy, sleep, body temperature, and appetite. Most women report slightly lower energy, increased cravings (especially carbs), increased core temperature, and some emotional reactivity in the days before their period. The magnitude varies. The late-luteal window is when PMS symptoms cluster."
            />
            <FaqBlock
              q="How is the luteal phase different from PMS?"
              a="PMS (premenstrual syndrome) is the cluster of symptoms occurring in the last days of the luteal phase. The luteal phase is the entire 10 to 14 day stretch after ovulation. PMS is the symptomatic last 5 to 10 days. Severe PMS that impairs daily life is PMDD (premenstrual dysphoric disorder), a recognized clinical diagnosis."
            />
            <FaqBlock
              q="Can I exercise normally during my luteal phase?"
              a="Yes. Research does not show meaningful performance differences across cycle phases for most women. You may perceive workouts as harder in late luteal because of higher body temperature and progesterone-driven perceived exertion, but absolute strength and aerobic capacity are largely unchanged. Train as you normally would unless symptoms specifically interfere."
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
