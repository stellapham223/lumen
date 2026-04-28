import type { Metadata } from "next";
import { PageLayout, Section } from "@/components/PageLayout";

export const metadata: Metadata = {
  title: "Terms of use — Lumen",
  description:
    "Lumen is informational only and not medical advice. Use it as a productivity tool, not a clinical one.",
};

export default function TermsPage() {
  return (
    <PageLayout
      eyebrow="Terms"
      title="How to use Lumen."
      intro="Lumen is a free educational tool. By using it, you agree to the points below. Plain English, no walls of legal text."
    >
      <Section title="Quick summary">
        <p>
          Lumen helps you plan your work week around your hormonal cycle. It is{" "}
          <em>informational</em>, not medical advice. We do our best to base
          recommendations on peer-reviewed research, but Lumen cannot replace a
          conversation with a healthcare provider.
        </p>
      </Section>

      <Section title="Not medical advice">
        <p>
          Nothing on Lumen is intended to diagnose, treat, cure, or prevent any
          condition. If you experience symptoms that worry you — irregular
          cycles, severe pain, mood changes that affect your daily life, or
          anything else — please consult a qualified medical professional.
        </p>
        <p>
          Decisions about your health should be made with a clinician who knows
          your full history, not a calculator.
        </p>
      </Section>

      <Section title="As-is, no warranty">
        <p>
          Lumen is provided as-is. We make no guarantee that the recommendations
          will work for your specific situation. Hormonal experience varies
          widely; cycle science is still evolving. Take what is useful, leave
          what is not.
        </p>
      </Section>

      <Section title="Limitation of liability">
        <p>
          To the maximum extent permitted by law, Lumen and its creators are not
          liable for any direct or indirect outcomes arising from use of this
          tool, including productivity decisions, scheduling choices, or health
          consequences.
        </p>
      </Section>

      <Section title="Acceptable use">
        <p>
          Lumen is for personal use. You may share it with friends, link to it
          from articles, and reference it in your own writing. You may not
          repackage, resell, or scrape the tool, content, or data structure
          without permission.
        </p>
      </Section>

      <Section title="Changes">
        <p>
          We may update Lumen, including these terms, as the tool evolves. The
          current version of this page is always the binding one. If we make
          significant changes, we will note them at the top of the page.
        </p>
      </Section>

      <p className="hairline-t pt-8 text-[12px] italic text-[color:var(--color-on-surface-variant)]">
        Last updated: April 2026.
      </p>
    </PageLayout>
  );
}
