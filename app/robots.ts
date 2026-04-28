import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default rule for all crawlers (search engines + standard bots).
      {
        userAgent: "*",
        allow: "/",
        // /plan is personalized, depends on localStorage — no value to indexing
        // and most crawlers will see an empty skeleton state anyway.
        disallow: ["/plan"],
      },
      // Explicitly allow major AI crawlers used by ChatGPT, Claude, Perplexity,
      // Google AI Overviews, etc. AEO-positive — we want our content cited.
      // (Re-listing here makes the intent explicit even though "*" already covers them.)
      { userAgent: "GPTBot", allow: "/", disallow: ["/plan"] },
      { userAgent: "OAI-SearchBot", allow: "/", disallow: ["/plan"] },
      { userAgent: "ChatGPT-User", allow: "/", disallow: ["/plan"] },
      { userAgent: "ClaudeBot", allow: "/", disallow: ["/plan"] },
      { userAgent: "Claude-Web", allow: "/", disallow: ["/plan"] },
      { userAgent: "anthropic-ai", allow: "/", disallow: ["/plan"] },
      { userAgent: "PerplexityBot", allow: "/", disallow: ["/plan"] },
      { userAgent: "Perplexity-User", allow: "/", disallow: ["/plan"] },
      { userAgent: "Google-Extended", allow: "/", disallow: ["/plan"] },
      { userAgent: "Applebot-Extended", allow: "/", disallow: ["/plan"] },
      { userAgent: "CCBot", allow: "/", disallow: ["/plan"] },
      { userAgent: "Meta-ExternalAgent", allow: "/", disallow: ["/plan"] },
      { userAgent: "Bytespider", allow: "/", disallow: ["/plan"] },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
