// Single source of truth for brand + URL constants.
// Override BASE_URL via NEXT_PUBLIC_SITE_URL env var in production (set in Vercel).
// When the production domain is purchased (Sprint 4), update Vercel env to point at it.

const rawBase = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL;

export const BASE_URL: string =
  rawBase ||
  (vercelUrl ? `https://${vercelUrl}` : "https://cycle-flow.vercel.app");

export const SITE = {
  name: "Lumen",
  tagline: "Cycle-aware productivity for ambitious women",
  description:
    "Schedule deep work, meetings, and creative time around your four hormonal phases. A free planner for women who want to work with their biology, not against it.",
  shortDescription:
    "Free cycle-aware productivity planner. Map your week to your four hormonal phases.",
  locale: "en_US",
  twitterHandle: undefined as string | undefined,
  // Keywords used by Lumen content. Curated for cycle-syncing + productivity audience.
  keywords: [
    "cycle syncing",
    "cycle syncing schedule",
    "cycle-aware productivity",
    "menstrual cycle productivity",
    "luteal phase productivity",
    "follicular phase productivity",
    "luteal phase tasks",
    "follicular phase tasks",
    "cycle planner",
    "cycle calendar",
    "cycle phase calculator",
    "menstrual phase calculator",
    "ovulatory phase work",
    "menstrual cycle calendar",
  ],
} as const;

export function absoluteUrl(path: string = "/"): string {
  if (/^https?:/.test(path)) return path;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_URL}${p}`;
}
