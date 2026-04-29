import { BASE_URL, BLOG_POSTS } from "@/lib/site";
import type { CdThread } from "@/lib/db/schema";

function weekNumber(date: Date = new Date()): number {
  const start = new Date(date.getFullYear(), 0, 1);
  const diff = date.getTime() - start.getTime();
  return Math.ceil((diff / (1000 * 60 * 60 * 24) + start.getDay() + 1) / 7);
}

function ageHours(date: Date): number {
  return Math.max(1, Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60)));
}

function blogList(): string {
  return BLOG_POSTS.map((p) => `- ${BASE_URL}/blog/${p.slug} — ${p.title}`).join("\n");
}

export function buildRedditReplyPrompt(thread: CdThread): string {
  const week = weekNumber();
  const age = ageHours(thread.publishedAt);
  const utm = `?utm_source=reddit&utm_medium=comment&utm_campaign=seeding_w${week}`;
  const bodyExcerpt = (thread.body ?? "").slice(0, 800);

  return `You are helping me draft a Reddit reply for a community seeding strategy.
Tone: helpful first, link only if topically perfect, 70/30 ratio (no-link/with-link).
NEVER pitch Lumen directly. Answer the question first; link as supporting reference.

REDDIT THREAD CONTEXT:
- Subreddit: r/${thread.sub}
- Title: ${thread.title}
- Body: ${bodyExcerpt || "(no body)"}
- URL: ${thread.url}
- Thread age: ~${age} hours
- Matched keywords: ${thread.matchedKeywords.join(", ") || "(none)"}

LUMEN BLOG POSTS AVAILABLE TO REFERENCE (only if directly relevant):
${blogList()}

REPLY STRUCTURE (if you decide to include a link):
[Direct answer to their question, 2-3 sentences with substance]
[Specific framework or number]
[If a Lumen post is genuinely relevant: "I wrote a longer breakdown here: <URL with UTM>"]
[TL;DR one line]

UTM tag format: ${utm}
(Append to any blog URL, e.g. ${BASE_URL}/blog/<slug>${utm})

GENERATE 3 DIFFERENT REPLY OPTIONS:
1. No-link version (helpful answer only)
2. Link version (only if a blog post above is topically perfect for this question)
3. Contrarian/spicy version (challenges the premise of the post, often gets upvotes)

Output each reply as plain text I can paste directly into Reddit. Keep each under 1500 characters.`;
}
