import { and, asc, desc, eq, gt, sql } from "drizzle-orm";
import { db, schema } from "./client";
import type {
  CdThreadInsert,
  CdThread,
  ThreadStatus,
  ThreadCategory,
  CdMentionInsert,
  CdSub,
  CdSubInsert,
} from "./schema";

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
        category: sql`excluded.category`,
        scrapedAt: sql`excluded.scraped_at`,
      },
    })
    .returning({ id: schema.cdThreads.id });
  return result.length;
}

export async function listThreads(input: {
  category?: ThreadCategory;
  status?: ThreadStatus | "all";
  limit?: number;
} = {}): Promise<CdThread[]> {
  const conditions = [];
  if (input.category) {
    conditions.push(eq(schema.cdThreads.category, input.category));
  }
  if (input.status && input.status !== "all") {
    conditions.push(eq(schema.cdThreads.status, input.status));
  }
  const where = conditions.length > 0 ? and(...conditions) : undefined;
  return db
    .select()
    .from(schema.cdThreads)
    .where(where)
    .orderBy(desc(schema.cdThreads.publishedAt))
    .limit(input.limit ?? 100);
}

export async function countThreadsByStatus(
  category?: ThreadCategory,
): Promise<Record<ThreadStatus | "all", number>> {
  const where = category ? eq(schema.cdThreads.category, category) : undefined;
  const rows = await db
    .select({ status: schema.cdThreads.status, count: sql<number>`count(*)::int` })
    .from(schema.cdThreads)
    .where(where)
    .groupBy(schema.cdThreads.status);
  const out: Record<ThreadStatus | "all", number> = {
    new: 0,
    suggested: 0,
    engaged: 0,
    skipped: 0,
    all: 0,
  };
  for (const r of rows) {
    const s = r.status as ThreadStatus;
    out[s] = r.count;
    out.all += r.count;
  }
  return out;
}

export async function getThreadById(id: number): Promise<CdThread | undefined> {
  const rows = await db
    .select()
    .from(schema.cdThreads)
    .where(eq(schema.cdThreads.id, id))
    .limit(1);
  return rows[0];
}

export async function setThreadStatus(input: {
  id: number;
  status: ThreadStatus;
}) {
  return db
    .update(schema.cdThreads)
    .set({ status: input.status })
    .where(eq(schema.cdThreads.id, input.id));
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

export async function listRevisitQueue() {
  return db
    .select({
      engagementId: schema.cdEngagements.id,
      threadId: schema.cdEngagements.threadId,
      threadTitle: schema.cdThreads.title,
      threadSub: schema.cdThreads.sub,
      commentUrl: schema.cdEngagements.commentUrl,
      postedAt: schema.cdEngagements.postedAt,
      lastKarma: schema.cdEngagements.lastKarma,
      lastReplies: schema.cdEngagements.lastReplies,
      previousReplies: schema.cdEngagements.previousReplies,
      metricsCheckedAt: schema.cdEngagements.metricsCheckedAt,
    })
    .from(schema.cdEngagements)
    .leftJoin(
      schema.cdThreads,
      eq(schema.cdEngagements.threadId, schema.cdThreads.id),
    )
    .where(eq(schema.cdEngagements.needsRevisit, true))
    .orderBy(desc(schema.cdEngagements.metricsCheckedAt));
}

export async function clearRevisitFlag(engagementId: number) {
  return db
    .update(schema.cdEngagements)
    .set({ needsRevisit: false })
    .where(eq(schema.cdEngagements.id, engagementId));
}

export async function updateEngagementMetrics(input: {
  id: number;
  lastKarma: number;
  lastReplies: number;
  previousReplies: number | null;
  needsRevisit: boolean;
}) {
  return db
    .update(schema.cdEngagements)
    .set({
      lastKarma: input.lastKarma,
      lastReplies: input.lastReplies,
      previousReplies: input.previousReplies,
      needsRevisit: input.needsRevisit,
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

export async function upsertMentions(rows: CdMentionInsert[]): Promise<number> {
  if (rows.length === 0) return 0;
  const result = await db
    .insert(schema.cdMentions)
    .values(rows)
    .onConflictDoNothing({
      target: [schema.cdMentions.source, schema.cdMentions.externalId],
    })
    .returning({ id: schema.cdMentions.id });
  return result.length;
}

export async function listMentions(limit = 100) {
  return db
    .select()
    .from(schema.cdMentions)
    .orderBy(desc(schema.cdMentions.publishedAt))
    .limit(limit);
}

export async function recordKarmaSnapshot(input: {
  totalKarma: number;
  linkKarma: number;
  commentKarma: number;
  accountCreatedAt: Date | null;
}) {
  return db.insert(schema.cdKarmaSnapshots).values(input);
}

export async function latestKarmaSnapshot() {
  const rows = await db
    .select()
    .from(schema.cdKarmaSnapshots)
    .orderBy(desc(schema.cdKarmaSnapshots.capturedAt))
    .limit(1);
  return rows[0];
}

export async function listKarmaSnapshots(limit = 90) {
  return db
    .select()
    .from(schema.cdKarmaSnapshots)
    .orderBy(asc(schema.cdKarmaSnapshots.capturedAt))
    .limit(limit);
}

export async function listSubs(options: { onlyActive?: boolean } = {}): Promise<CdSub[]> {
  const query = db.select().from(schema.cdSubs);
  const rows = options.onlyActive
    ? await query.where(eq(schema.cdSubs.isActive, true)).orderBy(asc(schema.cdSubs.sortOrder), asc(schema.cdSubs.name))
    : await query.orderBy(asc(schema.cdSubs.sortOrder), asc(schema.cdSubs.name));
  return rows;
}

export async function getSubByName(name: string): Promise<CdSub | undefined> {
  const rows = await db
    .select()
    .from(schema.cdSubs)
    .where(eq(schema.cdSubs.name, name))
    .limit(1);
  return rows[0];
}

export async function insertSub(input: CdSubInsert): Promise<CdSub> {
  const [row] = await db.insert(schema.cdSubs).values(input).returning();
  return row;
}

export async function updateSub(id: number, input: Partial<CdSubInsert>): Promise<CdSub | undefined> {
  const [row] = await db
    .update(schema.cdSubs)
    .set({ ...input, updatedAt: new Date() })
    .where(eq(schema.cdSubs.id, id))
    .returning();
  return row;
}

export async function deleteSub(id: number): Promise<void> {
  await db.delete(schema.cdSubs).where(eq(schema.cdSubs.id, id));
}
