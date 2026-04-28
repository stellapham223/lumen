import Image from "next/image";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-40 hairline-b bg-[color:var(--color-background)]/85 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 sm:px-12">
        <a href="/" className="flex items-center" aria-label="Lumen — home">
          <Image
            src="/logo-small.png"
            alt="Lumen"
            width={120}
            height={40}
            priority
            className="h-8 w-auto sm:h-9"
          />
        </a>
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-on-surface-variant)]">
          <a
            href="#science"
            className="hidden rounded px-3 py-2 font-semibold transition-colors hover:text-[color:var(--color-primary)] sm:inline-block"
          >
            Science
          </a>
          <a
            href="#methodology"
            className="hidden rounded px-3 py-2 font-semibold transition-colors hover:text-[color:var(--color-primary)] sm:inline-block"
          >
            Methodology
          </a>
        </div>
      </div>
    </nav>
  );
}
