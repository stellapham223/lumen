"use client";

import { useState } from "react";

type Props = {
  text: string;
  label?: string;
};

export function CopyPromptButton({ text, label = "Copy prompt" }: Props) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => undefined);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      disabled={!text}
      className="hairline bg-[color:var(--color-primary)] px-4 py-2 font-display text-[12px] uppercase tracking-[0.16em] text-[color:var(--color-on-primary,#fff)] transition-opacity hover:opacity-90 disabled:opacity-40"
    >
      {copied ? "Copied" : label}
    </button>
  );
}
