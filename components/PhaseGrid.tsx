// 4-column compact summary used at the bottom of each "by phase" section in
// long-form blog posts. Each column gets a thin accent bar in its phase color,
// an eyebrow label, day range, optional headline, and 2–4 bullet items
// (label on the left, optional meta string on the right).

const PHASE_ACCENTS = {
  Menstrual: "#D8829E",
  Follicular: "#D4A65A",
  Ovulatory: "#D97757",
  Luteal: "#8B6FB8",
} as const;

type PhaseName = keyof typeof PHASE_ACCENTS;

export interface PhaseGridItem {
  label: string;
  meta?: string;
}

export interface PhaseGridColumn {
  name: PhaseName;
  days: string;
  headline?: string;
  items: PhaseGridItem[];
}

export function PhaseGrid({ columns }: { columns: PhaseGridColumn[] }) {
  return (
    <div className="my-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {columns.map((col) => (
        <div
          key={col.name}
          className="hairline flex flex-col bg-[color:var(--color-surface-container-lowest)]"
        >
          <div
            className="h-[3px]"
            style={{ backgroundColor: PHASE_ACCENTS[col.name] }}
          />
          <div className="flex flex-1 flex-col p-4">
            <div className="eyebrow text-[color:var(--color-primary)]">
              {col.name}
            </div>
            <div className="mt-1 text-[11px] text-[color:var(--color-on-surface-variant)]">
              Days {col.days}
            </div>
            {col.headline && (
              <div className="mt-3 font-display text-[14px] font-medium leading-tight text-[color:var(--color-on-surface)]">
                {col.headline}
              </div>
            )}
            <div className="mt-3 text-[12px] leading-relaxed text-[color:var(--color-on-surface)]">
              {col.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-baseline justify-between gap-2 py-0.5"
                >
                  <span>{item.label}</span>
                  {item.meta && (
                    <span className="font-mono text-[color:var(--color-on-surface-variant)] tracking-tight">
                      {item.meta}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
