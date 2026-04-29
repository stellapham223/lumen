import { desc, eq, sql } from "drizzle-orm";
import { db, schema } from "./client";
import type { CdThreadInsert, CdThread } from "./schema";

export async function upsertThreads(rows: CdThreadInsert[]): Promise<number> {
  if (rows.length === 0) return 0;
  const result = await db
    .insert(schema.cdThreads)
    .values(rows)
    .onConflictDoUpdate({
      target: [schema.cdThreads.platform, schema.cdThreads.externalId],
      set: {
        score: sql`excluded.score`,
        commentCount: sql`excluded.comment_count`,
        matchedKeywords: sql`excluded.matched_keywords`,
        scrapedAt: sql`excluded.scraped_at`,
      },
    })
    .returning({ id: schema.cdThreads.id });
  return result.length;
}

export async function listThreads(limit = 100): Promise<CdThread[]> {
  return db
    .select()
    .from(schema.cdThreads)
    .orderBy(desc(schema.cdThreads.publishedAt))
    .limit(limit);
}

export async function getThreadById(id: number): Promise<CdThread | undefined> {
  const rows = await db
    .select()
    .from(schema.cdThreads)
    .where(eq(schema.cdThreads.id, id))
    .limit(1);
  return rows[0];
}

export async function recordEngagement(input: {
  threadId: number;
  commentUrl: string;
}) {
  return db
    .insert(schema.cdEngagements)
    .values({
      threadId: input.threadId,
      commentUrl: input.commentUrl,
    })
    .onConflictDoNothing({ target: schema.cdEngagements.commentUrl });
}

export async function listEngagements() {
  return db
    .select()
    .from(schema.cdEngagements)
    .orderBy(desc(schema.cdEngagements.postedAt));
}

export async function updateEngagementMetrics(input: {
  id: number;
  lastKarma: number;
  lastReplies: number;
}) {
  return db
    .update(schema.cdEngagements)
    .set({
      lastKarma: input.lastKarma,
      lastReplies: input.lastReplies,
      metricsCheckedAt: new Date(),
    })
    .where(eq(schema.cdEngagements.id, input.id));
}

export async function recordSuggestion(input: {
  threadId: number;
  promptText: string;
}) {
  return db.insert(schema.cdSuggestions).values(input);
}
