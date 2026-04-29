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
      <header className="hairline-b flex items-center justify-between pb-4">
        <Link
          href="/admin"
          className="font-display text-[20px] italic text-[color:var(--color-primary)]"
        >
          lumen / admin
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/admin"
            className="text-[13px] text-[color:var(--color-on-surface-variant)] hover:text-[color:var(--color-primary)]"
          >
            Threads
          </Link>
          <Link
            href="/admin/metrics"
            className="text-[13px] text-[color:var(--color-on-surface-variant)] hover:text-[color:var(--color-primary)]"
          >
            Metrics
          </Link>
          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="text-[13px] text-[color:var(--color-on-surface-variant)] hover:text-[color:var(--color-primary)]"
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
