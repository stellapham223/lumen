# Blog audit playbook

Concrete patterns extracted from auditing the first three Lumen blog posts:

1. `/blog/what-is-cycle-syncing` (commits `9045b3b`, `649a75d`)
2. `/blog/best-cycle-syncing-app` (commits `ede88b8`, `d9a751c`)
3. `/blog/cycle-syncing-chart` (commit `2434124`)

Use this when auditing any future blog post. Each rule has a hard trigger so you don't have to re-decide.

---

## 1. Opener: convert the bold paragraph to a Quick takeaway aside

**Trigger:** the first paragraph after the H1 is wrapped in `**...**` (a bolded summary).

**Action:** replace it with this block:

```mdx
<aside className="my-8 hairline bg-[color:var(--color-surface-container-lowest)] p-6 sm:p-8">
  <div className="eyebrow text-[color:var(--color-primary)] mb-3">Quick takeaway</div>
  <p className="m-0 text-[16px] leading-relaxed text-[color:var(--color-on-surface)]">
    {/* original opener text, plain (no **bold**) */}
  </p>
</aside>
```

**Why:** the bold paragraph functions as a TL;DR; the aside makes that role visible. Used on all three audited posts.

---

## 2. Em dashes: replace every one

**Trigger:** any `—` (U+2014) anywhere in the file. En dashes (`–`) in number ranges like `1–5` are correct typography — leave alone.

**Action:** replace by reading the sentence:
- Paired em dashes (parenthetical) → parentheses or commas (e.g. `inputs — A, B, C — and tells you` → `inputs (A, B, C) and tells you`)
- Single em dash (aside or emphasis) → comma, semicolon, colon, or period
- Sub-headers like `**Phase — Mode**` → restructure (in cycle-syncing-chart these were absorbed into `<PhaseScheduleCard>` `mode` prop)

Covers MDX body, `metadata` exports, OpenGraph descriptions, and `FaqJsonLd` `answer` strings.

**Why:** site-wide voice rule (see `~/.claude/.../memory/feedback_no_em_dash.md`).

---

## 3. Pipe tables: must be rendered as `<table>`, not text

**Trigger:** the file contains `| col | col |` markdown table syntax.

**Action:** verify two things are in place:

1. `next.config.ts` has `remark-gfm` wired in:
   ```ts
   const withMDX = createMDX({
     extension: /\.mdx?$/,
     options: { remarkPlugins: [["remark-gfm", {}]] },
   });
   ```
   String-form (`["remark-gfm", {}]`) is required because Turbopack runs the MDX pipeline through Rust and JS functions can't cross the boundary. Already installed (`remark-gfm@4`); don't strip.

2. `mdx-components.tsx` has table mappings (already added). All blog posts inherit this.

**Why:** without `remark-gfm`, GFM tables fall through as plain text — the `mdx-components.tsx` table styles never get applied because no `<table>` element is generated. Discovered on `/blog/best-cycle-syncing-app`.

---

## 4. "By phase" sections → `<PhaseGrid>`

**Trigger:** a section title or content that breaks information into the four phases (Menstrual, Follicular, Ovulatory, Luteal).

**Action:** after the prose paragraphs, drop in:

```mdx
<PhaseGrid
  columns={[
    { name: "Menstrual",  days: "1–5",  headline: "...", items: [{ label, meta }, ...] },
    { name: "Follicular", days: "6–13", headline: "...", items: [...] },
    { name: "Ovulatory",  days: "14–16", headline: "...", items: [...] },
    { name: "Luteal",     days: "17–28", headline: "...", items: [...] },
  ]}
/>
```

`meta` is a short trailing string rendered in monospace. Use these conventions:
- Intensity: block characters `▁ ▂ ▄ ▆ █` (low to high)
- Direction: `↑ ↓ ↑→↓ →`
- Status: `★` (priority), `✓` (good), `⚠` (caution)

Use it for: hormones, energy/mood, workouts, food/supplementation, anything that decomposes neatly into 4 phase columns. Used 4 times on `/blog/cycle-syncing-chart`.

**Component:** `components/PhaseGrid.tsx`. Phase accent colors are defined there; don't duplicate.

---

## 5. Schedule sections → `<PhaseScheduleCard>`

**Trigger:** a phase section that pairs "do this" with "avoid this" (e.g., productivity scheduling).

**Action:** one card per phase:

```mdx
<PhaseScheduleCard
  phase="Menstrual" days="1–5" mode="Reflect"
  best={[
    { icon: "edit_note", label: "Journaling and retrospectives" },
    ...
  ]}
  avoid={[
    { icon: "campaign", label: "High-pressure presentations" },
    ...
  ]}
/>
```

