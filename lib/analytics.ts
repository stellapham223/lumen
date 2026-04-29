// Tiny typed wrapper around GA4's sendGAEvent.
// No-op locally / when NEXT_PUBLIC_GA_ID is unset.

import { sendGAEvent } from "@next/third-parties/google";

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

export function track(
  event: LumenEvent,
  props?: Record<string, string | number | boolean>,
) {
  if (typeof window === "undefined") return;
  if (!process.env.NEXT_PUBLIC_GA_ID) return;
  sendGAEvent("event", event, props ?? {});
}
