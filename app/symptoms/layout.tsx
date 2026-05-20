import Link from "next/link";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";

export default function SymptomsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto w-full max-w-[720px] px-4 pt-8 pb-20 sm:px-6 sm:pt-12 sm:pb-24 lg:px-8 lg:pt-16 lg:pb-32">
      <nav className="mb-8 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-on-surface-variant)]">
        <Link
          href="/"
          className="text-[color:var(--color-primary)] hover:opacity-70"
        >
          Lumen
        </Link>
        <span className="opacity-50">/</span>
        <Link
          href="/symptoms"
          className="text-[color:var(--color-primary)] hover:opacity-70"
        >
          Symptoms
        </Link>
      </nav>
      <div className="animate-fade-up">{children}</div>
      <AffiliateDisclosure />
    </main>
  );
}
