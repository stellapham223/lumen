# Test E measurement protocol

**Gate date:** 2026-05-19 (Tuesday)
**Time required:** ~30 minutes
**Pass condition:** ≥1 of 5 Test E pages reaches GSC position 30 or better in any week of the measurement window.
**Failure response:** Do NOT add new keywords. Diagnose first (see decision tree at bottom).

## Test E pages (shipped 2026-04-28)

| # | URL | Primary keyword | KD | Volume |
|---|---|---|---|---|
| 1 | `/blog/what-is-cycle-syncing` | what is cycle syncing | Medium | >100 |
| 2 | `/blog/is-cycle-syncing-legit` | is cycle syncing legit | Medium | <100 |
| 3 | `/blog/how-to-start-cycle-syncing` | how to start cycle syncing | Easy | <100 |
| 4 | `/blog/cycle-syncing-chart` | cycle syncing chart | Easy | >100 |
| 5 | `/blog/best-cycle-syncing-app` | cycle syncing app | Easy | >100 |

## Step 1: Pull GSC Performance data (10 min)

1. Open [Google Search Console](https://search.google.com/search-console) → property `lumencal.com`
2. Performance → Search results
3. Filter:
   - Date: **Last 28 days** (or **Custom**: 2026-04-28 to 2026-05-19)
   - Search type: Web
4. Add filter → Query → contains `cycle syncing` → Apply
5. Sort by Position ascending
6. Export → Excel/CSV → save as `tmp/gsc-test-e-2026-05-19.csv`

## Step 2: Check each Test E keyword (10 min)

For each of the 5 keywords, in GSC:

1. Add filter → Query → exact match → `<keyword>` → Apply
2. Record: Impressions, Clicks, Avg position
3. Add filter → Page → contains `/blog/<slug>` → Apply
4. Record: Best position observed in last 28 days

| # | Keyword | Impressions (28d) | Clicks (28d) | Avg position | Best position | Top 30? |
|---|---|---|---|---|---|---|
| 1 | what is cycle syncing | | | | | |
| 2 | is cycle syncing legit | | | | | |
| 3 | how to start cycle syncing | | | | | |
| 4 | cycle syncing chart | | | | | |
| 5 | cycle syncing app | | | | | |

## Step 3: Verify indexing (5 min)

For each of the 5 URLs:

1. URL Inspection tool in GSC → paste URL
2. Confirm: "URL is on Google" + "Page indexed"
3. If "Crawled - currently not indexed" or "Discovered - not indexed": this is the problem, not the content. Request indexing.

| # | URL | Indexed? | Last crawled | Notes |
|---|---|---|---|---|
| 1 | /blog/what-is-cycle-syncing | | | |
| 2 | /blog/is-cycle-syncing-legit | | | |
| 3 | /blog/how-to-start-cycle-syncing | | | |
| 4 | /blog/cycle-syncing-chart | | | |
| 5 | /blog/best-cycle-syncing-app | | | |

## Step 4: Decision tree (5 min)

### IF ≥1 keyword reached top 30 → PASS

Unlocks:
- Tier 2 deep-dives (Posts #12-15 phase guides — already in calendar, no scope change)
- Optional: Begin Phase 3.2 research (programmatic page candidates, additional Ahrefs seed pull)
- Optional: Open Phase 4 decision (diet/workout cluster — see `docs/seo_plan_lumencal/03_bo-tu-khoa.csv` rows 36-49)

Update:
- `docs/seo_plan_lumencal/06_goals.csv` row 5.1 → mark Y
- `docs/seo_plan_lumencal/07_kpi.csv` baseline column → fill actuals
- ROADMAP.md → mark Test E gate passed with date

Continue shipping Posts #11-21 per calendar.

### IF 0 keywords reached top 30 → INVESTIGATE BEFORE PIVOT

Do not assume content is wrong. Run diagnostic checklist:

**Indexing**
- [ ] All 5 URLs indexed in GSC (from step 3)? If NO → indexing issue, not content. Request indexing + check sitemap submission.
- [ ] Sitemap last fetched in GSC within 7 days? If NO → resubmit sitemap.
- [ ] `site:lumencal.com` shows ≥9 results in Google? If NO → broader indexing problem.

**Click-through**
- [ ] At least 1 keyword has impressions >50 in 28 days? If YES + position >30 → content is competing but ranking weak.
- [ ] Avg CTR ≥3% for impressions >100? If NO → title/meta needs rework.

**Technical**
- [ ] Core Web Vitals (GSC report): all 5 URLs in "Good"? If NO → fix LCP/CLS.
- [ ] Mobile usability errors: 0? If NO → fix.
- [ ] Schema errors (GSC Enhancements): 0? If NO → fix Article/FAQ schema.

**Content gaps**
- [ ] Word count of each post ≥1500w? (Re-check brief targets.) If NO → expand thinnest post.
- [ ] Each post has ≥3 internal links inbound? If NO → audit linking matrix.

### If diagnostic finds the root cause

- Fix the specific issue. Wait 2 weeks. Re-measure.
- Do NOT add new keywords yet.

### If diagnostic finds no specific issue (worst case)

This means content + technical are fine but Lumen is too new to rank. Domain age effect.

Response:
- Continue shipping per calendar (Tier 2 deep-dives will help build topical authority anyway)
- Extend measurement window to 6 weeks (re-measure 2026-06-09)
- Do NOT pivot positioning yet
- Hold Phase 4 trigger until 2026-06-09 measurement

## Step 5: Write decision log

Append to this file (or create `docs/decisions/2026-05-19-test-e-result.md`):

```markdown
# Test E result — 2026-05-19

Status: [PASS / FAIL]
Best result: [keyword] at position [N]
Indexed pages: [5/5 or N/5]

Action taken: [unlock Tier 2 / investigate root cause X / extend window]
Next review: [date]
```

## Reference

- Keyword research source: `docs/keyword_research_2026_04.md`
- Test E selection logic: same file, section "Test E keyword selection"
- Content plan: `docs/seo_plan_lumencal/04_trien-khai-content.csv`
- Goals targets: `docs/seo_plan_lumencal/06_goals.csv`
