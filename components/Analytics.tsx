// Plausible analytics: privacy-friendly, cookieless, GDPR-compliant.
// Set NEXT_PUBLIC_PLAUSIBLE_DOMAIN in env to enable. No-op locally / when unset.

import Script from "next/script";

export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;
  return (
    <Script
      defer
      data-domain={domain}
      // Includes outbound-link + file-download + 404 + custom event extensions.
      src="https://plausible.io/js/script.outbound-links.file-downloads.404.tagged-events.js"
      strategy="afterInteractive"
    />
  );
}
