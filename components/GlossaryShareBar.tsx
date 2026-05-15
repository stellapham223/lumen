"use client";

import { useState } from "react";

type Props = {
  title: string;
  path: string;
};

// Build the share URL at click time from window.location so it always carries
// the live absolute URL. Using state + useEffect is racy: if the user clicks
// before the effect commits, the URL prop is still the relative path, which
// X and Facebook silently reject (they require a full http(s) URL).
function openShareWindow(template: string, path: string, title: string) {
  if (typeof window === "undefined") return;
  const absoluteUrl = new URL(path, window.location.origin).toString();
  const url = template
    .replace("__URL__", encodeURIComponent(absoluteUrl))
    .replace("__TITLE__", encodeURIComponent(title));
  window.open(url, "_blank", "noopener,noreferrer");
}

export function GlossaryShareBar({ title, path }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (typeof window === "undefined") return;
    const absoluteUrl = new URL(path, window.location.origin).toString();
    try {
      await navigator.clipboard.writeText(absoluteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = absoluteUrl;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // ignored
      }
      document.body.removeChild(textArea);
    }
  };

  const REDDIT_TEMPLATE = "https://www.reddit.com/submit?url=__URL__&title=__TITLE__";
  const X_TEMPLATE = "https://x.com/intent/post?url=__URL__&text=__TITLE__";
  const FACEBOOK_TEMPLATE = "https://www.facebook.com/sharer/sharer.php?u=__URL__";

  const baseBtn =
    "inline-flex items-center justify-center h-9 w-9 rounded-full hairline hover:bg-[color:var(--color-surface-container)] transition-colors text-[color:var(--color-on-surface-variant)] hover:text-[color:var(--color-primary)]";

  return (
    <div className="mt-6 hairline-t pt-6">
      <p className="eyebrow text-[color:var(--color-on-surface-variant)] mb-3">
        Share this article
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => openShareWindow(REDDIT_TEMPLATE, path, title)}
          aria-label="Share on Reddit"
          className={baseBtn}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M14.238 15.348c.085.084.085.221 0 .306-.465.462-1.194.687-2.231.687l-.008-.002-.008.002c-1.036 0-1.766-.225-2.231-.688-.085-.084-.085-.221 0-.305.084-.084.222-.084.307 0 .379.377 1.008.561 1.924.561l.008.002.008-.002c.915 0 1.544-.184 1.924-.562.085-.084.223-.084.307.001zm-3.44-2.418c0-.507-.414-.919-.922-.919-.509 0-.923.412-.923.919 0 .506.414.918.923.918.508.001.922-.411.922-.918zm13.202-.93c0 6.627-5.373 12-12 12s-12-5.373-12-12 5.373-12 12-12 12 5.373 12 12zm-5-.129c0-.851-.695-1.543-1.55-1.543-.417 0-.795.167-1.074.435-1.056-.695-2.485-1.137-4.066-1.194l.865-2.724 2.343.549-.003.034c0 .696.569 1.262 1.268 1.262.699 0 1.267-.566 1.267-1.262s-.568-1.262-1.267-1.262c-.537 0-.994.335-1.179.804l-2.525-.592c-.11-.027-.223.037-.257.145l-.965 3.038c-1.656.02-3.155.466-4.258 1.181-.277-.255-.644-.415-1.05-.415-.854.001-1.549.693-1.549 1.544 0 .566.311 1.056.768 1.325-.03.164-.05.331-.05.5 0 2.281 2.805 4.137 6.253 4.137s6.253-1.856 6.253-4.137c0-.16-.017-.317-.044-.472.486-.261.82-.766.82-1.353zm-4.872.141c-.509 0-.922.412-.922.919 0 .506.414.918.922.918s.922-.412.922-.918c0-.507-.413-.919-.922-.919z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => openShareWindow(X_TEMPLATE, path, title)}
          aria-label="Share on X"
          className={baseBtn}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => openShareWindow(FACEBOOK_TEMPLATE, path, title)}
          aria-label="Share on Facebook"
          className={baseBtn}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy link to clipboard"
          className="relative inline-flex items-center gap-1.5 h-9 px-3 rounded-full hairline hover:bg-[color:var(--color-surface-container)] transition-colors text-[12px] font-medium text-[color:var(--color-on-surface-variant)] hover:text-[color:var(--color-primary)]"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
          <span>{copied ? "Copied!" : "Copy link"}</span>
        </button>
      </div>
    </div>
  );
}
