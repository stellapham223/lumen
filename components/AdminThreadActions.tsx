"use client";

import { useState, useTransition } from "react";

type Props = {
  threadId: number;
  promptText: string;
  defaultEngagementUrl?: string;
};

export function AdminThreadActions({
  threadId,
  promptText,
  defaultEngagementUrl,
}: Props) {
  const [copied, setCopied] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(
    defaultEngagementUrl ? "loaded" : null,
  );
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleCopy() {
    navigator.clipboard
      .writeText(promptText)
      .then(() => {
        setCopied(true);
        fetch(`/api/admin/threads/${threadId}/suggestion`, {
          method: "POST",
          body: JSON.stringify({ promptText }),
          headers: { "Content-Type": "application/json" },
        }).catch(() => undefined);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => setError("Copy failed."));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    const commentUrl = String(data.get("commentUrl") ?? "").trim();
    if (!commentUrl.startsWith("https://")) {
      setError("Comment URL must start with https://");
      return;
    }
    startTransition(async () => {
      const res = await fetch("/api/admin/engagements", {
        method: "POST",
        body: JSON.stringify({ threadId, commentUrl }),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        setError(`Save failed (${res.status})`);
        return;
      }
      setSavedAt(new Date().toLocaleTimeString());
      form.reset();
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-[18px] font-medium text-[color:var(--color-primary)]">
            Reply prompt
          </h2>
          <button
            type="button"
            onClick={handleCopy}
            className="hairline bg-[color:var(--color-primary)] px-4 py-2 font-display text-[12px] uppercase tracking-[0.16em] text-[color:var(--color-on-primary,#fff)] transition-opacity hover:opacity-90"
          >
            {copied ? "Copied" : "Copy prompt"}
          </button>
        </div>
        <textarea
          readOnly
          value={promptText}
          rows={16}
          className="hairline bg-[color:var(--color-surface-container-lowest)] p-4 font-mono text-[12px] leading-relaxed text-[color:var(--color-on-surface)] focus:outline-none"
        />
        <p className="text-[12px] text-[color:var(--color-on-surface-variant)]">
          Paste into Claude / ChatGPT, get 3 reply candidates, pick one, post to
          Reddit.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-display text-[18px] font-medium text-[color:var(--color-primary)]">
          Mark as posted
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="url"
            name="commentUrl"
            required
            placeholder="https://www.reddit.com/r/.../comments/..."
            defaultValue={defaultEngagementUrl}
            className="hairline bg-[color:var(--color-surface-container-lowest)] px-4 py-3 font-display text-[14px] focus:outline-none"
          />
          {error ? (
            <p className="text-[12px] text-[color:var(--color-error,#b00020)]">
              {error}
            </p>
          ) : null}
          {savedAt ? (
            <p className="text-[12px] text-[color:var(--color-on-surface-variant)]">
              {savedAt === "loaded" ? "Already tracked." : `Saved at ${savedAt}.`}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={isPending}
            className="hairline border border-[color:var(--color-primary)] px-4 py-2 font-display text-[12px] uppercase tracking-[0.16em] text-[color:var(--color-primary)] transition-opacity hover:opacity-80 disabled:opacity-40"
          >
            {isPending ? "Saving..." : "Save engagement"}
          </button>
        </form>
      </section>
    </div>
  );
}
