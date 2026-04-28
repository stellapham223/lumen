import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your cycle plan",
  description:
    "Your personalized cycle phase, hormone state, and recommendations for what to schedule today.",
  alternates: { canonical: "/plan" },
  // /plan is a personalized client-rendered page that depends on user's localStorage.
  // No value to indexing — keep crawlers out so the empty/skeleton state doesn't surface.
  robots: {
    index: false,
    follow: false,
  },
};

export default function PlanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
