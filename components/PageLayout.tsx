interface Props {
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}

export function PageLayout({ eyebrow, title, intro, children }: Props) {
  return (
    <main className="mx-auto max-w-[720px] px-6 pt-16 pb-24 sm:px-8 sm:pt-24 sm:pb-32">
      <header className="mb-12 animate-fade-up">
        <span className="eyebrow text-[color:var(--color-primary)] tracking-[0.2em]">
          {eyebrow}
        </span>
        <h1 className="mt-4 font-display text-[40px] sm:text-[56px] leading-[1.05] tracking-[-0.02em] text-[color:var(--color-primary)]">
          {title}
        </h1>
        {intro && (
          <p className="mt-6 font-display text-[20px] leading-[1.4] text-[color:var(--color-on-surface-variant)]">
            {intro}
          </p>
        )}
      </header>

      <div className="hairline-b mb-12" />

      <article
        className="prose-editorial space-y-10 animate-fade-up"
        style={{ animationDelay: "100ms" }}
      >
        {children}
      </article>
    </main>
  );
}

export function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      {eyebrow && (
        <span className="eyebrow text-[color:var(--color-on-surface-variant)]">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-[24px] sm:text-[28px] font-medium text-[color:var(--color-primary)]">
        {title}
      </h2>
      <div className="space-y-4 text-[16px] leading-relaxed text-[color:var(--color-on-surface)]">
        {children}
      </div>
    </section>
  );
}
