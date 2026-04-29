import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getThreadById } from "@/lib/db/queries";
import { db, schema } from "@/lib/db/client";
import { eq } from "drizzle-orm";
import { buildRedditReplyPrompt } from "@/lib/prompts/redditReply";
import { AdminThreadActions } from "@/components/AdminThreadActions";
import { AdminStatusButtons } from "@/components/AdminStatusButtons";

export const metadata: Metadata = {
  title: "Admin · Thread",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminThreadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isFinite(id)) notFound();

  const thread = await getThreadById(id);
  if (!thread) notFound();

  const [existingEngagement] = await db
    .select()
    .from(schema.cdEngagements)
    .where(eq(schema.cdEngagements.threadId, id))
    .limit(1);

  const prompt = buildRedditReplyPrompt(thread);

  return (
    <main className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Link
          href="/admin"
          className="text-[12px] uppercase tracking-[0.16em] text-[color:var(--color-on-surface-variant)] hover:text-[color:var(--color-primary)]"
        >
          ← Threads
        </Link>
        <span className="eyebrow text-[color:var(--color-primary)]">
          r/{thread.sub}
        </span>
        <h1 className="font-display text-[24px] leading-tight font-medium text-[color:var(--color-primary)]">
          {thread.title}
        </h1>
        <a
          href={thread.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] text-[color:var(--color-primary)] underline underline-offset-2 hover:opacity-80"
        >
          Open on Reddit ↗
        </a>
        <div className="mt-2">
          <AdminStatusButtons threadId={thread.id} currentStatus={thread.status} />
        </div>
      </div>

      {thread.body ? (
        <div className="hairline bg-[color:var(--color-surface-container-lowest)] p-4 text-[13px] leading-relaxed text-[color:var(--color-on-surface)]">
          {thread.body.slice(0, 2000)}
          {thread.body.length > 2000 ? "..." : ""}
        </div>
      ) : null}

      <AdminThreadActions
        threadId={thread.id}
        promptText={prompt}
        defaultEngagementUrl={existingEngagement?.commentUrl}
      />

      {existingEngagement ? (
        <section className="hairline bg-[color:var(--color-surface-container-lowest)] p-4 text-[12px]">
          <p className="font-display text-[14px] font-medium text-[color:var(--color-primary)]">
            Tracked engagement
          </p>
          <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-[color:var(--color-on-surface-variant)]">
            <dt>Comment URL</dt>
            <dd className="truncate">
              <a
                href={existingEngagement.commentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[color:var(--color-primary)] underline underline-offset-2"
              >
                {existingEngagement.commentUrl}
              </a>
            </dd>
            <dt>Posted at</dt>
            <dd>{existingEngagement.postedAt.toISOString()}</dd>
            <dt>Last karma</dt>
            <dd>{existingEngagement.lastKarma ?? "—"}</dd>
            <dt>Last replies</dt>
            <dd>{existingEngagement.lastReplies ?? "—"}</dd>
            <dt>Metrics checked</dt>
            <dd>
              {existingEngagement.metricsCheckedAt
                ? existingEngagement.metricsCheckedAt.toISOString()
                : "—"}
            </dd>
          </dl>
        </section>
      ) : null}
    </main>
  );
}
