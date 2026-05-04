# Research: Cycle tracking app privacy, an honest 2026 comparison

**Slug:** /blog/cycle-tracking-apps-privacy
**Ship date:** 2026-06-19
**Target keyword:** "cycle tracking app privacy"
**Secondary keywords:** "private period tracker", "secure period tracker", "anonymous cycle tracker", "period app data sharing"
**Search intent:** Commercial investigation. Privacy-conscious shopper, often post-Dobbs context, often comparing 3-6 apps before downloading.
**Estimated KD/Volume:** "Private period tracker" ~880/mo (Ahrefs, growing), KD ~22. "Cycle tracking app privacy" ~390/mo, KD ~18. Combined long-tail addressable demand ~1,500-2,000/mo.
**Word count target:** 2,400
**Effort estimate:** 6 hours (heaviest research load in batch)
**Tier:** Commercial investigation

---

## 1. SERP analysis (top 5 results, captured 2026-05-04)

| # | URL | Domain | Format | Word count | What it covers | Gap |
|---|-----|--------|--------|------------|----------------|-----|
| 1 | https://allaboutcookies.org/safe-period-tracking-apps | allaboutcookies.org | Comparison + table | ~2,800 | Compares Drip, Euki, Periodical, Apple HealthKit, Flo, Clue. Local storage, third-party sharing, GDPR, 2FA criteria. | No mention of FTC Premom action; no Lumen-style "no account required, all client-side"; no Stardust |
| 2 | https://www.consumerreports.org/health/health-privacy/period-tracker-apps-privacy-a2278134145/ | consumerreports.org | Editorial review | ~3,500 | 8 apps tested by CR Digital Lab, methodology by privacy researchers | Paywalled in parts; no comparison table reader can scan quickly; thin on legal context |
| 3 | https://www.mozillafoundation.org/en/privacynotincluded/categories/reproductive-health/ | mozillafoundation.org | App-by-app reviews | ~5,000+ across pages | 25 apps reviewed, "Privacy Not Included" warning labels | Each app is its own page; no single comparison view; no productivity/cycle-syncing angle |
| 4 | https://stateline.org/2024/07/26/data-privacy-after-dobbs-is-period-tracking-safe/ | stateline.org | News feature | ~1,800 | Legal context post-Dobbs, state-by-state risk | No app comparison table; no buying recommendation |
| 5 | https://www.npr.org/2022/05/10/1097482967/roe-v-wade-supreme-court-abortion-period-apps | npr.org | News explainer | ~1,200 | Why people are deleting period apps post-Dobbs | Dated (2022); no current app guidance |

## 2. SERP gap thesis (3 gaps)

1. **No top SERP result combines an app comparison table with the FTC Premom enforcement context AND the Mozilla Privacy Not Included badge AND a recommendation that includes Lumen-style client-side tools.** Lumen can be the one-stop privacy comparison.
2. **No top result frames "no account required" as a privacy primitive.** Most reviews evaluate apps that require accounts and ask whether the account is well-protected. Lumen's positioning (no account, all data in browser, no server) is a strictly stronger privacy posture, and that frame is missing from the SERP.
3. **No top result is honest about the privacy/utility tradeoff.** Drip, Euki, Periodical are most private but have weaker UX and no cycle syncing recommendations. Reviews treat this as a binary; Lumen can present it as a decision tree (what level of risk + what features matter to you).

## 3. Lumen angle (3 sentences)

Post-Dobbs and post-Premom, the "best private period tracker" question is a real research task with legal stakes, not a wellness preference. Lumen owns the comparison by combining three lenses no top result combines: a clean comparison table, the regulatory backdrop (FTC Premom 2023 + 2024 data broker actions, Mozilla Privacy Not Included), and an honest decision tree (what to use if you want maximum privacy vs maximum features). Lumen disclosed as one option (no account, browser-only) but ranked on its actual privacy properties, not as a sales pitch.

## 4. AI Overview answer paragraph (40-60 words)

> **The most privacy-protective period trackers are Euki, Drip, and Periodical, which store all data locally on your device and share nothing with third parties.** Lumen runs entirely in the browser with no account required. Flo, Clue, and Natural Cycles use cloud storage and have varying third-party sharing policies; Flo settled an FTC action in 2021.

## 5. Outline

### H1: Cycle tracking app privacy in 2026: an honest comparison of 8 apps

#### Quick takeaway aside

Same as section 4.

#### Disclosure block (above the fold)

