import type { Metadata } from "next";
import { PageLayout, Section } from "@/components/PageLayout";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Lumen does not collect, store, or share any of your data. Your cycle information stays in your browser.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy | Lumen",
    description:
      "Lumen does not collect, store, or share any of your data. Your cycle information stays in your browser.",
    url: "/privacy",
    type: "article",
  },
};

export default function PrivacyPage() {
  return (
    <PageLayout
      eyebrow="Privacy"
      title="What we don't collect."
      intro="Lumen is built on a simple principle: your menstrual cycle data should never leave your device. Here's exactly how we handle it."
    >
      <BreadcrumbJsonLd
        items={[
          { name: "Lumen", path: "/" },
          { name: "Privacy", path: "/privacy" },
        ]}
      />
      <Section title="The short version">
        <p>
          Lumen does not collect your cycle data. We do not store it on any
          server. We do not share it with anyone. There is no account to create
          and no email to give us. Everything happens inside your browser.
        </p>
      </Section>

      <Section title="What we use localStorage for">
        <p>
          When you enter your cycle details, we save them to your browser&apos;s
          localStorage so the calculator remembers your phase between visits.
          This data lives on your device only. We have no access to it. You can
          clear it any time by clicking <em>&quot;Edit cycle&quot;</em> on the
          dashboard, or by clearing your browser data.
        </p>
      </Section>

      <Section title="What we don't do">
        <ul className="space-y-2 list-disc pl-6">
          <li>We don&apos;t use tracking cookies.</li>
          <li>We don&apos;t fingerprint your device.</li>
          <li>We don&apos;t sell, lease, or share data with third parties.</li>
          <li>We don&apos;t require you to create an account.</li>
          <li>We don&apos;t collect your email unless you explicitly opt in to a future newsletter (which we don&apos;t have yet).</li>
        </ul>
      </Section>

      <Section title="Analytics">
        <p>
          We may use privacy-friendly, cookieless analytics in the future
          (Plausible or similar) to count visits and understand which pages help
          people. These tools do not identify individuals or track behavior
          across sites. We will update this page if we add them.
        </p>
      </Section>

      <Section title="Your rights">
        <p>
          Because we don&apos;t store your data on our end, there is nothing for
          us to give you, delete, or correct on request. Your data is yours,
          held by your browser. You are in full control.
        </p>
      </Section>

      <Section title="When this changes">
        <p>
          If Lumen ever introduces accounts, server-side storage, or third-party
          integrations, we will update this page and tell you clearly before any
          new data collection begins. The default will always remain: your
          cycle, your device.
        </p>
      </Section>

      <p className="hairline-t pt-8 text-[12px] italic text-[color:var(--color-on-surface-variant)]">
        Last updated: April 2026.
      </p>
    </PageLayout>
  );
}
