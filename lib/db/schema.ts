import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  boolean,
  jsonb,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";

export const cdTopics = pgTable("cd_topics", {
  id: serial("id").primaryKey(),
  keyword: text("keyword").notNull().unique(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const cdThreads = pgTable(
  "cd_threads",
  {
    id: serial("id").primaryKey(),
    platform: text("platform").notNull(),
    externalId: text("external_id").notNull(),
    sub: text("sub").notNull(),
    title: text("title").notNull(),
    url: text("url").notNull(),
    body: text("body"),
    score: integer("score").notNull().default(0),
    commentCount: integer("comment_count").notNull().default(0),
    publishedAt: timestamp("published_at", { withTimezone: true }).notNull(),
    matchedKeywords: jsonb("matched_keywords").$type<string[]>().notNull().default([]),
    category: text("category").notNull().default("lumen"),
    scrapedAt: timestamp("scraped_at", { withTimezone: true }).notNull().defaultNow(),
    status: text("status").notNull().default("new"),
  },
  (t) => [
    uniqueIndex("cd_threads_external_unique").on(t.platform, t.externalId),
    index("cd_threads_status_idx").on(t.status, t.publishedAt),
    index("cd_threads_category_idx").on(t.category, t.status),
  ],
);

export const cdSuggestions = pgTable("cd_suggestions", {
  id: serial("id").primaryKey(),
  threadId: integer("thread_id").notNull().references(() => cdThreads.id, { onDelete: "cascade" }),
  promptText: text("prompt_text").notNull(),
  copiedAt: timestamp("copied_at", { withTimezone: true }).notNull().defaultNow(),
});

export const cdEngagements = pgTable("cd_engagements", {
  id: serial("id").primaryKey(),
  threadId: integer("thread_id").notNull().references(() => cdThreads.id, { onDelete: "cascade" }),
  commentUrl: text("comment_url").notNull().unique(),
  postedAt: timestamp("posted_at", { withTimezone: true }).notNull().defaultNow(),
  lastKarma: integer("last_karma"),
  lastReplies: integer("last_replies"),
  previousReplies: integer("previous_replies"),
  needsRevisit: boolean("needs_revisit").notNull().default(false),
  metricsCheckedAt: timestamp("metrics_checked_at", { withTimezone: true }),
});

export const cdMentions = pgTable(
  "cd_mentions",
  {
    id: serial("id").primaryKey(),
    source: text("source").notNull(),
    externalId: text("external_id").notNull(),
    sub: text("sub"),
    title: text("title").notNull(),
    url: text("url").notNull(),
    body: text("body"),
    publishedAt: timestamp("published_at", { withTimezone: true }).notNull(),
    foundAt: timestamp("found_at", { withTimezone: true }).notNull().defaultNow(),
    status: text("status").notNull().default("new"),
  },
  (t) => [
    uniqueIndex("cd_mentions_external_unique").on(t.source, t.externalId),
    index("cd_mentions_status_idx").on(t.status, t.publishedAt),
  ],
);

export const cdKarmaSnapshots = pgTable("cd_karma_snapshots", {
  id: serial("id").primaryKey(),
  capturedAt: timestamp("captured_at", { withTimezone: true }).notNull().defaultNow(),
  totalKarma: integer("total_karma").notNull(),
  linkKarma: integer("link_karma").notNull(),
  commentKarma: integer("comment_karma").notNull(),
  accountCreatedAt: timestamp("account_created_at", { withTimezone: true }),
});

export const cdSubs = pgTable(
  "cd_subs",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull().unique(),
    members: text("members").notNull().default(""),
    strictness: text("strictness").notNull().default("medium"),
    promptTemplate: text("prompt_template").notNull().default(""),
    notes: text("notes").notNull().default(""),
    isActive: boolean("is_active").notNull().default(true),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("cd_subs_active_idx").on(t.isActive, t.sortOrder)],
);

export type CdSub = typeof cdSubs.$inferSelect;
export type CdSubInsert = typeof cdSubs.$inferInsert;

export const cdIndexingLog = pgTable(
  "cd_indexing_log",
  {
    id: serial("id").primaryKey(),
    url: text("url").notNull(),
    provider: text("provider").notNull(), // "google" | "indexnow"
    status: text("status").notNull(), // "ok" | "fail"
    responseStatus: integer("response_status").notNull().default(0),
    error: text("error"),
    submittedAt: timestamp("submitted_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("cd_indexing_log_url_idx").on(t.url, t.provider, t.submittedAt),
    index("cd_indexing_log_recent_idx").on(t.submittedAt),
  ],
);

export type CdIndexingLog = typeof cdIndexingLog.$inferSelect;
export type CdIndexingLogInsert = typeof cdIndexingLog.$inferInsert;

export const INDEXING_PROVIDERS = ["google", "indexnow"] as const;
export type IndexingProvider = (typeof INDEXING_PROVIDERS)[number];

export const SUB_STRICTNESS = ["loose", "medium", "strict"] as const;
export type SubStrictness = (typeof SUB_STRICTNESS)[number];

export type CdThread = typeof cdThreads.$inferSelect;
export type CdThreadInsert = typeof cdThreads.$inferInsert;
export type CdSuggestion = typeof cdSuggestions.$inferSelect;
export type CdEngagement = typeof cdEngagements.$inferSelect;
export type CdTopic = typeof cdTopics.$inferSelect;
export type CdMention = typeof cdMentions.$inferSelect;
export type CdMentionInsert = typeof cdMentions.$inferInsert;
export type CdKarmaSnapshot = typeof cdKarmaSnapshots.$inferSelect;

export const THREAD_STATUSES = ["new", "suggested", "engaged", "skipped"] as const;
export type ThreadStatus = (typeof THREAD_STATUSES)[number];

export const THREAD_CATEGORIES = ["lumen", "giveback"] as const;
export type ThreadCategory = (typeof THREAD_CATEGORIES)[number];