This post discusses Lumen, our own free cycle calculator, alongside competitors. Lumen has no affiliate relationships with any app reviewed below. Where affiliate links appear (clearly marked), we earn a small commission at no extra cost to you, and we have selected the apps because they are the leaders by usage, not because of the commission.

#### H2: Why period app privacy is now a legal question, not just a preference
- Dobbs decision (2022) and the criminalization risk of menstrual data in some US states
- FTC Premom enforcement action (2023): $100K civil penalty, sharing data with Google and Chinese SDKs without consent
- 2024 FTC actions on location data brokers (Mobilewalla, Gravy Analytics)
- 2026 PADFAA enforcement reminder (FTC, February 2026)
- Component: none

#### H2: How we evaluated the apps
- Six privacy criteria:
  1. Account required (yes/no)
  2. Data storage location (device, cloud, both)
  3. Encryption at rest and in transit
  4. Third-party SDK sharing (advertising, analytics)
  5. Law enforcement response policy (warrant required, transparency report)
  6. GDPR/CCPA compliance and Mozilla Privacy Not Included status
- Component: none

#### H2: Comparison table (8 apps)
- Component: comparison table (mandatory, rendered as `<table>` not text)

| App | Account required | Storage | 3rd-party sharing | Law enforcement stance | Mozilla *PNI |
|---|---|---|---|---|---|
| Lumen | No | Browser only | None | N/A (no data held) | N/A |
| Euki | No | Local only | None | N/A | Best of |
| Drip | No | Local only | None | N/A | Not warned |
| Periodical | No | Local only | None | N/A | Not warned |
| Stardust | Yes | Cloud, end-to-end encrypted (claimed) | Limited | Warrant required (claimed) | Reviewed |
| Apple Health | Apple ID | Local + iCloud (E2E if enabled) | None by default | Subject to subpoena via Apple | Not warned |
| Natural Cycles | Yes | Cloud | Limited (anonymized) | Warrant required | Not warned |
| Flo | Yes | Cloud | Reduced post-FTC settlement | Not transparent | Warned |

