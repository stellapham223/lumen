import Link from "next/link";
import { GLOSSARY_TERMS, type GlossaryTerm } from "@/lib/site";
import { GlossaryShareBar } from "@/components/GlossaryShareBar";

export type TocItem = { id: string; label: string };

type Props = {
  currentSlug: string;
  title: string;
  toc: ReadonlyArray<TocItem>;
};

function pickRelated(currentSlug: string, count = 8): ReadonlyArray<GlossaryTerm> {
  // Only surface Published terms as related links; we cannot link to a 404.
  const pool = GLOSSARY_TERMS.filter(
    (t) => t.status === "Published" && t.slug !== currentSlug,
  );
  const current = GLOSSARY_TERMS.find((t) => t.slug === currentSlug);
  if (!current) return pool.slice(0, count);
  const sameTopic = pool.filter((t) => t.topic === current.topic);
  const sameFunnel = pool.filter(
    (t) => t.topic !== current.topic && t.funnel === current.funnel,
  );
  const others = pool.filter(
    (t) => t.topic !== current.topic && t.funnel !== current.funnel,
  );
  return [...sameTopic, ...sameFunnel, ...others].slice(0, count);
}

export function GlossarySidebar({ currentSlug, title, toc }: Props) {
  const related = pickRelated(currentSlug);
  const path = `/glossary/${currentSlug}`;

  return (
    <aside className="lg:sticky lg:top-20 lg:self-start lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
      {toc.length > 0 ? (
        <section className="mb-8">
          <p className="eyebrow text-[color:var(--color-on-surface-variant)] mb-3">
            What&apos;s inside
          </p>
          <nav>
            <ol className="space-y-2 text-[13px] leading-snug">
              {toc.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-[color:var(--color-on-surface-variant)] hover:text-[color:var(--color-primary)] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </section>
      ) : null}

      <section className="mb-8 hairline-t pt-6">
        <p className="eyebrow text-[color:var(--color-on-surface-variant)] mb-3">
          Related terms
        </p>
        <ul className="flex flex-wrap gap-2">
          {related.map((t) => (
            <li key={t.slug}>
              <Link
                href={`/glossary/${t.slug}`}
                className="inline-block px-3 py-1 rounded-full hairline text-[12px] leading-snug text-[color:var(--color-on-surface-variant)] hover:text-[color:var(--color-primary)] hover:bg-[color:var(--color-surface-container)] transition-colors"
              >
                {t.term}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/glossary"
          className="mt-4 inline-block text-[12px] font-medium text-[color:var(--color-primary)] hover:opacity-70"
        >
          See all glossary entries &rarr;
        </Link>
      </section>

      <GlossaryShareBar title={title} path={path} />
    </aside>
  );
}
