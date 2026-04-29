import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="hairline-t bg-[color:var(--color-background)] mt-16">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-4 px-6 py-12 sm:px-12">
        <Link href="/" aria-label="Lumen home">
          <Image
            src="/logo-small.png"
            alt="Lumen"
            width={100}
            height={32}
            className="h-7 w-auto opacity-90"
          />
        </Link>

        <nav className="flex flex-wrap justify-center gap-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-on-surface-variant)]">
          <Link
            href="/blog"
            className="transition-colors hover:text-[color:var(--color-primary)]"
          >
            Blog
          </Link>
          <Link
            href="/methodology"
            className="transition-colors hover:text-[color:var(--color-primary)]"
          >
            Methodology
          </Link>
          <Link
            href="/privacy"
            className="transition-colors hover:text-[color:var(--color-primary)]"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="transition-colors hover:text-[color:var(--color-primary)]"
          >
            Terms
          </Link>
        </nav>

        <p className="mt-2 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-on-surface-variant)]">
          © {new Date().getFullYear()} Lumen
        </p>

        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-on-surface-variant)]/70">
          Informational only · Not medical advice · Stacy Sims · Lisa Mosconi · Hampson 2020 · ACOG
        </p>
      </div>
    </footer>
  );
}
