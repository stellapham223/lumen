import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your cycle plan — Lumen",
  description:
    "Your personalized cycle phase, hormone state, and recommendations for what to schedule today.",
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
