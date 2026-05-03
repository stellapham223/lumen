import { BASE_URL, BLOG_POSTS } from "@/lib/site";
import type { CdThread } from "@/lib/db/schema";
import { REDDIT_STYLE_RULES } from "@/lib/prompts/redditStyleRules";
import { REDDIT_DETAIL_RULES } from "@/lib/prompts/redditDetailRules";
import { REDDIT_PERSONA } from "@/lib/prompts/redditPersona";

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
  if (thread.category === "giveback") {
    return buildGivebackPrompt(thread);
  }
  return buildLumenPrompt(thread);
}

function buildLumenPrompt(thread: CdThread): string {
  const week = weekNumber();
  const age = ageHours(thread.publishedAt);
  const utm = `?utm_source=reddit&utm_medium=comment&utm_campaign=seeding_w${week}`;
  const bodyExcerpt = (thread.body ?? "").slice(0, 800);

  return `You are helping me draft a Reddit reply for a community seeding strategy.
Tone: helpful first, link only if topically perfect, 70/30 ratio (no-link/with-link).
NEVER pitch Lumen directly. Answer the question first; link as supporting reference.

${REDDIT_STYLE_RULES}

${REDDIT_DETAIL_RULES}

${REDDIT_PERSONA}

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
1. No-link version (helpful answer only). If the persona ABOVE matches the thread topic, weave one short first-person detail in naturally. If not, stay tactical and impersonal.
2. Link version (only if a blog post above is topically perfect for this question). Same persona rule.
3. Contrarian/spicy version (challenges the premise of the post, often gets upvotes). Personal stake makes it land harder, but only if persona fits — otherwise lead with the contrarian angle alone.

PERSONA-FIT CHECK (run before writing each option):
- Does the thread topic appear in the persona's "topics where first-person anecdotes are allowed" list?
- If YES → first-person OK, use real persona details, fuzz exact numbers
- If NO → no fabricated first-person. Either go indirect ("a friend with X..."), pivot to general/tactical voice, or note "(persona doesn't fit — going impersonal)" before the option

Output each reply as plain text I can paste directly into Reddit. Keep each under 1500 characters.`;
}

function buildGivebackPrompt(thread: CdThread): string {
  const age = ageHours(thread.publishedAt);
  const bodyExcerpt = (thread.body ?? "").slice(0, 800);

  return `You are helping me draft a Reddit reply for a karma-building giveback strategy.
This is a GIVEBACK thread, NOT a promotional one. Hard rules:
- ZERO product mentions. ZERO brand names. ZERO links.
- Pure helpful answer based on what works in real life.
- Earn karma + credibility. Lumen does not exist for the reader of this comment.

${REDDIT_STYLE_RULES}

${REDDIT_DETAIL_RULES}

${REDDIT_PERSONA}

REDDIT THREAD CONTEXT:
- Subreddit: r/${thread.sub}
- Title: ${thread.title}
- Body: ${bodyExcerpt || "(no body)"}
- URL: ${thread.url}
- Thread age: ~${age} hours
- Adjacent topic match: ${thread.matchedKeywords.join(", ") || "(none)"}

REPLY STRUCTURE:
[Direct empathy / acknowledgment of their situation, 1 sentence]
[Practical answer, 2-4 sentences with concrete steps or frameworks]
[Optional: caveat or "this worked for me" qualifier so it does not read as advice spam]

GENERATE 3 DIFFERENT REPLY OPTIONS:
1. Practical answer (most actionable, persona-neutral or light first-person if persona fits)
2. Personal experience version. CRITICAL: only first-person if the thread topic is in the persona's "allowed topics" list. If the thread is OUTSIDE persona scope (e.g. ADHD, PCOS Dx, IUD/Nexplanon, perimenopause, pregnancy, IPS, etc.), do ONE of:
   (a) Indirect: "a friend with X tried Y", "saw someone in r/X mention", "i don't have it but my sister..."
   (b) Pivot to a punchy tactical version distinctly different in tone from option 1
   (c) Output "(persona doesn't fit — going 2-option)" and skip
3. Question-back version (ask 1 clarifying question that helps OP think + invites more replies)

PERSONA-FIT CHECK (run before option 2):
- Is the thread topic in the persona's "allowed topics" list?
- If YES → first-person OK, fuzz exact numbers, stay consistent
- If NO → no fabricated first-person, pick (a), (b), or (c) above

Output each reply as plain text I can paste directly into Reddit. Keep each under 1200 characters.
NO LINKS. NO BRAND MENTIONS. If you are tempted, suggest a public domain reference (peer-reviewed paper, government health agency) instead.`;
}
