import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-6 py-8 sm:px-12">
      <header className="hairline-b flex flex-wrap items-center justify-between gap-3 pb-4">
        <Link
          href="/admin"
          className="font-display text-[20px] italic text-[color:var(--color-primary)]"
        >
          lumen / admin
        </Link>
        <nav className="flex flex-wrap items-center gap-4">
          <NavLink href="/admin">Threads</NavLink>
          <NavLink href="/admin/giveback">Giveback</NavLink>
          <NavLink href="/admin/revisit">Revisit</NavLink>
          <NavLink href="/admin/mentions">Mentions</NavLink>
          <NavLink href="/admin/metrics">Metrics</NavLink>
          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="text-[12px] uppercase tracking-[0.16em] text-[color:var(--color-on-surface-variant)] hover:text-[color:var(--color-primary)]"
            >
              Sign out
            </button>
          </form>
        </nav>
      </header>
      {children}
    </div>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-[12px] uppercase tracking-[0.16em] text-[color:var(--color-on-surface-variant)] hover:text-[color:var(--color-primary)]"
    >
      {children}
    </Link>
  );
}
