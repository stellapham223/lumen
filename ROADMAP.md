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
- Sprint 2: localStorage persistence, SEO foundation (metadata, sitemap, schema), Plausible analytics
- Sprint 3: 120 programmatic SEO pages + 10 cornerstone articles
- Sprint 4: Domain + minimal brand identity (functional, science-aesthetic) + email capture (Buttondown $9/mo)
- Sprint 5: Apply Ezoic (5k pageviews threshold), Reddit value-first launch, backlink outreach (10-20 quality links)

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

- Tool #2 (cycle-synced workout planner) → cross-promote
- Tool #3 (e.g., cycle-aware meal planner)
- Native mobile app — only if revenue >$5k/mo justifies
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
| Plausible analytics | $9 | $108 |
| Buttondown email | $9 | $108 |
| Postgres (from Phase 3) | $0-20 | $0-240 |
| Misc tools | $5 | $60 |
| **Phase 1 total** | **$24** | **~$288** |
| **Phase 3 total** | **~$45** | **~$540** |

---

## INTJ traps to avoid

1. **"Đủ traffic" never feels enough** → Use HARD numeric thresholds above. When hit → activate next phase regardless of perfectionism
2. **Feature creep before audience earns it** → Don't build for hypothetical users. Each phase has minimum traffic threshold
3. **Brand sprint too early** → Wait until Month 9-12. Audience must exist for brand voice to match scale
4. **Founder narrative theater** → Right now USP is utility-first, not founder-story-led. Save authentic founder voice for Phase 2-3 when product depth justifies it

---

## Key principles

1. **Match strategy depth to product depth** — don't write SaaS PRDs for calculators
2. **Privacy-first stays forever** — opt-in accounts, never required
3. **Email list is the bridge** — between phases, owned channel, traffic recapture
4. **Affiliate is always-on** — Phase 1.5, not Phase 4
5. **PWA before native app** — 5x cheaper, matches scope
6. **Hard exit criteria** — kill switches per phase prevent sunk-cost trap

---

## Companion docs

- `docs/reference/PRD - full product vision.md` — full PRD if/when scaling to Phase 3 product
- `docs/reference/Market Research & Strategy.md` — frameworks (TAM/SAM/SOM, Blue Ocean, etc.) if/when Phương wants to revisit strategic positioning
- `app/`, `lib/`, `components/` — current MVP code (Sprint 1)

---

## Next concrete action

**Sprint 2 kickoff**: localStorage persistence + SEO foundation (metadata, sitemap, schema markup, Plausible setup).

Estimated 1-2 sessions, 6-8h work.
