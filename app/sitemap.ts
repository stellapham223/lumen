import type { MetadataRoute } from "next";
import { BASE_URL, BLOG_POSTS, GLOSSARY_TERMS } from "@/lib/site";

// Only emit sitemap entries for glossary terms that have a Published MDX file.
// Manifest holds all 152 planned terms; sitemap should not list 404s.
const PUBLISHED_GLOSSARY_SLUGS = new Set<string>([
  "cycle-syncing",
  "follicular-phase",
  "pms",
]);

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
    ...GLOSSARY_TERMS.filter((t) => PUBLISHED_GLOSSARY_SLUGS.has(t.slug)).map(
      (t) => ({
        url: `${BASE_URL}/glossary/${t.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }),
    ),
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
