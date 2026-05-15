import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

// Map markdown elements to Lumen's typographic system so MDX content matches the look of
// /methodology, /privacy, /terms (display font for headings, color tokens, hairline rules).
const components: MDXComponents = {
  h1: ({ children, id }) => (
    <h1 id={id} className="mt-0 font-display text-[32px] leading-[1.08] tracking-[-0.02em] text-[color:var(--color-primary)] sm:text-[44px] sm:leading-[1.05] lg:text-[56px]">
      {children}
    </h1>
  ),
  h2: ({ children, id }) => (
    <h2 id={id} className="mt-10 font-display text-[22px] sm:text-[28px] sm:mt-12 font-medium text-[color:var(--color-primary)] scroll-mt-20">
      {children}
    </h2>
  ),
  h3: ({ children, id }) => (
    <h3 id={id} className="mt-6 sm:mt-8 font-display text-[17px] sm:text-[20px] font-medium text-[color:var(--color-primary)] scroll-mt-20">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mt-4 text-[15px] sm:text-[16px] leading-relaxed text-[color:var(--color-on-surface)]">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="mt-4 space-y-2 list-disc pl-5 sm:pl-6 text-[15px] sm:text-[16px] leading-relaxed text-[color:var(--color-on-surface)]">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-4 space-y-2 list-decimal pl-5 sm:pl-6 text-[15px] sm:text-[16px] leading-relaxed text-[color:var(--color-on-surface)]">
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
    <blockquote className="mt-6 border-l-2 border-[color:var(--color-primary)] pl-4 italic text-[15px] sm:text-[16px] text-[color:var(--color-on-surface-variant)]">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-8 sm:my-10 border-0 border-t border-[color:var(--color-outline-variant)]" />,
  code: ({ children }) => (
    <code className="rounded bg-[color:var(--color-surface-container)] px-1.5 py-0.5 font-mono text-[14px]">
      {children}
    </code>
  ),
  table: ({ children }) => (
    <div className="mt-6 w-[calc(100%+2rem)] -mx-4 sm:w-[calc(100%+3rem)] sm:-mx-6 lg:w-full lg:mx-0 overflow-x-auto overscroll-x-contain touch-pan-x">
      <table className="w-full min-w-[560px] border-collapse text-[13px] sm:text-[14px] text-[color:var(--color-on-surface)]">
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
    <th className="px-2 sm:px-3 py-2.5 sm:py-3 text-left font-display text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.1em] sm:tracking-[0.12em] text-[color:var(--color-primary)] align-bottom">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-2 sm:px-3 py-2.5 sm:py-3 align-top leading-relaxed">{children}</td>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
