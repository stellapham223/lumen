import type { Metadata } from "next";
import { listMentions } from "@/lib/db/queries";

export const metadata: Metadata = {
  title: "Admin · Mentions",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function formatAge(date: Date): string {
  const ms = Date.now() - date.getTime();
  const hours = Math.floor(ms / (60 * 60 * 1000));
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}

export default async function AdminMentionsPage() {
  const mentions = await listMentions(100);
  return (
    <main className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="eyebrow text-[color:var(--color-primary)]">Mentions</span>
        <h1 className="font-display text-[28px] font-medium text-[color:var(--color-primary)]">
          Brand mentions across Reddit
        </h1>
        <p className="text-[14px] text-[color:var(--color-on-surface-variant)]">
          {mentions.length} thread{mentions.length === 1 ? "" : "s"} mention
          Lumen by name. Engage early when someone references the brand
          organically.
        </p>
      </div>
      {mentions.length === 0 ? (
        <div className="hairline bg-[color:var(--color-surface-container-lowest)] px-6 py-12 text-center">
          <p className="font-display text-[15px] text-[color:var(--color-on-surface-variant)]">
            No mentions yet. Mentions cron checks daily.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col">
          {mentions.map((m) => (
            <li
              key={m.id}
              className="hairline-b flex flex-col gap-1 py-4 first:border-t first:border-[color:var(--color-outline,rgba(0,0,0,0.12))]"
            >
              <div className="flex items-baseline justify-between gap-4">
                <a
                  href={m.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-[16px] text-[color:var(--color-primary)] hover:underline"
                >
                  {m.title}
                </a>
                <span className="shrink-0 text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-on-surface-variant)]">
                  {m.sub ? `r/${m.sub}` : m.source} · {formatAge(m.publishedAt)} ago
                </span>
              </div>
              {m.body ? (
                <p className="line-clamp-2 text-[12px] text-[color:var(--color-on-surface-variant)]">
                  {m.body.slice(0, 240)}
                  {m.body.length > 240 ? "..." : ""}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
