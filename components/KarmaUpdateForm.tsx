"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type Props = {
  defaultTotal?: number;
  defaultLink?: number;
  defaultComment?: number;
};

export function KarmaUpdateForm({
  defaultTotal = 0,
  defaultLink = 0,
  defaultComment = 0,
}: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    const totalKarma = Number(data.get("totalKarma"));
    const linkKarma = Number(data.get("linkKarma"));
    const commentKarma = Number(data.get("commentKarma"));
    if ([totalKarma, linkKarma, commentKarma].some((n) => !Number.isFinite(n) || n < 0)) {
      setError("All fields must be non-negative integers.");
      return;
    }
    startTransition(async () => {
      const res = await fetch("/api/admin/karma", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ totalKarma, linkKarma, commentKarma }),
      });
      if (!res.ok) {
        setError(`Save failed (${res.status})`);
        return;
      }
      setOpen(false);
      router.refresh();
    });
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hairline border border-[color:var(--color-primary)] px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-primary)] transition-opacity hover:opacity-80"
      >
        Update karma
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap items-center gap-2 text-[12px]"
    >
      <label className="flex items-center gap-1">
        Total
        <input
          type="number"
          name="totalKarma"
          defaultValue={defaultTotal}
          min={0}
          required
          className="hairline w-20 bg-[color:var(--color-background)] px-2 py-1"
        />
      </label>
      <label className="flex items-center gap-1">
        Link
        <input
          type="number"
          name="linkKarma"
          defaultValue={defaultLink}
          min={0}
          required
          className="hairline w-16 bg-[color:var(--color-background)] px-2 py-1"
        />
      </label>
      <label className="flex items-center gap-1">
        Comment
        <input
          type="number"
          name="commentKarma"
          defaultValue={defaultComment}
          min={0}
          required
          className="hairline w-16 bg-[color:var(--color-background)] px-2 py-1"
        />
      </label>
      <button
        type="submit"
        disabled={isPending}
        className="hairline bg-[color:var(--color-primary)] px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-on-primary,#fff)] transition-opacity hover:opacity-90 disabled:opacity-40"
      >
        {isPending ? "..." : "Save"}
      </button>
      <button
        type="button"
        onClick={() => setOpen(false)}
        className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-on-surface-variant)] hover:text-[color:var(--color-primary)]"
      >
        Cancel
      </button>
      {error ? (
        <span className="text-[11px] text-[color:var(--color-error,#b00020)]">
          {error}
        </span>
      ) : null}
    </form>
  );
}
