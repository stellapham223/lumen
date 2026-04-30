# Lumen Roadmap (Path C — Hybrid Evolution)

> Product name: **Lumen** (chosen 2026-04-28). Folder still named `cycle-flow` (working name); domain decided later per Sprint 4.
> Working doc. Right-sized for current scope (content business now → product later).
> Heavy strategy docs archived in `docs/reference/` — reference only, not working plans.

---

## What this is, right now

Free SEO-discoverable cycle productivity calculator. **Content business model**: ads + affiliate as Phase 1, evolve to product depth as audience earns it.

**Not** a founder-narrative SaaS launch. Not a wellness app. Not a community.

**Time budget**: 6-12h/week max, with kill switch (HR rest >105 / sleep <7h three days = pause).

**Strategic goal**: Contribute to housing fund 2028. Cross-leverage with Phương's CPO/CEO career path. Optional Phase 4 if Year 2 traffic justifies.

---

## Phase 1 — Content Business (Months 0-6)

**Goal**: Ship MVP, drive SEO traffic, build email list, earn first ad revenue.

### Activities (6-8h/week)
- Sprint 1 ✅ MVP shipped
- **Sprint 1.5: Viability gate** (research-only, ~4h, before Sprint 2 — see detail below)
- Sprint 2 ✅: localStorage persistence, SEO + AEO foundation (metadata, sitemap, robots, JSON-LD, llms.txt, AI bot allowlist, Microsoft Clarity heatmaps + session replays — free)
- Sprint 3 Phase 3.0 ✅: Keyword research via Ahrefs free (skipped 160k VND Google Ads deposit). Audience-mismatch insight logged in [docs/keyword_research_2026_04.md](docs/keyword_research_2026_04.md)
- Sprint 3 Phase 3.1 ✅: 5 MDX SEO test pages (Test E setup) — 2026-04-28. Measure rankings at week 3
- Sprint 3 Phase 3.1.5: AI Overview optimization on existing 5 posts (~2h, see detail below)
- Sprint 3 Phase 3.2: Tiered programmatic content (~55-60h spread 4-6 months — see detail). Gated on Test E PASS
- Sprint 4: Domain + minimal brand identity (functional, science-aesthetic) + email capture (Buttondown $9/mo)
- Sprint 5: Apply Ezoic (5k pageviews threshold), Reddit value-first launch, **tier-2 backlink outreach only** (femtech blogs, productivity micro-publications). Tier-1 publications (Healthline, NYT class) defer to Phase 4

### Sprint 1.5 detail — pre-investment viability gate

Research-only, ~4h total. ALL of A+B+C must pass before Sprint 2 invests dev time. Cheapest possible kill point.

**Test A — Search demand** (1h)
Sum monthly search volume across 30 target keywords (Google Keyword Planner free / Ubersuggest free): "cycle syncing schedule", "luteal phase work", "follicular phase planning", "cycle productivity calculator", etc.
- PASS: ≥30k/month total → Phase 1 exit threshold (10k pageviews) reachable
- FAIL: <10k → kill, niche too narrow

**Test B — Affiliate ecosystem** (2-3h)
List femtech/wellness affiliate programs with commission ≥5%, cookie ≥30 days. Categories: wearables (Oura, Whoop), cycle tracking accessories, books/courses, supplements (only if comfortable promoting).
- PASS: ≥5 programs identified
- FAIL: <3 → ad-only ceiling ~$50-100/mo, reconsider 6h/week × 6 months commitment

**Test C — Ad CPM ceiling math** (30min)
Wellness niche CPM $3-8. Phase 1 exit threshold $100/mo = needs ~20k pageviews × $5 CPM. Validate math holds even at best case.
- PASS: math justifies time investment vs alternative use of 6h/week
- FAIL: ceiling doesn't justify → kill or pivot to higher-CPM niche

Tests D-F run as natural by-products of Sprint 2-3:
- D: Reddit value-first post → 50+ upvote signal niche is active
- E: 5 SEO test pages → ≥1 in top 30 after 3 weeks (validates SEO viability before scaling to 120 programmatic pages)
- F: Email capture rate ≥3% on first 100 visitors

### Sprint 1.5 decision gate
- A+B+C all PASS → Sprint 2 GO
- A or C FAIL → kill or pivot niche (do NOT proceed to Sprint 2)
- B FAIL only → proceed but flag ad-only ceiling, revisit at Sprint 5

**Run 2026-04-28: A+B+C all PASS → Sprint 2 GO.** Full results in [docs/SPRINT_1_5_RESULTS.md](docs/SPRINT_1_5_RESULTS.md). Caveats logged: (1) verify top-30 keyword volumes in Google Keyword Planner before Sprint 3 (~30min); (2) apply to Flo + Natural Cycles + Oura affiliate programs early; (3) wellness-niche RPM may land at $5-7 (low end), so Phase 1 may need 15-20k pageviews not 10k for $100/mo — monitor and adjust.

