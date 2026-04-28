import type { Metadata } from "next";
import { PageLayout, Section } from "@/components/PageLayout";
import { references } from "@/lib/references";
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "The science behind Lumen — methodology + research",
  description:
    "How Lumen turns peer-reviewed research on the menstrual cycle into actionable productivity recommendations. Our four-phase model, recommendation logic, and full source list.",
  alternates: { canonical: "/methodology" },
  openGraph: {
    title: "The science behind Lumen — methodology + research",
    description:
      "How Lumen turns peer-reviewed research on the menstrual cycle into actionable productivity recommendations.",
    url: "/methodology",
    type: "article",
  },
};

const methodologyFaqs = [
  {
    question: "How does cycle syncing improve productivity?",
    answer:
      "Estrogen, progesterone, FSH, and LH fluctuate predictably across the menstrual cycle, and those fluctuations measurably affect verbal fluency, neuroplasticity, mood, and energy. Aligning task type to phase — deep learning during follicular phase, presentations near ovulation, editing during early luteal, reflection during menstruation — works with biology rather than against it.",
  },
  {
    question: "What are the four phases of the menstrual cycle?",
    answer:
      "Menstrual (Reflect): cycle days 1–5, hormones at minimum, best for retrospectives and planning. Follicular (Build): days 6–13, rising estrogen, best for learning and complex problem solving. Ovulatory (Connect): days 14–16, estrogen peak plus LH surge, best for presentations and hard conversations. Luteal (Finish): days 17–28, progesterone rises then drops, best for editing, organizing, and closing tasks.",
  },
  {
    question: "Is cycle syncing scientifically supported?",
    answer:
      "Hormonal fluctuations have measurable, replicated effects on certain cognitive and physical functions. Effect sizes in real-world output are smaller than headlines suggest, and most research is on group averages rather than individuals. Lumen treats phase recommendations as a hypothesis to test against your own experience, not a prescription.",
  },
  {
    question: "Does Lumen work if I'm on hormonal birth control?",
    answer:
      "Hormonal contraception suppresses natural cycle fluctuation, so Lumen's phase model does not apply directly. The same is true for perimenopause, PCOS, thyroid conditions, and pregnancy. Lumen does not currently model these variants.",
  },
  {
    question: "Is Lumen medical advice?",
    answer:
      "No. Lumen is a productivity tool informed by science, not a clinical one. It is not validated against clinical outcomes and does not diagnose, treat, or prevent any condition. For health concerns, consult a qualified medical professional.",
  },
];

