"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { CdSub } from "@/lib/db/schema";

type Props = {
  subs: CdSub[];
};

const STRICTNESS = ["loose", "medium", "strict"] as const;

export function SubsEditor({ subs }: Props) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [creating, setCreating] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-[14px] text-[color:var(--color-on-surface-variant)]">
          {subs.length} subs configured. Scrape job pulls from active rows.
        </p>
        {!creating && (
          <button
            onClick={() => setCreating(true)}
            className="hairline border border-[color:var(--color-primary)] px-4 py-2 font-display text-[12px] uppercase tracking-[0.16em] text-[color:var(--color-primary)] transition-opacity hover:opacity-80"
          >
            + Add sub
          </button>
        )}
      </div>

      {creating && (
        <SubForm
          mode="create"
          initial={null}
          onCancel={() => setCreating(false)}
          onSaved={() => setCreating(false)}
        />
      )}

      <ul className="flex flex-col gap-3">
        {subs.map((sub) =>
          editingId === sub.id ? (
            <li key={sub.id}>
              <SubForm
                mode="edit"
                initial={sub}
                onCancel={() => setEditingId(null)}
                onSaved={() => setEditingId(null)}
              />
            </li>
          ) : (
            <li
              key={sub.id}
              className="hairline flex flex-col gap-2 bg-[color:var(--color-surface-container-lowest)] p-4"
            >
              <div className="flex items-baseline justify-between gap-3">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-[16px] font-medium text-[color:var(--color-primary)]">
                    r/{sub.name}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-on-surface-variant)]">
                    {sub.members || "—"} · {sub.strictness}
                  </span>
                  {!sub.isActive && (
                    <span className="text-[10px] uppercase tracking-[0.16em] text-[color:var(--color-error,#b00020)]">
                      inactive
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingId(sub.id)}
                    className="text-[12px] uppercase tracking-[0.16em] text-[color:var(--color-primary)] hover:underline"
                  >
                    Edit
                  </button>
                </div>
              </div>
              {sub.notes && (
                <p className="text-[12px] italic text-[color:var(--color-on-surface-variant)]">
                  {sub.notes}
                </p>
              )}
              {sub.promptTemplate && (
                <details className="text-[12px]">
                  <summary className="cursor-pointer text-[color:var(--color-on-surface-variant)]">
                    Show prompt template ({sub.promptTemplate.length} chars)
                  </summary>
                  <pre className="mt-2 whitespace-pre-wrap font-mono text-[11px] text-[color:var(--color-on-surface)]">
                    {sub.promptTemplate}
                  </pre>
                </details>
              )}
            </li>
          ),
        )}
      </ul>
    </div>
  );
}

function SubForm({
  mode,
  initial,
  onCancel,
  onSaved,
}: {
  mode: "create" | "edit";
  initial: CdSub | null;
  onCancel: () => void;
  onSaved: () => void;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const data = new FormData(e.currentTarget);
    const payload = {
      name: String(data.get("name") ?? ""),
      members: String(data.get("members") ?? ""),
      strictness: String(data.get("strictness") ?? "medium"),
      promptTemplate: String(data.get("promptTemplate") ?? ""),
      notes: String(data.get("notes") ?? ""),
      sortOrder: Number(data.get("sortOrder") ?? 999),
      isActive: data.get("isActive") === "on",
    };

    startTransition(async () => {
      const url = mode === "create" ? "/api/admin/subs" : `/api/admin/subs/${initial!.id}`;
      const method = mode === "create" ? "POST" : "PATCH";
      const res = await fetch(url, {
        method,
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error ?? `Failed (${res.status})`);
        return;
      }
      onSaved();
      router.refresh();
    });
  }

  function handleDelete() {
    if (!initial) return;
    if (!confirm(`Delete r/${initial.name}? Cannot undo.`)) return;
    startTransition(async () => {
      const res = await fetch(`/api/admin/subs/${initial.id}`, { method: "DELETE" });
      if (!res.ok) {
        setError(`Delete failed (${res.status})`);
        return;
      }
      onSaved();
      router.refresh();
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="hairline flex flex-col gap-3 bg-[color:var(--color-surface-container-lowest)] p-4"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-on-surface-variant)]">
          Sub name (without r/)
          <input
            type="text"
            name="name"
            required
            defaultValue={initial?.name ?? ""}
            placeholder="CycleSyncing"
            className="hairline bg-white px-3 py-2 font-display text-[14px] normal-case tracking-normal text-[color:var(--color-on-surface)] focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1 text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-on-surface-variant)]">
          Members
          <input
            type="text"
            name="members"
            defaultValue={initial?.members ?? ""}
            placeholder="5K, 600K, 2M"
            className="hairline bg-white px-3 py-2 font-display text-[14px] normal-case tracking-normal text-[color:var(--color-on-surface)] focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1 text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-on-surface-variant)]">
          Strictness
          <select
            name="strictness"
            defaultValue={initial?.strictness ?? "medium"}
            className="hairline bg-white px-3 py-2 font-display text-[14px] normal-case tracking-normal text-[color:var(--color-on-surface)] focus:outline-none"
          >
            {STRICTNESS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-on-surface-variant)]">
          Sort order (lower = first)
          <input
            type="number"
            name="sortOrder"
            defaultValue={initial?.sortOrder ?? 999}
            className="hairline bg-white px-3 py-2 font-display text-[14px] normal-case tracking-normal text-[color:var(--color-on-surface)] focus:outline-none"
          />
        </label>
        <label className="col-span-2 flex items-center gap-2 text-[12px] text-[color:var(--color-on-surface-variant)]">
          <input
            type="checkbox"
            name="isActive"
            defaultChecked={initial?.isActive ?? true}
          />
          Active (scrape job will fetch this sub)
        </label>
      </div>

      <label className="flex flex-col gap-1 text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-on-surface-variant)]">
        Internal notes
        <input
          type="text"
          name="notes"
          defaultValue={initial?.notes ?? ""}
          placeholder="Why this sub, what to watch for..."
          className="hairline bg-white px-3 py-2 font-display text-[14px] normal-case tracking-normal text-[color:var(--color-on-surface)] focus:outline-none"
        />
      </label>

      <label className="flex flex-col gap-1 text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-on-surface-variant)]">
        Prompt template (for copy on warmup page)
        <textarea
          name="promptTemplate"
          rows={6}
          defaultValue={initial?.promptTemplate ?? ""}
          placeholder="You are commenting in r/[sub]. Audience: ... Tone: ... Cite: ..."
          className="hairline bg-white px-3 py-2 font-mono text-[12px] normal-case tracking-normal text-[color:var(--color-on-surface)] focus:outline-none"
        />
      </label>

      {error && <p className="text-[12px] text-[color:var(--color-error,#b00020)]">{error}</p>}

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="submit"
          disabled={isPending}
          className="hairline bg-[color:var(--color-primary)] px-4 py-2 font-display text-[12px] uppercase tracking-[0.16em] text-[color:var(--color-on-primary,#fff)] transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          {isPending ? "Saving..." : mode === "create" ? "Create sub" : "Save changes"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-[12px] uppercase tracking-[0.16em] text-[color:var(--color-on-surface-variant)] hover:text-[color:var(--color-primary)]"
        >
          Cancel
        </button>
        {mode === "edit" && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="ml-auto text-[12px] uppercase tracking-[0.16em] text-[color:var(--color-error,#b00020)] hover:underline disabled:opacity-40"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
}