### Sprint 3 detail — programmatic content tiers

Full research synthesis (calculator/tool SEO patterns from OmniCalculator, Calculator.net, Wise, Zapier) in [docs/SEO_PLAYBOOK_FROM_CALCULATOR_TOOLS.md](docs/SEO_PLAYBOOK_FROM_CALCULATOR_TOOLS.md).

**Phase 3.1.5 — AI Overview quick win** (~2h, can run during Test E measurement period)
Add 40-60 word direct answer paragraph under H1 of each existing blog post. AI Overviews appear on 58% of 2026 queries; bolded answer paragraph is what Google extracts.

**Phase 3.2 — Tiered scaling, gated on Test E PASS** (~55-60h, 4-6 months)
- **Tier 1** (~12h): 5 calculator-intent pages — `/calculator/[cycle-phase|luteal-phase|follicular-phase|ovulation|period-prediction]`. Direct compete with Calculator.net + WebMD on tool intent.
- **Tier 2** (~12h): 4 phase deep-dives, 2500-3500w each — `/menstrual-phase`, `/follicular-phase`, `/ovulatory-phase`, `/luteal-phase`.
- *Gate*: ship Tier 1+2, measure 4 weeks. Only proceed if at least 3/9 pages reach top 30.
- **Tier 3** (~8h): 28 cycle-day pages programmatic — `/cycle-day/[N]` for N=1..28.
- **Tier 4** (~12h): 40 phase × task-type matrix pages — `/[phase]/[task-type]`.
- **Tier 5** (~20h): 10 cornerstone articles, 3000-5000w each. Earn backlinks.
- **Phase 3.2.5** (~8h + ongoing): Embed widget for calculator + outreach. Single highest-leverage backlink play (OmniCalc's 29k backlinks largely via this mechanic).

### Always-on (across all sprints)
- Affiliate links in articles (low-friction, embed disclosure)
- Email list build (lead magnet PDF + monthly digest)
- Backlink outreach (often skipped, critical)

### Exit → Phase 2 (ALL must hold)
- 10k organic pageviews/month sustained 2 consecutive months
- 500+ email subscribers
- Ad revenue ≥$100/month
- Average session duration ≥1:30
- Phương still has bandwidth (no burnout signal)

### Kill criteria (Month 6 checkpoint)
- < 1000 pageviews/month after 6 months → kill or pivot niche
- HR rest >105 sustained 3 days → pause regardless of metrics

---

## Phase 2 — Depth-Add (Months 7-15)

**Goal**: Convert content traffic → habitual users. Begin product depth carefully.

### Activities (8-10h/week)
- Cycle log (last 6 cycles, client-side only — privacy-preserved)
- Email digest "your week ahead" (habit formation)
- Brand identity sprint (Month 9-12 — when audience earned it)
- 20+ more programmatic pages
- 5+ more cornerstone articles
- Newsletter sponsorship (when list >2k)
- Apply AdSense (after Ezoic 6 months)

### Exit → Phase 3 (ALL)
- 30-50k organic pageviews/month
- 3-5k email subscribers
- Revenue $500-1000/month sustained 3 months
- Returning user rate ≥30%
- Search Console position improving (avg <15)

### Harvest criteria
- Revenue plateaued <$300/mo for 6 months → harvest mode (run, don't invest)
- Game BU pitch accelerates → pause Phase 2, return after pitch concludes

---

## Phase 3 — Product Depth (Months 16-24)

**Goal**: Move from content site → real product with optional accounts.

⚠️ **Critical**: Adding accounts breaks privacy USP. Free anonymous tool stays forever. Accounts are OPT-IN, not required.

### Activities (10-12h/week)
- PWA (Progressive Web App) — mobile install without App Store fees
- User accounts (optional, NextAuth + Google/email)
- Server-side cycle history (Postgres + Prisma — Phương already has stack from Toán Tiểu Học)
- Symptom logging + correlation engine
- Predictive next-cycle insights (statistics, not ML yet)
- Calendar export (.ics) — quick win
- Premium tier launch ($5-7/month, advanced features only)

### Exit → Phase 4 (ALL)
- 80k+ pageviews/month
- 1k+ active accounts
- 100+ paying users (if premium launched)
- Revenue $1500-3000/month
- Retention metrics validate depth investment

### Kill criteria
- < 5% conversion to accounts → revert to free-only mode
- Premium <50 paying users after 6 months → kill premium tier

---

## Phase 4 — Ecosystem (Year 2-3+)

**Goal**: Multi-tool network + premium expansion + brand authority.

Loose plan, depends on Phase 1-3 results:

- Tool #2 (cycle-synced workout planner) → cross-promote (audience demand confirmed in Sprint 1.5: "cycle syncing workouts" >1000 vol Easy KD)
- Tool #3 (e.g., cycle-aware meal planner)
- Native mobile app — only if revenue >$5k/mo justifies
- **Tier-1 publication outreach** (Healthline, NYT class) — gated on Lumen having 5+ ranked pages with measurable traffic. Outreach to authority publications when site has 0 traffic = ~95% fail rate
- **Embed widget scaling** — full widget distribution program. Started Phase 3.2.5; mature here
- Big affiliate partnerships (femtech, supplements, books)
- Community / paid newsletter (if audience demands)
- Authority content (podcasts, guest posts, possibly book)
- Optional B2B angle

---

## Cost structure

| Cost | Monthly | Annual |
|---|---|---|
| Vercel hosting | $0 (free tier) | $0 |
| Domain (from Sprint 4) | $1 | $12 |
| Analytics (Microsoft Clarity + Vercel/GA4 free) | $0 | $0 |
| Buttondown email | $9 | $108 |
| Postgres (from Phase 3) | $0-20 | $0-240 |
| Misc tools | $5 | $60 |
| **Phase 1 total** | **$15** | **~$180** |
| **Phase 3 total** | **~$36** | **~$432** |

---

## INTJ traps to avoid

1. **"Đủ traffic" never feels enough** → Use HARD numeric thresholds above. When hit → activate next phase regardless of perfectionism
2. **Feature creep before audience earns it** → Don't build for hypothetical users. Each phase has minimum traffic threshold
3. **Brand sprint too early** → Wait until Month 9-12. Audience must exist for brand voice to match scale
4. **Founder narrative theater** → Right now USP is utility-first, not founder-story-led. Save authentic founder voice for Phase 2-3 when product depth justifies it
5. **Trying to rank head terms early** → Long-tail first. Don't target "cycle syncing" head term in Phase 1. Head terms come via topical authority compounding — usually Phase 2-3 minimum.
6. **Programmatic blind at scale** → Don't ship 120 thin pages with variable substitution only. Each programmatic page needs ≥1 unique element (data, sample, FAQ, formula). Google's helpful-content updates penalize the rest.

---

## Key principles

1. **Match strategy depth to product depth** — don't write SaaS PRDs for calculators
2. **Privacy-first stays forever** — opt-in accounts, never required
3. **Email list is the bridge** — between phases, owned channel, traffic recapture
4. **Affiliate is always-on** — Phase 1.5, not Phase 4
5. **PWA before native app** — 5x cheaper, matches scope
6. **Hard exit criteria** — kill switches per phase prevent sunk-cost trap
7. **AI Overview optimization mandatory for new content** — every blog post and programmatic page leads with a 40-60 word direct answer paragraph under H1. AI Overviews appear on 58% of 2026 queries; this is the citation path. Non-negotiable from Sprint 3 forward.
8. **Embed widget = highest-leverage backlink play** — when Phase 3.2.5 ships, prioritize widget distribution over manual link outreach until 50+ embeds exist.

---

## Companion docs

- [docs/SPRINT_1_5_RESULTS.md](docs/SPRINT_1_5_RESULTS.md) — Sprint 1.5 viability gate results (Tests A+B+C all PASS)
- [docs/keyword_research_2026_04.md](docs/keyword_research_2026_04.md) — Phase 3.0 keyword research + audience-mismatch insight
- [docs/SEO_PLAYBOOK_FROM_CALCULATOR_TOOLS.md](docs/SEO_PLAYBOOK_FROM_CALCULATOR_TOOLS.md) — calculator/tool SEO patterns + Phase 3.2 tier architecture
- `docs/reference/PRD - full product vision.md` — full PRD if/when scaling to Phase 3 product
- `docs/reference/Market Research & Strategy.md` — frameworks (TAM/SAM/SOM, Blue Ocean, etc.) if/when Phương wants to revisit strategic positioning
- `app/`, `lib/`, `components/` — current MVP code (Sprint 1+2+3.1)

---

## Next concrete action

**Sprint 1.5 ✅** (2026-04-28) — A+B+C all PASS. [Results](docs/SPRINT_1_5_RESULTS.md).
**Sprint 2 ✅** (2026-04-28) — SEO + AEO foundation shipped.
**Sprint 3 Phase 3.0 ✅** (2026-04-28) — Keyword research via Ahrefs free. [Audience-mismatch insight](docs/keyword_research_2026_04.md).
**Sprint 3 Phase 3.1 ✅** (2026-04-28) — 5 MDX SEO test pages shipped. Test E measurement window: 2026-05-19 (3 weeks).

**Phase 3.1.5 (~2h, can ship now)**: AI Overview optimization on existing 5 posts. Add 40-60 word direct answer paragraph under each H1.

**Concurrent (3-week Test E window)**:
1. Manual incognito ranking check weekly (5 keywords × ~5min/week)
2. Apply Flo + Natural Cycles + Oura affiliate programs (Sprint 1.5 follow-up, ~30min total)
3. Optional: setup Search Console for vercel.app subdomain to measure Test E precisely (or skip until Sprint 4 domain bought)

**At week 3 (2026-05-19)**: measure Test E. ≥1 page in top 30 → Phase 3.2 GO. Else debug or kill.
