# SEO Content Plan — Lumencal

12 CSV files replicating template từ Joy Subscription SEO plan, populated với data Lumen.

## Files

| Tab name (in Sheets) | File |
|---|---|
| 0. Tổng quan dự án | `00_tong-quan.csv` |
| 1. Phân tích đối thủ | `01_phan-tich-doi-thu.csv` |
| 2. Phân tích website | `02_phan-tich-website.csv` |
| 2.1. Tối ưu Onsite | `02-1_toi-uu-onsite.csv` |
| 2.2. Tối ưu Giao diện | `02-2_toi-uu-giao-dien.csv` |
| 3. Bộ từ khóa | `03_bo-tu-khoa.csv` |
| 4. Triển khai Content | `04_trien-khai-content.csv` |
| 4.1. Glossary | `04-1_glossary.csv` |
| 4.2. Chiến lược content | `04-2_chien-luoc-content.csv` |
| 5. Timeline | `05_timeline.csv` |
| 6. Goals | `06_goals.csv` |
| 7. KPI | `07_kpi.csv` |

## Import vào Google Sheets

1. Tạo Google Sheets mới (rỗng)
2. Với mỗi file CSV:
   - Click "+" bottom-left để add tab mới
   - Đổi tên tab theo cột "Tab name" ở bảng trên
   - File → Import → Upload → chọn CSV → "Replace current sheet"
3. Sheet đầu tiên (tab 0): đổi tên "Sheet1" → "0. Tổng quan dự án" trước khi import

## Source vs Lumen mapping

| Joy template | Lumen adaptation |
|---|---|
| Joy Subscription (Shopify subscription app) | Lumencal (cycle syncing content site) |
| Phân khúc cạnh tranh: Recharge / Loop / Chargebee | Phân khúc cạnh tranh: Flo / Clue / Natural Cycles / Oura |
| Funnel: Unaware/Problem/Solution/Product/Converting | Same funnel |
| 635 keywords planned | 49 keywords mapped (21 posts + 16 Phase 4 backlog) |
| Budget VND | Effort hours (solo founder; no team) |
| 12 months Jan-Dec 2026 | 12 months May 2026 - Apr 2027 |
| Team PIC | Solo PIC: Stella |

## Note quan trọng (cập nhật dần)

- **Sheet 00**: Verify positioning + USP wording.
- **Sheet 01**: Competitor numbers là estimate. Pull SEMrush/Ahrefs nếu cần chính xác.
- **Sheet 02**: Cần audit thực tế: Open Graph; Breadcrumb schema; meta descriptions cho 9 posts đã ship.
- **Sheet 03**: KD + Volume từ Ahrefs Free (2026-04-28). Pull lại sau khi Phase 3.2 unlock.
- **Sheet 04**: 9 posts Published; 12 posts Researched. Update Status khi ship.
- **Sheet 04.1 (Glossary)**: 20 terms planned; chưa build page nào. Priority: 5 terms head (cycle syncing + 4 phases).
- **Sheet 06 Goals**: Traffic projections là target conservative. Adjust sau Test E gate measurement 2026-05-19.
- **Sheet 07 KPI**: Effort budget 480h/year = ~9h/week (solo founder). Compare với ROADMAP 6-12h/week budget.

## Workflow maintenance

- **Weekly**: Update sheet 4 Status (Researched → Drafting → Published); update sheet 6/7 GSC metrics.
- **Monthly**: Review sheet 1 (competitor traffic); sheet 5 timeline (slipping?); sheet 6 goals (on track?).
- **Quarterly**: Re-pull keyword research; reassess Phase 4 trigger; audit affiliate revenue split.

## Source data sources

- Keyword research: `docs/keyword_research_2026_04.md`
- Content research master: `docs/content_research/MASTER_CONTENT_RESEARCH_2026_05.md`
- Content calendar: `docs/content_research/CONTENT_CALENDAR_2026_05.md`
- Per-post briefs: `docs/content_research/posts/*.md`
- Reddit playbook: `docs/REDDIT_SEEDING_PLAYBOOK.md`
- Blog audit playbook: `docs/BLOG_AUDIT_PLAYBOOK.md`