- `mode` is the one-word phase verb (Reflect / Build / Connect / Finish).
- `icon` is a Material Symbols name. Material Symbols Outlined is loaded site-wide via `app/layout.tsx` — pick from [fonts.google.com/icons](https://fonts.google.com/icons).
- For Luteal where the original prose splits into early/mid/late, consolidate into one card and tag items `(early)` / `(late)` in the label.

**Component:** `components/PhaseScheduleCard.tsx`.

---

## 6. Images: source, format, and citation

### 6a. Diagrams (cycle curves, phase relationships)

**Trigger:** the section needs a chart showing data — hormone curves, energy across the cycle, etc.

**Action:** write inline SVG as a static React component in `components/`. Don't ship a PNG.

Reference: `components/CyclePhasesIllustration.tsx` (estrogen + progesterone across 28 days, 4 phase bands, used on `/blog/what-is-cycle-syncing`).

**Why:** sharper at all DPIs, smaller file, alt-text indexed by Google, version-controlled with the content.

### 6b. App screenshots / book covers / external assets

**Trigger:** the section references a real-world product or artifact (an app's UI, a book, a person).

**Action — capture pipeline (chrome-devtools-mcp):**

```text
1. mcp__chrome-devtools__new_page  (URL)
2. resize_page  width=1440 height=900
3. wait_for  text=["Brand keyword"]
4. click the "Accept all" / "Got it" cookie button   (skip if none)
5. take_screenshot  filePath=/public/blog/<slug>/<asset>.png
```

**Action — compression:**

```bash
cd public/blog/<slug>
for f in *.png; do
  base="${f%.png}"
  sips -Z 1600 -s format jpeg -s formatOptions 80 "$f" --out "${base}.jpg" >/dev/null
  rm "$f"
done
```

Hard threshold: any single image > 500 KB is wrong — compress. Target ~150 KB per JPEG at 1600px wide, q80.

**Action — MDX figure:**

```mdx
<figure className="my-8">
  <a href="https://app.example.com/" target="_blank" rel="noopener noreferrer" className="block hairline overflow-hidden">
    <img
      src="/blog/<slug>/<asset>.jpg"
      alt="..."
      width="1600" height="766"
      className="block w-full h-auto"
    />
  </a>
  <figcaption className="mt-3 text-center text-[13px] italic text-[color:var(--color-on-surface-variant)]">
    {/* Subject. */} Source: <a href="...">domain.com</a>, captured YYYY-MM-DD.
  </figcaption>
</figure>
```

Always include: source link, capture date. Always set explicit `width` + `height` for CLS.

**Image asset paths:** `public/blog/<slug>/<asset>.{jpg,svg}` — one folder per blog slug, no nesting.

**Book cover sourcing:** Open Library covers (`covers.openlibrary.org/b/isbn/<isbn>-L.jpg`) are reliable, decent-resolution, and unambiguous to attribute. Used for the `WomanCode` cover.

---

## 7. Fact-check before shipping

**Trigger:** the post mentions a specific person, founding date, statistic, app feature, or product price.

**Action:** verify against the current source (their homepage, About page, or an editorial review) before committing. Past catches:
- "28 by Brigitte Brouillette" was wrong; co-founder is Brittany Hugoboom (28.co/about, Grazia coverage).

**Why:** factual errors are cheap to fix at audit time, expensive to fix after the post ranks.

---

## 8. Bold the thesis sentence

**Trigger:** a body paragraph contains a single sentence that captures the actionable insight.

**Action:** wrap it in `**...**`.

Example from `/blog/what-is-cycle-syncing`: the line beginning *instead of pretending every day is the same...* — a reader skimming should see this without reading the surrounding setup.

Use sparingly: at most one bolded sentence per long paragraph, and not in every section.

---

## 9. Verify before commit

**Trigger:** any change that adds a new component, MDX feature, or config plugin.

**Action:** run `bun run build` (not just typecheck). Builds catch MDX/JSX errors that `tsc` misses (e.g., a missing import, an invalid attribute name like `class` instead of `className`).

Hard threshold: never push a commit without a passing build when MDX or new components are involved.

---

## 10. Commit + push pattern

- Title under ~70 chars, scoped to the blog slug. Format: `Audit /blog/<slug>: <three-word change summary>`
- Body is a bulleted list of every concrete change (not "improved formatting" — say which formatting and why).
- Run `git push origin main` after `git commit`. Vercel deploys from `main` automatically.

Reference past commits: `9045b3b`, `649a75d`, `ede88b8`, `d9a751c`, `2434124`.

---

## When to update this file

Update when an audit reveals a pattern used in **two or more** blog posts. One-off fixes belong in the commit, not here. The point of this file is to stop re-deriving the same decisions on every audit.
