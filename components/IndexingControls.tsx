"use client";

import { useState } from "react";

type Scope = "glossary" | "blog" | "calculator" | "phase" | "all";
type Provider = "google" | "indexnow" | "both";

type Summary = {
  scope: Scope;
  provider: Provider;
  totalCandidates: number;
  google?: {
    submitted: number;
    skippedRecent: number;
    capped: boolean;
    ok: number;
    failed: number;
    sampleErrors: Array<{ url: string; status: number; error?: string }>;
  };
  indexnow?: {
    submitted: number;
    skippedRecent: number;
    capped: boolean;
    ok: boolean;
    status: number;
    error?: string;
  };
};

export function IndexingControls() {
  const [scope, setScope] = useState<Scope>("glossary");
  const [provider, setProvider] = useState<Provider>("both");
  const [force, setForce] = useState(false);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Summary | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setBusy(true);
    setError(null);
    setResult(null);
    try {
      const response = await fetch("/api/admin/indexing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scope, provider, force }),
      });
      const json = await response.json();
      if (!response.ok) {
        setError(json.error ?? `HTTP ${response.status}`);
      } else {
        setResult(json as Summary);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <fieldset className="hairline p-4">
        <legend className="px-2 text-[12px] uppercase tracking-[0.16em] text-[color:var(--color-on-surface-variant)]">
          Scope
        </legend>
        <div className="flex flex-wrap gap-3 text-[14px]">
          {(["glossary", "blog", "calculator", "phase", "all"] as const).map((s) => (
            <label key={s} className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="scope"
                value={s}
                checked={scope === s}
                onChange={() => setScope(s)}
              />
              <span>{s}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="hairline p-4">
        <legend className="px-2 text-[12px] uppercase tracking-[0.16em] text-[color:var(--color-on-surface-variant)]">
          Provider
        </legend>
        <div className="flex flex-wrap gap-3 text-[14px]">
          {(["both", "google", "indexnow"] as const).map((p) => (
            <label key={p} className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="provider"
                value={p}
                checked={provider === p}
                onChange={() => setProvider(p)}
              />
              <span>{p}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="inline-flex items-center gap-2 text-[13px] text-[color:var(--color-on-surface-variant)]">
        <input
          type="checkbox"
          checked={force}
          onChange={(e) => setForce(e.target.checked)}
        />
        <span>
          Force re-submit URLs that were already submitted in the last 7 days
        </span>
      </label>

      <button
        type="button"
        onClick={submit}
        disabled={busy}
        className="rounded bg-[color:var(--color-primary)] px-5 py-2.5 text-[14px] font-medium text-[color:var(--color-on-primary)] disabled:opacity-50"
      >
        {busy ? "Submitting..." : "Submit"}
      </button>

      {error ? (
        <div className="hairline border-l-2 border-red-600 p-3 text-[13px] text-red-700">
          {error}
        </div>
      ) : null}

      {result ? (
        <div className="hairline p-4 text-[13px] space-y-3">
          <div>
            <strong>Scope:</strong> {result.scope} &nbsp;·&nbsp;{" "}
            <strong>Provider:</strong> {result.provider} &nbsp;·&nbsp;{" "}
            <strong>Candidates:</strong> {result.totalCandidates}
          </div>

          {result.google ? (
            <div className="space-y-1">
              <div className="font-semibold">Google Indexing API</div>
              <div>
                Submitted: {result.google.submitted} · OK: {result.google.ok} ·
                Failed: {result.google.failed} · Skipped (recent):{" "}
                {result.google.skippedRecent}
                {result.google.capped ? " · (run capped at 150/run)" : ""}
              </div>
              {result.google.sampleErrors.length > 0 ? (
                <details className="mt-1">
                  <summary className="cursor-pointer text-[color:var(--color-on-surface-variant)]">
                    Sample errors ({result.google.sampleErrors.length})
                  </summary>
                  <ul className="ml-4 mt-1 list-disc space-y-1">
                    {result.google.sampleErrors.map((e, i) => (
                      <li key={i} className="text-[12px]">
                        <code>{e.status}</code> · {e.url}
                        {e.error ? ` · ${e.error}` : ""}
                      </li>
                    ))}
                  </ul>
                </details>
              ) : null}
            </div>
          ) : null}

          {result.indexnow ? (
            <div className="space-y-1">
              <div className="font-semibold">IndexNow (Bing + Yandex)</div>
              <div>
                Submitted: {result.indexnow.submitted} · HTTP{" "}
                {result.indexnow.status} ·{" "}
                {result.indexnow.ok ? "OK" : "FAILED"} · Skipped (recent):{" "}
                {result.indexnow.skippedRecent}
                {result.indexnow.capped ? " · (capped)" : ""}
              </div>
              {result.indexnow.error ? (
                <div className="text-[12px] text-red-700">
                  {result.indexnow.error}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
