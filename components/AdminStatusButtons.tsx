"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

type Props = {
  threadId: number;
  currentStatus: string;
};

const ACTIONS: { label: string; value: "suggested" | "skipped" | "new" }[] = [
  { label: "Mark suggested", value: "suggested" },
  { label: "Skip", value: "skipped" },
  { label: "Reset", value: "new" },
];

export function AdminStatusButtons({ threadId, currentStatus }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function set(status: string) {
    startTransition(async () => {
      await fetch(`/api/admin/threads/${threadId}/status`, {
        method: "POST",
        body: JSON.stringify({ status }),
        headers: { "Content-Type": "application/json" },
      });
      router.refresh();
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-on-surface-variant)]">
        Status: <strong>{currentStatus}</strong>
      </span>
      {ACTIONS.filter((a) => a.value !== currentStatus).map((a) => (
        <button
          key={a.value}
          type="button"
          disabled={isPending}
          onClick={() => set(a.value)}
          className="hairline border border-[color:var(--color-primary)] px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-primary)] transition-opacity hover:opacity-80 disabled:opacity-40"
        >
          {a.label}
        </button>
      ))}
    </div>
  );
}