#### H2: The privacy-first tier (Euki, Drip, Periodical, Lumen)
- All store data locally; no cloud; no account
- Tradeoff: weaker cross-device sync, weaker UX polish, fewer "smart" predictions
- Open source: Drip (https://github.com/bloodyhealth/drip), Euki (Bloody Health), Periodical
- Lumen's specific posture: not a tracker, a phase calculator. No data stored at all. Best for users who want phase recommendations without keeping a long-term log.
- Component: none

#### H2: The mid-privacy tier (Apple Health, Natural Cycles, Stardust)
- Apple Health: iCloud sync optional, end-to-end encrypted only if Advanced Data Protection is enabled (most users do not enable it). Subject to subpoena to Apple if not E2E.
- Natural Cycles: FDA-cleared as birth control; cloud-based; states it requires a warrant for law enforcement requests; data is "anonymized" but reidentification risk is real
- Stardust: post-Dobbs marketing pivot; claims end-to-end encryption; smaller team, less audited
- Component: none

#### H2: The high-utility, lower-privacy tier (Flo, Clue)
- Flo: 2021 FTC settlement over data sharing with Facebook, Google, AppsFlyer, Flurry. Has since launched "Anonymous Mode" (2022) which decouples profile from identity. Mozilla still warns.
- Clue: GDPR-compliant, EU-based, cloud-based, third-party trackers present
- Both have stronger feature sets and prediction algorithms; both retain server-side data
- Component: none

#### H2: A decision tree for picking a tracker
- "I might need plausible deniability about cycle data" → Euki, Drip, Periodical, Lumen, or pen and paper
- "I want maximum privacy plus cross-device sync" → Apple Health with Advanced Data Protection enabled
- "I want fertility awareness as birth control" → Natural Cycles (FDA-cleared, accept the cloud tradeoff)
- "I want the best UX and predictions and accept the privacy cost" → Flo (in Anonymous Mode) or Clue
- "I just want phase-based scheduling, no log" → Lumen
- One bolded thesis sentence: **"Privacy and utility trade off, and the right answer depends on your threat model, not the app rating average."**
- Component: none

#### H2: How to delete data from a cloud-based app you no longer want
- Step-by-step for Flo (account deletion + data download)
- Step-by-step for Clue (similar)
- Step-by-step for Apple Health (delete category)
- Note: deletion request != certainty of deletion. Verify with privacy policy retention clause.
- Component: none

#### H2: What to do if you live in a restrictive abortion state
- Use a local-only or no-account tracker (Lumen, Euki, Drip, Periodical)
- Disable location services on the app and on your phone
- Do not log sexual activity in a cloud app
- Use a separate Apple ID or Google account for health data if possible
- Disclaimer: this is informational, not legal advice. Consult a digital security organization (EFF, Digital Defense Fund) for personalized threat modeling.
- Component: none

#### Closing CTA

If you want phase recommendations without keeping a log, Lumen runs entirely in your browser with no account, no cookies, no analytics on your cycle data. Try /plan.

## 6. FAQ schema (5-10 Q&A)

**Q: What is the most private period tracking app in 2026?**
A: Euki, Drip, and Periodical are the most private mainstream apps because they store all data locally on your device, share nothing with third parties, and require no account. Lumen is a related option that does not store data at all; it is a browser-based phase calculator rather than a long-term tracker. Mozilla's Privacy Not Included guide rates Euki as a "Best Of" pick.

**Q: Did Flo really sell user data?**
A: In 2021 the FTC settled with Flo over allegations that the app shared user health data with Facebook, Google, AppsFlyer, and Flurry without proper disclosure. Flo did not pay civil penalties but was required to obtain user consent before sharing health data and to instruct third parties to delete data. Flo has since launched Anonymous Mode and changed its consent flow, though Mozilla's Privacy Not Included guide still flags it.

**Q: Can law enforcement get my period tracker data?**
A: For cloud-based apps, yes, with a subpoena, warrant, or in some cases a simple data request. Each app's law enforcement response policy varies; Natural Cycles states it requires a warrant; Flo's policy is less specific. For local-only apps (Euki, Drip, Periodical), there is no data on a server to request. The 2023 FTC Premom enforcement action confirmed that period app data sharing falls under the Health Breach Notification Rule.

**Q: Is Apple Health private?**
A: Apple Health is more private than most third-party period apps, but the privacy guarantee depends on whether you have enabled Advanced Data Protection (iCloud end-to-end encryption). Without it, your iCloud-synced health data is encrypted on Apple's servers but Apple holds the keys, meaning Apple could be compelled to provide it under a warrant. With Advanced Data Protection enabled, only your devices hold the keys.

**Q: What does the FTC Premom action mean for other period apps?**
A: The 2023 enforcement against Easy Healthcare (Premom) established that period and fertility apps fall under the Health Breach Notification Rule, even if they are not HIPAA-covered entities. Sharing user health data with third-party SDKs (advertising, analytics) without explicit affirmative consent is a breach. Other apps using similar SDK-based data flows are now operating under explicit FTC scrutiny.

**Q: Is Lumen actually private, or is that marketing?**
A: Lumen runs entirely in the browser. There is no account, no server-side cycle data store, and no analytics that touches your cycle inputs. The site does use Microsoft Clarity for anonymized session analytics on the marketing pages, which does not see your /plan calculator inputs. The codebase is reviewable; the design is "no data leaves your device" by default.

**Q: Should I delete my period tracker app?**
A: It depends on your threat model. If you live in a state that has criminalized abortion or are concerned about future legal risk, switching to a local-only or no-account tracker is reasonable. If you live in a state with strong privacy protections and want app features (predictions, symptom logging), the residual risk may be acceptable to you. The decision is personal.

**Q: Are open source period trackers safer?**
A: Open source code can be audited by anyone, which is a stronger trust model than closed source for privacy-sensitive apps. Drip and Euki are open source. However, open source alone does not guarantee privacy; the data flow matters more. An open source app that uploads data to a cloud is less private than a closed-source app that stores locally.

## 7. Internal links

- /blog/best-cycle-syncing-app (post #3), anchor: "the broader app comparison"
- /blog/free-cycle-syncing-apps (post #11), anchor: "free apps roundup"
- /methodology, anchor: "Lumen's data and methodology"
- /privacy, anchor: "Lumen's privacy policy"
- /plan, anchor: "phase calculator with no account"
- /blog/what-is-cycle-syncing (post #1), anchor: "what cycle syncing is"

## 8. External citations (4-8 sources)

1. FTC press release on Easy Healthcare / Premom (2023), https://www.ftc.gov/news-events/news/press-releases/2023/05/ftc-says-fertility-app-premom-shared-users-sensitive-personal-information-third-parties (use for: enforcement context)
2. FTC PADFAA reminder (2026-02), https://www.ftc.gov/news-events/news/press-releases/2026/02/ftc-reminds-data-brokers-their-obligations-comply-padfaa (use for: 2026 regulatory context)
3. Mozilla *Privacy Not Included reproductive health category, https://www.mozillafoundation.org/en/privacynotincluded/categories/reproductive-health/ (use for: per-app warnings)
4. Mozilla blog "18 of 25 reproductive health apps", https://www.mozillafoundation.org/en/blog/in-post-roe-v-wade-era-mozilla-labels-18-of-25-popular-period-and-pregnancy-tracking-tech-with-privacy-not-included-warning/ (use for: scope claim)
5. Consumer Reports, "Period Tracker Apps and Privacy", https://www.consumerreports.org/health/health-privacy/period-tracker-apps-privacy-a2278134145/ (use for: methodology + 8-app evaluation)
6. EFF on data broker enforcement, https://www.eff.org/deeplinks/2024/12/federal-regulators-limit-location-brokers-selling-your-whereabouts-2024-review (use for: location data context)
7. Digital Defense Fund threat modeling guide for reproductive health (use for: practical advice section)
8. FTC v. Flo Health Inc. (2021) settlement, https://www.ftc.gov/news-events/news/press-releases/2021/01/ftc-finalizes-order-flo-health-fertility-tracking-app-shared-sensitive-health-data-facebook-google (use for: Flo claim)

## 9. Affiliate placements

Sparse and disclosed. Affiliate fit is weak because privacy stance often conflicts with paid promotion. Permitted:
- Natural Cycles (Awin/FlexOffers): one disclosed affiliate link in the "fertility awareness as birth control" line, with explicit disclosure that affiliate status does not affect the privacy ranking
- Apple Health: no affiliate (Apple does not have a consumer affiliate program for Health)
- All others: no affiliate
Maximum: 1 affiliate link in this entire post. Disclosure block at top is mandatory.

## 10. Pinterest pin angles (5)

1. "The 4 most private period tracker apps in 2026" (vertical pin, app logos in 2x2 grid)
2. "Did your period app sell your data? Here is how to check" (clickbait-y pin, leads to comparison table)
3. "Post-Dobbs period tracker checklist (4 steps)" (educational checklist pin)
4. "Local-only vs cloud-based period apps, explained in one chart" (infographic pin of comparison table)
5. "Why Lumen does not have a period tracker login screen" (brand differentiation pin)

## 11. Reddit Phase 2 link drop angles

- r/privacy: ongoing threads on period tracker recommendations (high frequency post-Dobbs)
- r/TwoXChromosomes: "what period app are you using" recurring threads
- r/datahoarder: cross-pollination on local-only data
- r/abortion (with caution, follow sub rules carefully)
- r/AskWomen: less link-friendly, prefer text comment with one link

## 12. Risks + fact-check

- **Verify FTC Premom civil penalty figure** ($100,000) against original FTC press release
- **Verify Flo settlement details:** no civil penalty, consent decree only, original FTC release 2021-01
- **Verify Mozilla "Best Of" status for Euki** (current as of last review)
- **Verify Stardust E2E encryption claim** (their marketing vs actual technical attestation)
- **Verify Apple Advanced Data Protection coverage** for Health (it does cover Health when enabled, per Apple support docs)
- **YMYL caution:** this is not legal advice. Include disclaimer for restrictive-state readers and link to EFF + Digital Defense Fund.
- **Affiliate disclosure:** must be at top, not buried. FTC + EU legal requirement.
- **Update cadence:** privacy posts age fast. Add "Last reviewed: 2026-06-19" with commitment to revisit quarterly.

## 13. Voice + style notes

- No em dashes (use commas, parens, colons)
- Comparison table is the load-bearing visual; it must render as a real `<table>` (per BLOG_AUDIT_PLAYBOOK rule #3, remark-gfm wired in)
- Bold the thesis sentence in the decision tree H2 (per rule #8)
- Avoid sensationalism. The post-Dobbs context is real but the tone stays grounded ("legal question, not just preference") not alarmist ("THEY ARE COMING FOR YOUR DATA")
- When mentioning Lumen, frame as "one option in a category" not "the best option". Trust comes from honest ranking.
- Disclose affiliate status above the fold and again next to the affiliate link
- Cite primary sources (FTC, Mozilla) directly, not secondary coverage (TechCrunch, NPR) where possible
- Internal link anchor variation per playbook
- Add "Last reviewed: 2026-06-19" date stamp
