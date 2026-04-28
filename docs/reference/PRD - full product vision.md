# PRD — Cycle-Flow (working name)

| Field | Value |
|---|---|
| Status | Draft v1 |
| Owner | Phạm Thị Thu Phương |
| Created | 2026-04-28 |
| Last updated | 2026-04-28 |
| Working name | `cycle-flow` (final brand decided Sprint 4) |
| Repo | `/Users/stellapham/Desktop/cycle-flow` |
| Strategic goal | Side income contributor to housing fund 2028 |
| Source artifact | `Brain/Side Income/Niche Research 2026-04.md` |

---

## TL;DR

Free web tool: ambitious women input cycle dates → get phase-aware recommendations on what to schedule today (deep work, meetings, creative, etc.). Monetize via programmatic ads + email list affiliate. Target English-speaking global audience. MVP shipped (Sprint 1), now scaling SEO + content (Sprint 2-5).

**North-star metric**: Monthly organic pageviews. Revenue is a downstream function.

**Year-1 target (conservative)**: 40k pageviews/month → $300-800/month USD ad revenue (~7-20tr VND).

---

## Problem Statement

### User pain
Ambitious women experience predictable cognitive/energetic shifts across their menstrual cycle (estrogen, progesterone fluctuations affecting verbal fluency, focus, social cognition, fatigue). Most ignore this — work the same way every week — and end up either:
- Pushing through low-energy days at high cost (luteal/menstrual)
- Wasting peak windows on admin (ovulatory)

Existing solutions are either:
- **Subscription apps** (Phase, Essence, In Flow Planner, Wild.AI) — paywall + app install friction
- **Articles only** (HelloClue, WellSet, Cycle Synced) — read once, no actionable tool
- **Generic productivity tools** (Cal Newport, Notion templates) — gender-blind, ignore cycle entirely

### Market gap
**No free, SEO-discoverable web tool that gives interactive cycle-aware productivity recommendations.** That's the wedge.

### Strategic alignment
- Cluster: Women's health × Solo founder/INTJ productivity (cross-cluster from research)
- Phương leverage: PMM + INTJ + female + lived experience (4/5 unfair advantages)
- YMYL-safe positioning: productivity/lifestyle, not medical
- Ranks #2 by score (31/37.5) but #1 chosen for sustainability + cross-leverage

---

## Target User

### Primary persona — "Ambitious Anya"
- 26-38, knowledge worker (founder, manager, IC creative, freelancer)
- English-speaking (US, UK, Canada, Australia, EU, India, SEA expat)
- Has heard of "cycle syncing" via TikTok/Instagram/Reddit but skeptical of woo-woo
- Wants science-backed, not pastel-cute
- Already values productivity (uses Notion, time-blocks, reads Cal Newport)
- Pain: feeling guilty for low-energy days, frustrated by inconsistent output

### Anti-persona — who we're NOT for (yet)
- Women trying to conceive (different niche, fertility tracker space — heavy YMYL)
- Women in perimenopause/menopause (different phase model — possibly Phase 2 expansion)
- Casual users who want a basic period tracker (Clue, Flo serve them)
- Men looking for "biohacking" (not our positioning)

---

## Goals & Success Metrics

### Year 1 goals
1. **Organic traffic**: Reach 40k pageviews/month by month 12
2. **Email list**: Build 5,000 subscribers by month 12
3. **Monetization**: $300-800/month ad revenue + affiliate commissions by month 12
4. **Authority signals**: 30+ quality backlinks, average position <10 for 50+ keywords

### Leading indicators (track weekly)
- Pageviews/week
- New users (GA4)
- Average session duration
- Bounce rate
- Search Console: impressions, clicks, average position
- Email signup rate (% of pageviews)

### Lagging indicators (track monthly)
- Ad revenue (Ezoic dashboard)
- Affiliate clicks + commissions
- Domain authority (Ahrefs/Moz)
- Number of pages indexed
- Referring domains

### Mid-checkpoint kill switch (Week 6)
If <100 pageviews/week → pivot or shut down. Don't sunk-cost.

---

## Out of Scope

