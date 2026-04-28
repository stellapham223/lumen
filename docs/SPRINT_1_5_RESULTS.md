# Sprint 1.5 Viability Gate — Results

**Run date**: 2026-04-28
**Total time**: ~1h research (vs 4h budget — good)

---

## Test A — Search demand → **PASS (with caveats)**

Free-tool gating problem: Google Keyword Planner needs Ads login, Wordstream/Ahrefs blocked behind CAPTCHA. Used Google Trends (relative interest, not absolute volume) + public SEO-blog estimates.

### Google Trends 5-year US data

| Keyword | 5y avg (0-100 scale) | Trend direction |
|---|---|---|
| menstrual cycle | 54 | flat-up (medical evergreen) |
| luteal phase | 29 | UP (~3x since 2021) |
| ovulation calculator | 21 | flat |
| **cycle syncing** | (last 8wk avg 29 vs 2021 avg 6) | **UP — 5x growth** |
| follicular phase | 10 | UP (~2.5x since 2021) |

### Interpretation
- "cycle syncing" is the lifestyle/positioning term — it's growing fast (5x in 5 years), peaked at 100 at some point in the period, currently sitting mid-range
- Phase-specific terms ("luteal phase", "follicular phase") are also climbing — audience is learning the vocabulary
- "menstrual cycle" + "ovulation calculator" are evergreen high-volume but heavily competed (Healthline, Mayo Clinic, Flo, WebMD)

### Estimated absolute volumes (rough, verify in Keyword Planner)
Using public SEO data points as anchors:
- menstrual cycle: ~200-300k/mo US
- ovulation calculator: ~200-400k/mo US (transactional, dominated by pregnancy apps)
- luteal phase: ~50-80k/mo US
- cycle syncing: ~20-50k/mo US (and rising)
- follicular phase: ~20-40k/mo US

**Total addressable across top 30 keywords: easily 500k+/mo US** — Phase 1's 10k pageview target is <2% market share, very reachable from SEO content angle.

### Verdict: PASS
- Direction is UP, not decay → trend wind at back, not in face
- Total addressable >> 30k/mo threshold
- Lifestyle ("cycle syncing") + clinical ("luteal phase") double-vocabulary gives content angle flexibility

### Caveats / risk flags
- **Gartner predicts 25% search engine traffic drop by 2026 from AI chatbots** — applies to ALL content businesses, not unique to this niche. Mitigation: focus on long-tail informational queries that AI chatbots still send to search.
- Top SERP positions for high-volume queries dominated by health authorities (Healthline, Mayo Clinic) — Phase 1 should target long-tail queries, not head terms.
- **Action item**: Phương should validate top-30 keyword volumes in Google Keyword Planner directly (free with any Ads account) and feed results back into Sprint 3 programmatic page selection. ~30 min of work.

---

## Test B — Affiliate ecosystem → **PASS (modest)**

Most femtech affiliate programs gate commission rates behind direct application. Found enough programs to confirm viability, but exact numbers require sign-up.

### Confirmed programs (5+ found, target met)

| Program | Network | Commission | Cookie | Status |
|---|---|---|---|---|
| Flo Health | Direct | Negotiable (typically 20-40% of first sub) | 30 days | Open, dedicated AM |
| Natural Cycles | Awin / FlexOffers | Negotiable | Std (30d) | Open |
| Oura Ring | Impact Network | ~5-10% (typical hardware) | Std (30d) | Open |
| Whoop | Typeform application | ~5% (typical) | TBD | Application required |
| Amazon Associates | Amazon | 1-4% health, 4.5% beauty | **24h** ⚠️ | Open, but cookie too short to be material |
| Cycle journals / books | Amazon | 4.5% | 24h | Same as above |

