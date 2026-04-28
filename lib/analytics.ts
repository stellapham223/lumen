// Tiny typed wrapper around Plausible's `window.plausible(eventName, opts)` API.
// No-op when Plausible isn't loaded (local dev, ad-blocked, env var missing).

type PlausibleOptions = {
  props?: Record<string, string | number | boolean>;
  callback?: () => void;
};

declare global {
  interface Window {
    plausible?: (event: string, opts?: PlausibleOptions) => void;
  }
}

export type LumenEvent =
  | "calculator_complete"
  | "demo_loaded"
  | "plan_viewed"
  | "plan_edited"
  | "day_modal_opened"
  | "phase_deepdive_opened"
  | "email_signup"
  | "affiliate_click"
  | "outbound_click";

export function track(event: LumenEvent, props?: PlausibleOptions["props"]) {
  if (typeof window === "undefined") return;
  if (typeof window.plausible !== "function") return;
  window.plausible(event, props ? { props } : undefined);
}
