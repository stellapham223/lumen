import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin · Threads",
  robots: { index: false, follow: false },
};

export default function AdminHomePage() {
  return (
    <main className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="eyebrow text-[color:var(--color-primary)]">Threads</span>
        <h1 className="font-display text-[28px] font-medium text-[color:var(--color-primary)]">
          Reddit watchlist
        </h1>
        <p className="text-[14px] text-[color:var(--color-on-surface-variant)]">
          Daily-scraped threads matching Lumen keywords. Open one to generate a
          reply prompt.
        </p>
      </div>

      <div className="hairline bg-[color:var(--color-surface-container-lowest)] px-6 py-12 text-center">
        <p className="font-display text-[15px] text-[color:var(--color-on-surface-variant)]">
          No threads yet. Scraper runs daily at 8am ICT.
        </p>
      </div>
    </main>
  );
}
