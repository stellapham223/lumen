"use client";

import { useState } from "react";
import { MaterialIcon } from "./MaterialIcon";
import { references, type Reference } from "@/lib/references";

const typeLabel: Record<string, string> = {
  paper: "Paper",
  book: "Book",
  guideline: "Guideline",
};

const typeIcon: Record<Reference["type"], string> = {
  paper: "article",
  book: "menu_book",
  guideline: "verified",
};

export function ReferencesFooter() {
  const [open, setOpen] = useState(false);

  return (
    <section className="hairline bg-[color:var(--color-surface-container-lowest)] p-6 sm:p-10">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-left transition-opacity hover:opacity-80"
        aria-expanded={open}
      >
        <div>
          <span className="eyebrow text-[color:var(--color-primary)]">Research</span>
          <h3 className="mt-1 font-display text-[24px] font-medium text-[color:var(--color-primary)]">
            Sources & references
          </h3>
          <p className="mt-1 text-[14px] italic text-[color:var(--color-on-surface-variant)]">
            {references.length} sources — peer-reviewed papers, books, and clinical guidelines.
          </p>
        </div>
        <span
          className={`text-[color:var(--color-primary)] transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          <MaterialIcon name="add" size={28} weight={300} />
        </span>
      </button>

      {open && (
        <ul className="mt-8 space-y-4 animate-fade-up">
          {references.map((r) => (
            <li key={r.id} className="hairline-b last:border-0 pb-4 last:pb-0">
              <div className="flex items-baseline gap-2 text-[10px] uppercase tracking-[0.12em] text-[color:var(--color-on-surface-variant)]">
                <span className="flex items-center gap-1">
                  <MaterialIcon name={typeIcon[r.type]} size={12} weight={300} />
                  {typeLabel[r.type]}
                </span>
                <span>·</span>
                <span>{r.year}</span>
              </div>
              <p className="mt-2 font-display text-[16px] font-medium leading-snug text-[color:var(--color-primary)]">
                {r.title}
              </p>
              <p className="mt-0.5 text-[13px] text-[color:var(--color-on-surface-variant)]">
                {r.authors} ·{" "}
                <span className="italic">{r.source}</span>
              </p>
              {r.url && (
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[color:var(--color-primary)] transition-opacity hover:opacity-70"
                >
                  View source
                  <MaterialIcon name="north_east" size={12} weight={400} />
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
