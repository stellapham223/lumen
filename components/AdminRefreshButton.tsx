"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export function AdminRefreshButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [summary, setSummary] = useState<string | null>(null);

  function handleClick() {
    setSummary(null);
    startTransition(async () => {
      const res = await fetch("/api/admin/refresh", { method: "POST" });
      if (!res.ok) {
        setSummary(`Refresh failed (${res.status})`);
        return;
      }
      const data = (await res.json()) as {
        scrape: { filteredCount: number; insertedOrUpdated: number };
        mentions: { inserted: number };
      };
      setSummary(
        `Scraped ${data.scrape.filteredCount} matching threads (${data.scrape.insertedOrUpdated} new/updated). Mentions: +${data.mentions.inserted}.`,
      );
      router.refresh();
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        className="hairline border border-[color:var(--color-primary)] px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-primary)] transition-opacity hover:opacity-80 disabled:opacity-40"
      >
        {isPending ? "Refreshing..." : "Refresh now"}
      </button>
      {summary ? (
        <span className="text-[12px] text-[color:var(--color-on-surface-variant)]">
          {summary}
        </span>
      ) : null}
    </div>
  );
}
