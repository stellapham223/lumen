// Single source of truth for brand + URL constants.
// Override BASE_URL via NEXT_PUBLIC_SITE_URL env var in production (set in Vercel).
// When the production domain is purchased (Sprint 4), update Vercel env to point at it.

// Resolution order:
//   1. NEXT_PUBLIC_SITE_URL — explicit override (use when you buy a real domain)
//   2. VERCEL_PROJECT_PRODUCTION_URL — Vercel-injected production alias (e.g. lumen-one-plum.vercel.app)
//   3. VERCEL_URL — current deployment URL (changes per deploy; preview branches included)
//   4. localhost fallback for `bun run dev`
function resolveBaseUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (explicit) return explicit;

  const prodUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (prodUrl) return `https://${prodUrl}`;

  const deployUrl = process.env.VERCEL_URL;
  if (deployUrl) return `https://${deployUrl}`;

  return "http://localhost:3000";
}

export const BASE_URL: string = resolveBaseUrl();

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

// Blog post manifest — single source for sitemap, /blog index, internal links.
export const BLOG_POSTS = [
  {
    slug: "what-is-cycle-syncing",
    title: "What is cycle syncing?",
    description:
      "A grounded definition, where the term came from, and what the research supports — and what it does not.",
    publishedAt: "2026-04-28",
  },
  {
    slug: "best-cycle-syncing-app",
    title: "Best cycle syncing app in 2026: an honest comparison",
    description:
      "Lumen vs Flo vs Clue vs Natural Cycles vs MyFlo vs 28 — strengths, weaknesses, privacy posture.",
    publishedAt: "2026-04-28",
  },
  {
    slug: "cycle-syncing-chart",
    title: "Cycle syncing chart",
    description:
      "Hormones, energy, and the right work for each of the four cycle phases. Print-friendly reference.",
    publishedAt: "2026-04-28",
  },
  {
    slug: "how-to-start-cycle-syncing",
    title: "How to start cycle syncing",
    description:
      "A two-cycle beginner action plan. Track first, then adjust one decision area. No food prescriptions.",
    publishedAt: "2026-04-28",
  },
  {
    slug: "is-cycle-syncing-legit",
    title: "Is cycle syncing legit?",
    description:
      "An honest look at what the research backs, what is overstated, and where to land between TikTok hype and full-skeptic dismissal.",
    publishedAt: "2026-04-28",
  },
] as const;
