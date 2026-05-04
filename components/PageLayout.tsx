interface Props {
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}

export function PageLayout({ eyebrow, title, intro, children }: Props) {
  return (
    <main className="mx-auto w-full max-w-[720px] px-4 pt-10 pb-20 sm:px-6 sm:pt-16 sm:pb-24 lg:px-8 lg:pt-24 lg:pb-32">
      <header className="mb-8 animate-fade-up sm:mb-12">
        <span className="eyebrow text-[color:var(--color-primary)] tracking-[0.2em]">
          {eyebrow}
        </span>
        <h1 className="mt-3 font-display text-[32px] leading-[1.08] tracking-[-0.02em] text-[color:var(--color-primary)] sm:mt-4 sm:text-[44px] sm:leading-[1.05] lg:text-[56px]">
          {title}
        </h1>
        {intro && (
          <p className="mt-4 font-display text-[16px] leading-[1.45] text-[color:var(--color-on-surface-variant)] sm:mt-6 sm:text-[20px] sm:leading-[1.4]">
            {intro}
          </p>
        )}
      </header>

      <div className="hairline-b mb-8 sm:mb-12" />

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
      <h2 className="font-display text-[22px] sm:text-[28px] font-medium text-[color:var(--color-primary)]">
        {title}
      </h2>
      <div className="space-y-4 text-[15px] sm:text-[16px] leading-relaxed text-[color:var(--color-on-surface)]">
        {children}
      </div>
    </section>
  );
}