### Verdict: PASS, with realistic ceiling
- ≥5 programs found (passes B threshold)
- App subscription affiliates (Flo, Natural Cycles) have the best economics — high commission % on recurring revenue
- Hardware affiliates (Oura, Whoop) good for occasional high-ticket conversions ($300+ products × 5-10%)
- Amazon's 24-hour cookie is a near-deal-breaker for a content site — visitors rarely buy same-session

### Realistic affiliate revenue at 10k pageviews
- Affiliate CTR typical: 1-2% for content sites
- Conversion of click → purchase: 1-3%
- Math: 10k × 1.5% × 2% = 3 conversions/mo
- At avg $20 commission/conversion (mix of subs + hardware): **~$60/mo**
- Higher upside if a single Oura conversion ($30-40 commission per ring)

**Affiliate adds ~$50-150/mo on top of ad revenue at Phase 1 scale.** Modest but real.

---

## Test C — Ad CPM ceiling math → **PASS (tight)**

### Data points

- **Ezoic average across all niches**: $12-18 EPMV (earnings per 1000 visitors)
- **Ezoic wellness/health niche**: typically $5-15 (lower end because of brand-safety filters around menstrual content)
- **Mediavine** requires 50k sessions/mo threshold — not available in Phase 1, only Phase 2+
- **AdSense**: $3-8 RPM typical for wellness, available immediately but lower than Ezoic
- **Niche-specific risk**: women's health / menstrual content sometimes flagged by brand-safety filters → lower CPM than equivalent wellness content

### Math vs ROADMAP thresholds

**Phase 1 exit ($100/mo, 10k pageviews):**
- @ $5 RPM (pessimistic) → 20k pageviews needed = 2x target
- @ $10 RPM (mid) → 10k pageviews = exit threshold ✓
- @ $15 RPM (optimistic) → 6,700 pageviews = beats threshold

**Phase 2 exit ($500-1000/mo, 30-50k pageviews):**
- @ $10 RPM × 50k = $500/mo ✓
- @ $15 RPM × 50k = $750/mo ✓
- @ $20 RPM × 50k = $1000/mo (requires premium ad network access)

### Verdict: PASS, but tight
- Math works at mid-to-high RPM ($10-15)
- Risk: if actual wellness/menstrual RPM lands at $5-7, Phase 1 exit requires 15-20k pageviews not 10k → 6 months may not be enough
- Affiliate revenue ($50-150/mo) helps cushion the ad-only ceiling

### Mitigation if RPM comes in low
- Pivot content mix toward higher-CPM tangents: productivity, career, "career planning around hormones" (productivity has higher CPM than menstrual)
- Heavier affiliate emphasis (subs > ads)
- Push for Phase 2 (Mediavine eligibility at 50k sessions) faster

---

## Sprint 1.5 decision gate

**A + B + C all PASS → Sprint 2 GO**

| Test | Result | Confidence |
|---|---|---|
| A — Search demand | PASS, niche growing | High |
| B — Affiliate ecosystem | PASS modest | Medium |
| C — CPM math | PASS tight | Medium |

### Conditions / monitor flags for Sprint 2-3

1. **Verify keyword volumes in Google Keyword Planner** (~30 min, free) before committing to Sprint 3's 120 programmatic pages — pick keywords with verified volume + low competition.
2. **Apply to 2-3 affiliate programs early** (Flo, Natural Cycles, Oura) — Phương should know actual commission rates before writing affiliate-heavy content. Pre-application is free.
3. **Consider higher-CPM content angles** as hedge: "productivity by cycle phase" (vs purely "follicular phase tasks") may attract productivity advertisers, which pay 1.5-2x wellness CPM.
4. **AI search-traffic decay** is real — bias toward content that AI chatbots cite back to (deep how-to + tools + calculators), not generic informational pages that ChatGPT will absorb.

### Next concrete action

Sprint 2 kickoff (per ROADMAP §"Next concrete action"): localStorage persistence + SEO foundation. Estimated 6-8h.

Before Sprint 3 invests in 120 programmatic pages, do a 30-min Keyword Planner verification pass to confirm volume estimates above.
