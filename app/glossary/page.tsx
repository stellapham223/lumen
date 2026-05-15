import type { Metadata } from "next";
import Link from "next/link";
import { GLOSSARY_TERMS, type GlossaryTopic } from "@/lib/site";
import { BreadcrumbJsonLd, DefinedTermSetJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Cycle syncing glossary: 152 terms across hormones, phases, and practice",
  description:
    "A complete glossary of cycle syncing, hormonal, and women's health terms. Hormones, mechanisms, phases, tracking tools, conditions, birth control, and practice. Grouped by topic and funnel.",
  alternates: { canonical: "/glossary" },
  openGraph: {
    title: "Cycle syncing glossary | Lumen",
    description:
      "152 terms across cycle physiology, hormones, neurotransmitters, phases, practice, tools, and conditions.",
    url: "/glossary",
    type: "website",
  },
};

const TOPIC_ORDER: ReadonlyArray<{ topic: GlossaryTopic; description: string }> = [
  { topic: "Symptoms", description: "What cycle-related symptoms feel like and when they hit." },
  { topic: "Physiology", description: "The biology of the menstrual cycle, from menarche to menopause." },
  { topic: "Hormones", description: "Estrogen, progesterone, FSH, LH, and the supporting cast." },
  { topic: "Mechanism", description: "Neurotransmitters and biological rhythms that translate hormones into experience." },
  { topic: "Phases", description: "The four phases and sub-phases, with what shifts in each." },
  { topic: "Practice", description: "How cycle syncing works as a practice, applied across work, food, and movement." },
  { topic: "Tools", description: "Tracking methods, apps, and devices that help you observe your cycle." },
  { topic: "Conditions", description: "PCOS, perimenopause, endometriosis, and other conditions that change the picture." },
  { topic: "Birth control", description: "Hormonal and non-hormonal methods, and how each interacts with cycle syncing." },
  { topic: "Nutrition", description: "Supplements and nutrients with cycle-relevant evidence." },
  { topic: "People", description: "Researchers, authors, and figures who shaped cycle syncing as a practice." },
  { topic: "Research", description: "Key papers and reviews that ground (and sometimes deflate) cycle syncing claims." },
];

export default function GlossaryIndex() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Lumen", path: "/" },
          { name: "Glossary", path: "/glossary" },
        ]}
      />
      <DefinedTermSetJsonLd
        name="Lumen cycle syncing glossary"
        description="A complete glossary of cycle syncing, hormonal, and women's health terms."
        path="/glossary"
        terms={GLOSSARY_TERMS.map((t) => ({ term: t.term, slug: t.slug }))}
      />

      <header className="mb-10 sm:mb-14">
        <span className="eyebrow text-[color:var(--color-primary)] tracking-[0.2em]">
          Glossary
        </span>
        <h1 className="mt-3 font-display text-[32px] leading-[1.08] tracking-[-0.02em] text-[color:var(--color-primary)] sm:mt-4 sm:text-[44px] sm:leading-[1.05] lg:text-[56px]">
          Cycle syncing, defined.
        </h1>
        <p className="mt-4 max-w-[680px] font-display text-[16px] leading-[1.45] text-[color:var(--color-on-surface-variant)] sm:mt-6 sm:text-[20px] sm:leading-[1.4]">
          One hundred and fifty-two terms across hormones, phases, mechanisms, tracking methods, conditions, and practice. Hedged where the evidence is thin. Grouped by topic so you can scan by interest.
        </p>
      </header>

      <div className="hairline-b mb-10 sm:mb-14" />

      <div className="space-y-12 sm:space-y-16">
        {TOPIC_ORDER.map(({ topic, description }) => {
          const termsInTopic = GLOSSARY_TERMS.filter((t) => t.topic === topic);
          if (termsInTopic.length === 0) return null;
          return (
            <section key={topic} id={topic.toLowerCase().replace(/\s+/g, "-")}>
              <h2 className="font-display text-[22px] sm:text-[28px] lg:text-[32px] font-medium leading-tight text-[color:var(--color-on-surface)]">
                {topic}
              </h2>
              <p className="mt-2 text-[14px] leading-relaxed text-[color:var(--color-on-surface-variant)] sm:text-[15px]">
                {description}
              </p>
              <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
                {termsInTopic.map((t) => (
                  <li key={t.slug}>
                    <Link
                      href={`/glossary/${t.slug}`}
                      className="group block"
                    >
                      <span className="font-medium text-[14px] sm:text-[15px] text-[color:var(--color-primary)] group-hover:opacity-70 transition-opacity">
                        {t.term}
                      </span>
                      <span className="block mt-0.5 text-[12px] leading-snug text-[color:var(--color-on-surface-variant)]">
                        {t.funnel}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </>
  );
}
