// Single source of truth for brand + URL constants.
// Production domain: lumencal.com (set via NEXT_PUBLIC_SITE_URL in Vercel).

// Resolution order:
//   1. NEXT_PUBLIC_SITE_URL: explicit override (production = https://lumencal.com)
//   2. VERCEL_PROJECT_PRODUCTION_URL: Vercel-injected production alias (preview/staging)
//   3. VERCEL_URL: current deployment URL (changes per deploy; preview branches included)
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

// Blog post manifest: single source for sitemap, /blog index, internal links.
export const BLOG_POSTS = [
  {
    slug: "what-is-cycle-syncing",
    title: "What is cycle syncing?",
    description:
      "A grounded definition, where the term came from, and what the research supports (and what it does not).",
    publishedAt: "2026-04-28",
  },
  {
    slug: "best-cycle-syncing-app",
    title: "Best cycle syncing app in 2026: an honest comparison",
    description:
      "Lumen vs Flo vs Clue vs Natural Cycles vs MyFlo vs 28: strengths, weaknesses, privacy posture.",
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
  {
    slug: "does-cycle-syncing-work",
    title: "Does cycle syncing work? An evidence-graded answer",
    description:
      "Cycle syncing is not one practice, it is four. A 2024 meta-analysis killed the case for phase-timed exercise. Here is the evidence grade for each protocol, plus a 2-cycle self-test.",
    publishedAt: "2026-05-06",
  },
  {
    slug: "how-does-cycle-syncing-work",
    title: "How does cycle syncing work? The hormone-cognition mechanism",
    description:
      "Estrogen and progesterone modulate four neurotransmitter systems (serotonin, GABA, dopamine, BDNF), producing predictable shifts in cognition, mood, and energy. The mechanism, in plain language.",
    publishedAt: "2026-05-09",
  },
  {
    slug: "cycle-syncing-on-birth-control",
    title: "Does cycle syncing work on birth control? Method-by-method",
    description:
      "Combined pill, mini-pill, hormonal IUD, copper IUD, implant, ring, patch: cycle syncing applies differently to each. A method-by-method verdict with the mechanism behind it.",
    publishedAt: "2026-05-13",
  },
  {
    slug: "cycle-syncing-beginner-plan",
    title: "Cycle syncing for beginners: a literal 4-week plan",
    description:
      "Spend Week 0 tracking only, then run a 4-week plan that maps each cycle phase to one focus. Concrete daily actions for work, exercise, and sleep. No diet rules in month one.",
    publishedAt: "2026-05-16",
  },
  {
    slug: "cycle-syncing-schedule-template",
    title: "Cycle syncing schedule template (free, no signup)",
    description:
      "A free cycle syncing schedule template you can copy in 5 minutes. Maps the four phases onto a 28-day calendar for work, exercise, and recovery. Built for knowledge workers, not lifestyle prescriptions.",
    publishedAt: "2026-05-19",
  },
  {
    slug: "free-cycle-syncing-apps-compared",
    title: "Free cycle syncing apps compared (2026): 6 honest reviews",
    description:
      "An honest 2026 comparison of free cycle syncing apps: Lumen, Lively, 28, Clue, Wild.AI, and Euki. Free-tier limits, privacy, account requirements, and which one fits which job.",
    publishedAt: "2026-05-22",
  },
  {
    slug: "follicular-phase-complete-guide",
    title: "Follicular phase: the complete guide for ambitious women",
    description:
      "An evidence-graded guide to the follicular phase: hormones, symptoms, what to schedule, what to avoid, and how PCOS, perimenopause, and hormonal birth control change the picture.",
    publishedAt: "2026-05-26",
  },
] as const;
