import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/site";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Blog — Cycle syncing, productivity, and what the research actually says",
  description:
    "Honest, science-grounded posts on cycle syncing, the four phases, and how to plan your week around your biology. No wellness woo, no prescriptions.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — Lumen",
    description:
      "Honest, science-grounded posts on cycle syncing, the four phases, and how to plan your week around your biology.",
    url: "/blog",
    type: "website",
  },
};

export default function BlogIndex() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Lumen", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />

      <header className="mb-12">
        <span className="eyebrow text-[color:var(--color-primary)] tracking-[0.2em]">
          Blog
        </span>
        <h1 className="mt-4 font-display text-[40px] sm:text-[56px] leading-[1.05] tracking-[-0.02em] text-[color:var(--color-primary)]">
          Cycle syncing, honestly.
        </h1>
        <p className="mt-6 font-display text-[20px] leading-[1.4] text-[color:var(--color-on-surface-variant)]">
          Science-grounded posts on the four phases, what the research supports,
          and how to plan a week around your biology — without the wellness
          marketing.
        </p>
      </header>

      <div className="hairline-b mb-12" />

      <ul className="space-y-12">
        {BLOG_POSTS.map((post) => (
          <li key={post.slug} className="hairline-b last:border-0 pb-12 last:pb-0">
            <article>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-on-surface-variant)]">
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <h2 className="mt-3 font-display text-[24px] sm:text-[28px] font-medium leading-tight">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-[color:var(--color-primary)] transition-opacity hover:opacity-70"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 text-[16px] leading-relaxed text-[color:var(--color-on-surface)]">
                {post.description}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-primary)] transition-opacity hover:opacity-70"
              >
                Read post →
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}
