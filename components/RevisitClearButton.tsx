"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

export function RevisitClearButton({ engagementId }: { engagementId: number }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      await fetch(`/api/admin/engagements/${engagementId}/clear-revisit`, {
        method: "POST",
      });
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className="hairline border border-[color:var(--color-primary)] px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-primary)] transition-opacity hover:opacity-80 disabled:opacity-40"
    >
      {isPending ? "Clearing..." : "Mark seen"}
    </button>
  );
}
