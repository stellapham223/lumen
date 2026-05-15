import { MaterialIcon } from "./MaterialIcon";
import type { Phase } from "@/lib/cycle-calculator";
import { phaseProfiles } from "@/lib/phase-data";
import { phaseEncyclopedia } from "@/lib/phase-encyclopedia";

interface Props {
  phase: Phase;
}

export function PhaseAffiliateShelf({ phase }: Props) {
  const profile = phaseProfiles[phase];
  const enc = phaseEncyclopedia[phase];
  const books = enc.recommendedReading.filter((r) => r.amazonSearch);
  const product = enc.product;

  if (books.length === 0 && !product) return null;

  return (
    <section className="hairline bg-[color:var(--color-surface-container-lowest)] p-4 sm:p-6 lg:p-10">
      <header className="hairline-b pb-4">
        <span className="eyebrow text-[color:var(--color-primary)]">
          Helpful picks
        </span>
        <h3 className="mt-1 font-display text-[20px] sm:text-[24px] font-medium text-[color:var(--color-primary)]">
          For your {profile.name.toLowerCase()} phase
        </h3>
        <p className="mt-1 text-[13px] sm:text-[14px] italic text-[color:var(--color-on-surface-variant)]">
          Editorial picks. Lumen earns a small commission on qualifying Amazon
          purchases, no extra cost to you.
        </p>
      </header>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
        {books.map((book, i) => (
          <a
            key={i}
            href={book.amazonSearch}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="hairline group block p-4 transition-opacity hover:opacity-80 sm:p-5"
          >
            <div className="flex items-start gap-3">
              <span className="text-[color:var(--color-on-surface-variant)] shrink-0 mt-0.5">
                <MaterialIcon name="menu_book" size={18} weight={300} />
              </span>
              <div className="min-w-0">
                <p className="font-display text-[15px] font-medium italic text-[color:var(--color-primary)] underline underline-offset-2">
                  {book.title}
                </p>
                <p className="text-[13px] text-[color:var(--color-on-surface-variant)]">
                  by {book.author}
                </p>
                <p className="mt-1 text-[12px] italic leading-relaxed text-[color:var(--color-on-surface-variant)]/80">
                  {book.note}
                </p>
              </div>
            </div>
          </a>
        ))}

        {product && (
          <a
            href={product.amazonSearch}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="hairline group block p-4 transition-opacity hover:opacity-80 sm:p-5"
          >
            <div className="flex items-start gap-3">
              <span className="text-[color:var(--color-on-surface-variant)] shrink-0 mt-0.5">
                <MaterialIcon name="inventory_2" size={18} weight={300} />
              </span>
              <div className="min-w-0">
                <p className="font-display text-[15px] font-medium text-[color:var(--color-primary)] underline underline-offset-2">
                  {product.name}
                </p>
                <p className="mt-1 text-[12px] leading-relaxed text-[color:var(--color-on-surface-variant)]">
                  {product.description}
                </p>
                {product.caveat && (
                  <p className="mt-2 text-[11px] italic text-[color:var(--color-on-surface-variant)]/70">
                    {product.caveat}
                  </p>
                )}
              </div>
            </div>
          </a>
        )}
      </div>
    </section>
  );
}
