import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

// Map markdown elements to Lumen's typographic system so MDX content matches the look of
// /methodology, /privacy, /terms (display font for headings, color tokens, hairline rules).
const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="mt-0 font-display text-[40px] sm:text-[56px] leading-[1.05] tracking-[-0.02em] text-[color:var(--color-primary)]">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-12 font-display text-[24px] sm:text-[28px] font-medium text-[color:var(--color-primary)]">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 font-display text-[18px] sm:text-[20px] font-medium text-[color:var(--color-primary)]">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mt-4 text-[16px] leading-relaxed text-[color:var(--color-on-surface)]">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="mt-4 space-y-2 list-disc pl-6 text-[16px] leading-relaxed text-[color:var(--color-on-surface)]">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-4 space-y-2 list-decimal pl-6 text-[16px] leading-relaxed text-[color:var(--color-on-surface)]">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  a: ({ href, children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const className =
      "text-[color:var(--color-primary)] underline underline-offset-2 hover:opacity-70";
    if (href && href.startsWith("/")) {
      return (
        <Link href={href} className={className}>
          {children as ReactNode}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...rest}
      >
        {children}
      </a>
    );
  },
  strong: ({ children }) => (
    <strong className="font-semibold text-[color:var(--color-on-surface)]">
      {children}
    </strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  blockquote: ({ children }) => (
    <blockquote className="mt-6 border-l-2 border-[color:var(--color-primary)] pl-4 italic text-[color:var(--color-on-surface-variant)]">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-10 border-0 border-t border-[color:var(--color-outline-variant)]" />,
  code: ({ children }) => (
    <code className="rounded bg-[color:var(--color-surface-container)] px-1.5 py-0.5 font-mono text-[14px]">
      {children}
    </code>
  ),
  table: ({ children }) => (
    <div className="mt-6 -mx-6 sm:mx-0 overflow-x-auto">
      <table className="w-full border-collapse text-[14px] text-[color:var(--color-on-surface)]">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="border-b border-[color:var(--color-outline-variant)]">
      {children}
    </thead>
  ),
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => (
    <tr className="border-b border-[color:var(--color-outline-variant)] last:border-b-0">
      {children}
    </tr>
  ),
  th: ({ children }) => (
    <th className="px-3 py-3 text-left font-display text-[12px] font-semibold uppercase tracking-[0.12em] text-[color:var(--color-primary)] align-bottom">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-3 py-3 align-top leading-relaxed">{children}</td>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