export default function MethodologyPage() {
  return (
    <PageLayout
      eyebrow="Methodology"
      title="The science behind Lumen."
      intro="Lumen translates peer-reviewed research on hormones and cognition into a simple weekly planner. Here is how it works — and the studies it rests on."
    >
      <ArticleJsonLd
        headline="The science behind Lumen — methodology and research"
        description="How Lumen turns peer-reviewed research on the menstrual cycle into actionable productivity recommendations."
        path="/methodology"
        datePublished="2026-04-01"
        dateModified="2026-04-28"
      />
      <FaqJsonLd faqs={methodologyFaqs} />
      <BreadcrumbJsonLd
        items={[
          { name: "Lumen", path: "/" },
          { name: "Methodology", path: "/methodology" },
        ]}
      />
      <Section title="The premise">
        <p>
          Estrogen, progesterone, FSH, and LH fluctuate predictably across the
          menstrual cycle. Those fluctuations measurably affect verbal fluency,
          neuroplasticity, mood, energy, and physical capacity. The implication
          is straightforward: if your cognitive resources change across the
          month, your schedule probably should, too.
        </p>
        <p>
          Lumen does not claim hormones are destiny. It claims that knowing
          where you are in your cycle helps you plan with the grain of your
          biology, not against it.
        </p>
      </Section>

      <Section eyebrow="The model" title="Four phases, four modes">
        <p>
          We use the standard four-phase model (menstrual, follicular,
          ovulatory, luteal) and assign each phase a working mode that summarizes
          its cognitive character:
        </p>
        <ul className="space-y-3 mt-2">
          <li>
            <strong>Menstrual — Reflect.</strong> Estrogen and progesterone at
            cycle minimum. Right-brain dominance shifts toward strategic,
            big-picture thinking. Best for retrospectives and planning.
          </li>
          <li>
            <strong>Follicular — Build.</strong> Rising estrogen drives BDNF and
            neuroplasticity. Best for learning new skills, starting projects,
            and complex problem solving.
          </li>
          <li>
            <strong>Ovulatory — Connect.</strong> Estrogen at peak, slight
            testosterone bump, LH surge. Verbal fluency and emotional cognition
            measurably peak. Best for presentations, hard conversations, and
            negotiations.
          </li>
          <li>
            <strong>Luteal — Finish.</strong> Progesterone rises then drops;
            estrogen drops late. Detail orientation peaks early, fatigue sets in
            late. Best for editing, organizing, and closing tasks.
          </li>
        </ul>
      </Section>

      <Section title="How recommendations are derived">
        <p>
          Each of the ten task types in Lumen (deep work, meetings, creative
          work, admin, learning, planning, presentations, hard conversations,
          detail work, networking) is rated 1–5 in each of the four phases,
          based on three signals from the research:
        </p>
        <ol className="space-y-2 list-decimal pl-6 mt-2">
          <li>
            <strong>Cognitive support.</strong> Does the dominant hormone of
            this phase support or hinder this kind of mental work?
          </li>
          <li>
            <strong>Energetic cost.</strong> Will the task drain reserves that
            are already low, or work with available energy?
          </li>
          <li>
            <strong>Risk and reactivity.</strong> Is the task sensitive to
            mood-state shifts (e.g. emotional reactivity in late luteal)?
          </li>
        </ol>
        <p>
          Ratings are deliberately coarse (5-point scale, not decimals) because
          the underlying research operates on group-average effects. Individual
          variation is large. Treat Lumen&apos;s scores as a starting hypothesis
          to test against your own experience.
        </p>
      </Section>

      <Section title="What we do — and don't — claim">
        <p>
          <strong>We do claim:</strong> hormonal fluctuations across the cycle
          have measurable, replicated effects on certain cognitive and physical
          functions. Time-blocking around those fluctuations is one reasonable
          strategy.
        </p>
        <p>
          <strong>We do not claim:</strong> that cycle syncing is universally
          required, that ignoring it makes you less successful, that the model
          captures all variation, or that Lumen is medical advice. It is a
          productivity tool informed by science, not a clinical one.
        </p>
      </Section>

      <Section title="Limitations">
        <ul className="space-y-2 list-disc pl-6">
          <li>
            Cycle length and ovulation timing vary; Lumen uses the conventional
            14-day luteal phase rule, which is an average, not a guarantee.
          </li>
          <li>
            People on hormonal contraception, in perimenopause, with PCOS,
            thyroid conditions, or pregnancy will have different hormone
            patterns. Lumen does not currently model those variants.
          </li>
          <li>
            Most cycle-cognition research is conducted on small samples in
            controlled settings; effect sizes in real-world output are smaller
            than headlines suggest.
          </li>
          <li>
            Lumen is not validated against clinical outcomes. Use as one input
            into your scheduling, not the only one.
          </li>
        </ul>
      </Section>

      <Section eyebrow="Research" title="Sources we draw from">
        <p>
          The recommendations in Lumen rest on a small set of repeatedly cited
          sources — peer-reviewed papers and books grounded in primary research.
          Click through to read them yourself.
        </p>
        <ul className="mt-4 space-y-4">
          {references.map((r) => (
            <li key={r.id} className="hairline-b last:border-0 pb-4 last:pb-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-on-surface-variant)]">
                {r.type === "paper"
                  ? "Paper"
                  : r.type === "book"
                    ? "Book"
                    : "Guideline"}{" "}
                · {r.year}
              </p>
              <p className="mt-2 font-display text-[16px] font-medium text-[color:var(--color-primary)]">
                {r.title}
              </p>
              <p className="mt-0.5 text-[14px] text-[color:var(--color-on-surface-variant)]">
                {r.authors} · <span className="italic">{r.source}</span>
              </p>
              {r.url && (
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-[12px] font-semibold uppercase tracking-[0.12em] text-[color:var(--color-primary)] hover:opacity-70"
                >
                  View source →
                </a>
              )}
            </li>
          ))}
        </ul>
      </Section>

      <p className="hairline-t pt-8 text-[12px] italic text-[color:var(--color-on-surface-variant)]">
        Lumen will continue to revise this page as the research base grows. If
        you spot an error or have a study you think we should consider, let us
        know.
      </p>
    </PageLayout>
  );
}
