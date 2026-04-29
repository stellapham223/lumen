import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default rule for all crawlers (search engines + standard bots).
      // /plan is personalized (localStorage). /admin is private. /api/admin
      // and /api/cron are auth-gated and have no SEO value.
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/plan", "/admin", "/api/admin", "/api/cron"],
      },
      // Explicitly allow major AI crawlers used by ChatGPT, Claude, Perplexity,
      // Google AI Overviews, etc. AEO-positive: we want our content cited.
      // (Re-listing here makes the intent explicit even though "*" already covers them.)
      { userAgent: "GPTBot", allow: "/", disallow: ["/plan", "/admin", "/api/admin", "/api/cron"] },
      { userAgent: "OAI-SearchBot", allow: "/", disallow: ["/plan", "/admin", "/api/admin", "/api/cron"] },
      { userAgent: "ChatGPT-User", allow: "/", disallow: ["/plan", "/admin", "/api/admin", "/api/cron"] },
      { userAgent: "ClaudeBot", allow: "/", disallow: ["/plan", "/admin", "/api/admin", "/api/cron"] },
      { userAgent: "Claude-Web", allow: "/", disallow: ["/plan", "/admin", "/api/admin", "/api/cron"] },
      { userAgent: "anthropic-ai", allow: "/", disallow: ["/plan", "/admin", "/api/admin", "/api/cron"] },
      { userAgent: "PerplexityBot", allow: "/", disallow: ["/plan", "/admin", "/api/admin", "/api/cron"] },
      { userAgent: "Perplexity-User", allow: "/", disallow: ["/plan", "/admin", "/api/admin", "/api/cron"] },
      { userAgent: "Google-Extended", allow: "/", disallow: ["/plan", "/admin", "/api/admin", "/api/cron"] },
      { userAgent: "Applebot-Extended", allow: "/", disallow: ["/plan", "/admin", "/api/admin", "/api/cron"] },
      { userAgent: "CCBot", allow: "/", disallow: ["/plan", "/admin", "/api/admin", "/api/cron"] },
      { userAgent: "Meta-ExternalAgent", allow: "/", disallow: ["/plan", "/admin", "/api/admin", "/api/cron"] },
      { userAgent: "Bytespider", allow: "/", disallow: ["/plan", "/admin", "/api/admin", "/api/cron"] },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
