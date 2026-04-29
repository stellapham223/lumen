import Link from "next/link";

type Props = {
  basePath: string;
  current: string;
  counts: Record<string, number>;
};

const TABS: { value: string; label: string }[] = [
  { value: "new", label: "New" },
  { value: "suggested", label: "Suggested" },
  { value: "engaged", label: "Engaged" },
  { value: "skipped", label: "Skipped" },
  { value: "all", label: "All" },
];

export function AdminStatusTabs({ basePath, current, counts }: Props) {
  return (
    <div className="hairline-b flex flex-wrap items-center gap-1 pb-2">
      {TABS.map((t) => {
        const href =
          t.value === "new" ? basePath : `${basePath}?status=${t.value}`;
        const active = current === t.value;
        return (
          <Link
            key={t.value}
            href={href}
            className={
              "px-3 py-2 text-[11px] uppercase tracking-[0.16em] transition-colors " +
              (active
                ? "text-[color:var(--color-primary)] font-semibold"
                : "text-[color:var(--color-on-surface-variant)] hover:text-[color:var(--color-primary)]")
            }
          >
            {t.label} <span className="opacity-60">({counts[t.value] ?? 0})</span>
          </Link>
        );
      })}
    </div>
  );
}
