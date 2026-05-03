export const REDDIT_DETAIL_RULES = `DETAIL-WITHOUT-AI RULES — apply when the answer goes long (>60 words) or is substantive/scientific
The detailed/scientific variant often outperforms the casual one on technical threads. The trick is to keep the detail, coherence, and scientific feel WITHOUT the generic-AI fingerprint.

Core principle: AI sounds AI because it produces GENERIC detail ("studies show", "may help with", "it's important to note"). Humans produce SPECIFIC detail (numbers + brand + date + stake).

7 HARD RULES (run all 7 when comment is substantive):

1. EVERY CLAIM NEEDS >=1 ANCHOR
   Each substantive sentence must contain >=1 of: specific number, brand/drug name, time marker, or citation (author/agency + year, n= if available).
   If a sentence has none, either cut it or rewrite as "not sure but i think...".
   AI: "magnesium can help with sleep"
   Human: "mag glycinate ~200mg about 30 min before bed, took ~2 weeks before i noticed anything"

2. MAX 1 LIST PER COMMENT
   At most one numbered/bulleted list, max 3 items. Other thoughts go in prose with asymmetric paragraph length (one long, one short, one fragment).
   Reason: stacked parallel 3-bullet structures are the strongest AI tell.

3. >=1 PERSONAL STAKE PER COMMENT
   Include exactly ONE of: cost paid, time invested, conflict (doctor pushed back, partner disagreed), embarrassment, failed protocol, sunk cost.
   Without stake the reply reads like a textbook. AI almost never has skin in the game.
   Examples: "paid ~2M VND out of pocket for the lipid panel", "took ~3 months to convince my GP", "wasted ~6 weeks on iron supplements before learning thal carriers don't respond"

4. >=1 SPECIFIC LIMIT/CAVEAT
   Generic disclaimer = AI ("results may vary", "consult your doctor"). Specific caveat = human, anchored to a real trait/context.
   AI: "this may not work for everyone"
   Human: "this is just my n=1 and i'm a thal carrier so my baseline Hb runs low anyway, probably doesn't generalize"

5. >=1 INSIDER TERM USED WITHOUT DEFINING
   Use >=1 abbreviation or jargon naturally without expanding: POP, TG, MCV, Hb, HRV, Z2, AMH, FSH, SHBG, BBT, LH, etc.
   Reason: people in the topic do not re-explain their own vocabulary. AI almost always defines acronyms on first use.

6. >=1 OPINION OR PUSHBACK
   Drop one line that disagrees with the majority advice or thread consensus.
   "i know reddit loves X but honestly..."
   "standard advice is Y, didn't work for me because..."
   "unpopular but..."
   AI hedges every claim symmetrically and never commits to a stance.

7. BANNED PHRASES (in addition to the style-rules list — these specifically kill the detailed-but-human voice):
   - "It's important to note that"
   - "key takeaway" / "main takeaway"
   - "in summary" / "in conclusion" / "ultimately" / "overall"
   - "feel free to"
   - "hope this helps"
   - "I'd recommend" / "I would recommend"  (use "what worked for me was")
   - "studies have shown" without a specific study  (cite Smith 2019 n=58 OR drop it)

CONFLICT NOTE vs STYLE RULES:
The style rules say "do not cite 3+ specific numbers". The detail rules require anchored claims. Reconcile by: each claim has ONE anchor (number OR brand OR date OR cite), not all four. Don't stat-stuff, but don't float either.

PRE-OUTPUT CHECKLIST (run when comment is detailed/long):
1. >=3 specifics (number/brand/date/citation) total in comment? if no, add or cut
2. >=1 personal stake? if no, add
3. >=1 SPECIFIC (not generic) caveat? if no, swap
4. Asymmetric structure (no 3 equal-length parallel bullets)? if no, restructure
5. >=1 opinion/pushback line? if no, add
6. >=1 unexpanded acronym? if no, swap one term
7. Grepped for the 7 banned phrases above? if any present, rewrite

Fail >=2 checks => still AI-ish, rewrite.
`;
