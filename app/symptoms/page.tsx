import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { SYMPTOM_PAGES } from "@/lib/symptom-pages";

export const metadata: Metadata = {
  title: "Cycle symptoms: what is happening and what helps",
  description:
    "Honest, evidence-graded guides to common menstrual cycle symptoms: cramps, bloating, fatigue, mood swings, breast tenderness. Mechanism, management, when to see a clinician.",
  alternates: { canonical: "/symptoms" },
  openGraph: {
    title: "Cycle symptoms | Lumen",
    description:
      "Evidence-graded guides to common cycle symptoms. Mechanism, management, when to see a clinician.",
    url: "/symptoms",
    type: "website",
  },
};

const PHASE_LABEL: Record<string, string> = {
  menstrual: "Menstrual phase",
  follicular: "Follicular phase",
  ovulatory: "Ovulatory phase",
  luteal: "Luteal phase",
  any: "Any phase",
};

export default function SymptomsIndex() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Lumen", path: "/" },
          { name: "Symptoms", path: "/symptoms" },
        ]}
      />

      <header className="mb-8 sm:mb-12">
        <span className="eyebrow text-[color:var(--color-primary)] tracking-[0.2em]">
          Symptoms
        </span>
        <h1 className="mt-3 font-display text-[32px] leading-[1.08] tracking-[-0.02em] text-[color:var(--color-primary)] sm:mt-4 sm:text-[44px] sm:leading-[1.05] lg:text-[56px]">
          Cycle symptoms, honestly.
        </h1>
        <p className="mt-4 font-display text-[16px] leading-[1.45] text-[color:var(--color-on-surface-variant)] sm:mt-6 sm:text-[20px] sm:leading-[1.4]">
          Each guide covers the mechanism (why this happens hormonally),
          evidence-graded management (what actually works), and clinician
          signals (when symptoms are out of normal range). No wellness woo.
        </p>
      </header>

      <div className="hairline-b mb-8 sm:mb-12" />

      <ul className="space-y-6 sm:space-y-8">
        {SYMPTOM_PAGES.map((p) => (
          <li
            key={p.slug}
            className="hairline-b last:border-0 pb-6 sm:pb-8 last:pb-0"
          >
            <article>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-on-surface-variant)]">
                {PHASE_LABEL[p.phase]}
              </p>
              <h2 className="mt-3 font-display text-[20px] sm:text-[24px] lg:text-[28px] font-medium leading-tight">
                <Link
                  href={`/symptoms/${p.slug}`}
                  className="text-[color:var(--color-primary)] transition-opacity hover:opacity-70"
                >
                  {p.title}
                </Link>
              </h2>
              <p className="mt-3 text-[15px] sm:text-[16px] leading-relaxed text-[color:var(--color-on-surface)]">
                {p.description}
              </p>
              <Link
                href={`/symptoms/${p.slug}`}
                className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-primary)] transition-opacity hover:opacity-70"
              >
                Read guide →
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}
