// GA4 via @next/third-parties (optimized loading, deferred until hydration).
// Set NEXT_PUBLIC_GA_ID in env to enable. No-op locally / when unset.

import { GoogleAnalytics } from "@next/third-parties/google";

export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gaId) return null;
  return <GoogleAnalytics gaId={gaId} />;
}