### Explicit non-goals MVP → Year 1
- Native mobile app (web-first, mobile-responsive sufficient)
- User accounts / auth (privacy-first, no data storage)
- Cycle prediction beyond basic math (no ML, no anomaly detection)
- Pregnancy/fertility tracking (separate YMYL-strict niche)
- Symptom tracking (privacy + YMYL concerns)
- Medication reminders
- Hormone test integration
- B2B / employer benefits angle (Essence App's territory)
- Vietnamese language version (English-first; consider Year 2)
- Community/social features (focus on tool, not platform)

### Why these are out of scope
Each adds complexity that distracts from north-star (organic SEO traffic). Privacy-by-design (no accounts) is itself a feature.

---

## User Journeys

### J1 — First-time discovery (SEO)
1. Anya searches "cycle syncing productivity" (or 50+ similar long-tail queries)
2. Lands on programmatic SEO page like `/cycle-productivity-luteal-deep-work/`
3. Reads phase-specific advice (200-500 words evergreen content)
4. Clicks "calculate your current phase" CTA → main tool
5. Inputs cycle dates → sees today's recommendation
6. Bookmarks site / signs up for email

**Acceptance**: Time-to-value <30 seconds from landing.

### J2 — Returning user (direct)
1. Anya types domain or clicks bookmark
2. Tool auto-loads previous cycle data (localStorage)
3. Sees today's phase + recommendations
4. Optional: views 4-week calendar, cross-references full matrix

**Acceptance**: Page load <1 second. No re-entry of cycle data.

### J3 — Newsletter subscriber
1. Anya signs up via lead magnet ("Monthly cycle-aligned planner PDF")
2. Receives monthly email with personalized tips + new content
3. Email drives 20-30% of returning traffic

**Acceptance**: Welcome email <1 minute after signup. PDF deliverable working.

### J4 — Sharing
1. Anya finds tool useful, shares URL with friend on Slack/WhatsApp
2. Friend clicks, lands on home page (or specific phase page if shared from there)
3. Same first-time experience as J1

**Acceptance**: OpenGraph preview shows compelling image + description.

---

## Functional Requirements

### MVP (Sprint 1) — ✅ DONE 2026-04-28

| ID | Requirement | Status |
|---|---|---|
| F-1.1 | User inputs last period start date | ✅ |
| F-1.2 | User inputs cycle length (21-45 days) | ✅ |
| F-1.3 | User inputs period length (2-10 days) | ✅ |
| F-1.4 | Calculator determines current phase (4-phase model with ovulation = cycleLength - 14) | ✅ |
| F-1.5 | Display current phase with day count + energy tip | ✅ |
| F-1.6 | Display 28-day calendar with phase color-coding | ✅ |
| F-1.7 | Display today's task ranking (10 task types) | ✅ |
| F-1.8 | Display full 10×4 cycle matrix | ✅ |
| F-1.9 | Mobile responsive (320-1440px) | ✅ |
| F-1.10 | Privacy-by-design (client-side only, no server storage) | ✅ |
| F-1.11 | "Not medical advice" disclaimer + research citations | ✅ |

### Sprint 2 — Persistence + SEO Foundation

| ID | Requirement | Acceptance |
|---|---|---|
| F-2.1 | localStorage persistence — auto-load previous cycle data | Returning user sees results immediately, no re-entry |
| F-2.2 | "Edit cycle" updates persisted data | localStorage updated atomically |
| F-2.3 | Per-page metadata (title + description) | Title <60 chars, description <160 chars, unique per page |
| F-2.4 | OpenGraph + Twitter card tags | Preview renders correctly on Slack/Twitter/LinkedIn |
| F-2.5 | sitemap.xml dynamic generation | All routes listed, lastmod accurate |
| F-2.6 | robots.txt | Allow all, sitemap reference |
| F-2.7 | JSON-LD schema (WebApplication, FAQPage, HowTo) | Validates in Google Rich Results Test |
| F-2.8 | Privacy-friendly analytics (Plausible or self-hosted Umami) | Page views tracked, no cookies |

### Sprint 3 — Programmatic SEO Scale

| ID | Requirement | Acceptance |
|---|---|---|
| F-3.1 | URL pattern `/cycle-productivity-[phase]-[task-type]/` | 24 base pages (4 phases × 6 task types) |
| F-3.2 | Each programmatic page: phase summary + task-specific advice + tool widget + internal links | 500-800 words, unique content |
| F-3.3 | URL pattern `/[phase]-phase-[persona]/` | 20 pages (4 phases × 5 personas: founder, manager, IC, freelancer, student) |
| F-3.4 | Internal linking strategy: hub-and-spoke (home + cluster pages) | 5-10 internal links per page |
| F-3.5 | Breadcrumb schema | Validates in Rich Results |
| F-3.6 | Total ≥120 indexed pages | Confirmed via Search Console coverage report |

### Sprint 4 — Brand + Soft Launch

| ID | Requirement | Acceptance |
|---|---|---|
| F-4.1 | Final brand name + visual identity (logo, color, voice) | Approved by Phương |
| F-4.2 | Custom domain purchase + 301 from `*.vercel.app` | All old URLs redirect, no 404s |
| F-4.3 | Email capture (lead magnet PDF) | Signup form on every page, <2s deliverable |
| F-4.4 | Email service integration (Buttondown $9/mo recommended) | Welcome email sent, list synced |
| F-4.5 | LinkedIn + Twitter launch posts | Organic posts from Phương's accounts |
| F-4.6 | Outreach to 10 cycle/productivity bloggers | 3+ backlinks secured |
| F-4.7 | Reddit launch (subtle, value-first) in r/productivity, r/cyclesyncing, r/xxfitness | No bans, positive engagement |

### Sprint 5+ — Iterate + Monetize

| ID | Requirement | Acceptance |
|---|---|---|
| F-5.1 | Apply Ezoic when ≥5k pageviews/month | Approved + integrated |
| F-5.2 | Apply Google AdSense when ≥3 months age + traffic | Approved |
| F-5.3 | Affiliate accounts: cycle apps, productivity courses, supplement brands (non-medical) | At least 5 affiliate partnerships |
| F-5.4 | Add 5+ programmatic page variants based on Search Console data | Iteration cadence: monthly |
| F-5.5 | First newsletter sent | ≥30% open rate, ≥3% CTR |
| F-5.6 | A/B test home page hero (2 variants) | Winner increases tool engagement ≥10% |

---

## Non-Functional Requirements

### Performance
- Lighthouse Performance ≥90 (mobile)
- Core Web Vitals all green: LCP <2.5s, INP <200ms, CLS <0.1
- Time to Interactive <3s on 4G

### Accessibility
- WCAG 2.1 Level AA compliance
- Keyboard navigable
- Screen reader tested
- Color contrast ≥4.5:1 (text on background)
- Form labels properly associated

### Privacy & Security
- No PII stored on server (cycle data is sensitive — period dates)
- All cycle calculation client-side
- localStorage only on user's device
- Privacy policy explicit + GDPR-compliant
- HTTPS only
- No third-party trackers beyond chosen analytics + ad network

### SEO
- All pages server-rendered (Next.js app router)
- Semantic HTML (h1-h3 hierarchy correct)
- Image alt text required
- Canonical URLs
- 301 redirects for any URL changes
- Sitemap auto-updated on deploys

### Browser support
- Chrome, Safari, Firefox, Edge (latest 2 versions)
- iOS Safari 15+, Android Chrome
- Graceful degradation for IE/old browsers (read-only content)

---

## Technical Architecture

### Stack
- **Framework**: Next.js 16 (App Router, RSC where possible)
- **Language**: TypeScript strict
- **Styling**: Tailwind CSS 4
- **Runtime**: Bun
- **Hosting**: Vercel (free tier sufficient until ~100k pageviews/month)
- **Domain**: `*.vercel.app` initially → custom domain Sprint 4
- **Analytics**: Plausible ($9/mo) or Umami self-hosted (free)
- **Email**: Buttondown ($9/mo, simple Markdown-based)
- **Ads**: Ezoic → AdSense after qualification
- **Affiliate**: ShareASale, Amazon Associates, direct partnerships

### Data flow
```
User input → React state (in-memory)
           → calculateCycle() in lib/cycle-calculator.ts
           → CycleStatus object
           → render TodayWidget + PhaseCalendar + TaskRecommendations
           ↓
        localStorage (Sprint 2+)
```

No server, no database. Programmatic SEO pages are statically generated at build time.

### File structure (Sprint 5 target)
```
cycle-flow/
├── app/
│   ├── layout.tsx
│   ├── page.tsx (home + tool)
│   ├── cycle-productivity-[phase]-[task]/
│   │   └── page.tsx (programmatic)
│   ├── [phase]-phase-for-[persona]/
│   │   └── page.tsx (programmatic)
│   ├── about/page.tsx
│   ├── privacy/page.tsx
│   ├── articles/[slug]/page.tsx (cornerstone content MDX)
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── CycleInput.tsx
│   ├── TodayWidget.tsx
│   ├── PhaseCalendar.tsx
│   ├── TaskRecommendations.tsx
│   ├── EmailCapture.tsx (Sprint 4)
│   └── AdSlot.tsx (Sprint 5)
├── lib/
│   ├── cycle-calculator.ts
│   ├── phase-data.ts
│   ├── persona-data.ts (Sprint 3)
│   └── seo.ts (metadata helpers)
├── content/
│   └── articles/*.mdx (Sprint 2-3)
└── public/
```

---

## Content & SEO Requirements

### Content pillars (Sprint 2-3)

**10 cornerstone articles** (1500-2500 words each):
1. The science of cycle syncing — what's real, what's hype
2. The four phases of your cycle — a productivity guide
3. Cycle syncing for founders — when to ship, when to think
4. Why your luteal phase isn't the enemy
5. Ovulatory phase — your social superpower window
6. How to schedule deep work around your cycle
7. Cycle-aware time blocking — beyond Cal Newport
8. The hormonal science of "PMS brain" (and how to use it)
9. Cycle syncing vs. cycle awareness — pick the right one
10. Building a 4-week sprint plan around your cycle

### Programmatic SEO seed list

**Pattern A** (24 pages): `/cycle-productivity-[phase]-[task]/`
- Phases: menstrual, follicular, ovulatory, luteal
- Tasks: deep work, meetings, creative, admin, learning, planning

**Pattern B** (20 pages): `/[phase]-phase-for-[persona]/`
- Phases: menstrual, follicular, ovulatory, luteal
- Personas: founders, managers, individual contributors, freelancers, students

**Pattern C** (24 pages): `/best-time-for-[task]-in-cycle/`
- Tasks: presentations, hard conversations, networking, detail work, learning, etc.

**Pattern D** (16 pages): `/cycle-day-[N]/` (selected high-search days like 1, 7, 14, 21)

Total potential: **~120 base pages** indexed by end of Sprint 3.

### Author bio + E-E-A-T strategy
Phương = "Founder, ambitious woman, ex-PMM. Not a doctor. Sharing science + personal experience."
- Cite primary research (PubMed links)
- Reference experts (Stacy Sims, Lisa Mosconi)
- Optional: "Reviewed by [doctor]" $100-300/article — Sprint 5 if budget allows

---

## Monetization Plan

### Revenue streams (in order of importance)

1. **Programmatic display ads** (Ezoic → AdSense)
   - Target RPM: $5-12 (productivity/health-adjacent, English-speaking countries)
   - Year 1: $300-800/month at 40k pageviews
   - Scaling: linear with traffic

2. **Affiliate commissions**
   - Cycle tracking apps (Wild.AI, Clue Plus, etc.)
   - Productivity courses/books (Cal Newport's stuff, Stacy Sims books)
   - Non-medical supplements (carefully chosen, vitamin/mineral, not pharma)
   - Year 1 estimate: $50-200/month

3. **Email list affiliate** (newsletter)
   - Higher conversion than on-page ads
   - Year 1: $50-150/month at 5k subscribers

4. **Future: Premium PDF guides / paid content** (Year 2+, only if traffic supports)

### Why NOT subscription/freemium
- Defeats SEO discoverability (paywall = no indexing)
- Friction → kills returning user metric
- Existing apps (Phase, Essence) own that space
- Free + ads = scalable, no support burden

### Cost structure
- Hosting: $0 (Vercel free tier)
- Domain: $12/year
- Analytics: $9/month (Plausible) or $0 (Umami self-host)
- Email: $9/month (Buttondown)
- Total: ~$25/month operational cost

**Break-even**: Month 5-6 at conservative trajectory.

---

## Roadmap

| Sprint | Weeks | Goal | Deliverable |
|---|---|---|---|
| **Sprint 1** ✅ | W1-2 | MVP working tool | Calculator + UI + mobile responsive |
| **Sprint 2** | W3-4 | Persistence + SEO foundation | localStorage, metadata, sitemap, schema |
| **Sprint 3** | W5-6 | Programmatic SEO scale | 120 indexed pages, 10 articles |
| **Sprint 4** | W7-8 | Brand + soft launch | Domain, brand identity, email capture, outreach |
| **Sprint 5** | W9-12 | Iterate + monetize | Ads live, first newsletter, A/B tests |
| **Q3 2026** | M4-6 | Compound | 5-15k pageviews/month, $25-200/month |
| **Q4 2026** | M7-9 | Scale | 20-50k pageviews/month, $200-800/month |
| **Q1 2027** | M10-12 | Plateau check | 40-100k pageviews/month, $300-1500/month |

---

## Risks & Mitigations

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| R1 | Google algorithm update tanks traffic | Med | High | Diversify: SEO + email list + LinkedIn + Twitter; don't 100% Google-dependent |
| R2 | YMYL classification stricter than expected | Med | High | Position as productivity/lifestyle, disclaimer prominent, cite peer-reviewed sources, no diagnosis claims |
| R3 | Niche audience too narrow (women + ambitious + cycle-aware) | Low-Med | Med | Expand to sub-personas; SEO long-tail captures broader queries |
| R4 | Time trap (INTJ tendency to over-build) | High | High | 12h/week HARD CAP, weekly time tracking, kill switch on tool #2 until tool #1 hits 10k pageviews |
| R5 | Cycle data privacy breach | Low | High | Client-side only architecture, no server storage, privacy policy explicit, HTTPS |
| R6 | Phương imposter syndrome on women's health authority | Med | Med | "Build in public" framing, cite scientists, personal-experience tone not authoritative |
| R7 | Game BU pitch competes for bandwidth | High | Med | Game BU is Priority #1 absolute; tool only when not cannibalizing |
| R8 | Ad network rejection (low traffic) | Med | Low | Apply Ezoic first (lower threshold), AdSense after qualification |
| R9 | Burnout from compounded stress (cưới + Game BU + tool + main job) | Med | High | HR rest >105 / sleep <7h kill switch; bi-weekly health check |
| R10 | Trend "cycle syncing" peaks and declines | Low-Med | Med | Build evergreen science-based content, not trend-chasing |

---

## Open Questions (to resolve before Sprint 2)

1. **Persistence approach**: localStorage only, or IndexedDB for richer data later? (Recommend: localStorage for Sprint 2; revisit if user accounts ever ship)
2. **Brand voice direction**: more "ambitious feminist founder" or more "neutral science communicator"? (Affects copy, color palette)
3. **Lead magnet PDF**: design in Figma vs. Canva vs. AI-generated? Time budget?
4. **Analytics choice**: Plausible (paid, easy) vs. Umami (free, self-host)?
5. **First content article**: which of the 10 cornerstones to write first? (Recommend: "Four phases of your cycle — a productivity guide" — most evergreen + most SEO valuable)
6. **NDA verification with Avada**: confirmed safe? (Action item before Sprint 4 launch)
7. **Tax structure**: register hộ kinh doanh cá thể before first ad payment, or after? (Talk to /finance-expert)

---

## Appendix

### Key research sources
- Sims, Stacy. *ROAR: How to Match Your Food and Fitness to Your Female Physiology* (2016)
- Mosconi, Lisa. *The Menopause Brain* (2024) — also covers cyclical brain changes
- Sundström-Poromaa, I. (2014). The menstrual cycle influences emotion. *Frontiers in Neuroscience*
- Hampson, E. (2020). A brief guide to the menstrual cycle and oral contraceptive use for researchers in behavioral endocrinology. *Hormones and Behavior*
- ACOG (American College of Obstetricians and Gynecologists) — PMS prevalence, phase definitions

### Cross-references
- `Brain/Side Income/Niche Research 2026-04.md` — niche scoring, top 3 ranking
- `.claude/agent-memory/career-coach/MEMORY.md` — strategic context, side income stack
- `.claude/agent-memory/mental-health/MEMORY.md` — burnout protocol, kill switches
- `Brain/Entrepreneurship/Game BU Roadmap.md` — Priority #1 reference for bandwidth conflict
