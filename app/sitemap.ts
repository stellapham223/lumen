import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/site";

const BLOG_POSTS = [
  "what-is-cycle-syncing",
  "best-cycle-syncing-app",
  "cycle-syncing-chart",
  "how-to-start-cycle-syncing",
  "is-cycle-syncing-legit",
] as const;

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
      url: `${BASE_URL}/methodology`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...BLOG_POSTS.map((slug) => ({
      url: `${BASE_URL}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
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
    // /plan is intentionally excluded — personalized, noindex.
  ];
}
