import type { MetadataRoute } from "next";
import { BASE_URL, BLOG_POSTS, GLOSSARY_TERMS } from "@/lib/site";
import { CALCULATOR_PAGES } from "@/lib/calculator-pages";
import { PHASE_PAGES } from "@/lib/phase-pages";
import { CYCLE_DAY_PAGES } from "@/lib/cycle-day-pages";
import { SYMPTOM_PAGES } from "@/lib/symptom-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/glossary`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calculator`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/cycle-day`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/symptoms`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/methodology`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...BLOG_POSTS.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...CALCULATOR_PAGES.map((p) => ({
      url: `${BASE_URL}/calculator/${p.slug}`,
      lastModified: new Date(p.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...PHASE_PAGES.map((p) => ({
      url: `${BASE_URL}/${p.slug}`,
      lastModified: new Date(p.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...CYCLE_DAY_PAGES.map((p) => ({
      url: `${BASE_URL}/cycle-day/${p.day}`,
      lastModified: new Date(p.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...SYMPTOM_PAGES.map((p) => ({
      url: `${BASE_URL}/symptoms/${p.slug}`,
      lastModified: new Date(p.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...GLOSSARY_TERMS.filter((t) => t.status === "Published").map((t) => ({
      url: `${BASE_URL}/glossary/${t.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${BASE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    // /plan is intentionally excluded: personalized, noindex.
  ];
}
