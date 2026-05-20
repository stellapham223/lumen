// Single source of truth for brand + URL constants.
// Production domain: lumencal.com (set via NEXT_PUBLIC_SITE_URL in Vercel).

// Resolution order:
//   1. NEXT_PUBLIC_SITE_URL: explicit override (production = https://lumencal.com)
//   2. VERCEL_PROJECT_PRODUCTION_URL: Vercel-injected production alias (preview/staging)
//   3. VERCEL_URL: current deployment URL (changes per deploy; preview branches included)
//   4. localhost fallback for `bun run dev`
function resolveBaseUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (explicit) return explicit;

  const prodUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (prodUrl) return `https://${prodUrl}`;

  const deployUrl = process.env.VERCEL_URL;
  if (deployUrl) return `https://${deployUrl}`;

  return "http://localhost:3000";
}

export const BASE_URL: string = resolveBaseUrl();

export const SITE = {
  name: "Lumen",
  tagline: "Cycle-aware productivity for ambitious women",
  description:
    "Schedule deep work, meetings, and creative time around your four hormonal phases. A free planner for women who want to work with their biology, not against it.",
  shortDescription:
    "Free cycle-aware productivity planner. Map your week to your four hormonal phases.",
  locale: "en_US",
  twitterHandle: undefined as string | undefined,
  // Keywords used by Lumen content. Curated for cycle-syncing + productivity audience.
  keywords: [
    "cycle syncing",
    "cycle syncing schedule",
    "cycle-aware productivity",
    "menstrual cycle productivity",
    "luteal phase productivity",
    "follicular phase productivity",
    "luteal phase tasks",
    "follicular phase tasks",
    "cycle planner",
    "cycle calendar",
    "cycle phase calculator",
    "menstrual phase calculator",
    "ovulatory phase work",
    "menstrual cycle calendar",
  ],
} as const;

export function absoluteUrl(path: string = "/"): string {
  if (/^https?:/.test(path)) return path;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_URL}${p}`;
}

// Blog post manifest: single source for sitemap, /blog index, internal links.
export const BLOG_POSTS = [
  {
    slug: "what-is-cycle-syncing",
    title: "What is cycle syncing?",
    description:
      "A grounded definition, where the term came from, and what the research supports (and what it does not).",
    publishedAt: "2026-04-28",
  },
  {
    slug: "best-cycle-syncing-app",
    title: "Best cycle syncing app in 2026: an honest comparison",
    description:
      "Lumen vs Flo vs Clue vs Natural Cycles vs MyFlo vs 28: strengths, weaknesses, privacy posture.",
    publishedAt: "2026-04-28",
  },
  {
    slug: "cycle-syncing-chart",
    title: "Cycle syncing chart",
    description:
      "Hormones, energy, and the right work for each of the four cycle phases. Print-friendly reference.",
    publishedAt: "2026-04-28",
  },
  {
    slug: "how-to-start-cycle-syncing",
    title: "How to start cycle syncing",
    description:
      "A two-cycle beginner action plan. Track first, then adjust one decision area. No food prescriptions.",
    publishedAt: "2026-04-28",
  },
  {
    slug: "is-cycle-syncing-legit",
    title: "Is cycle syncing legit?",
    description:
      "An honest look at what the research backs, what is overstated, and where to land between TikTok hype and full-skeptic dismissal.",
    publishedAt: "2026-04-28",
  },
  {
    slug: "does-cycle-syncing-work",
    title: "Does cycle syncing work? An evidence-graded answer",
    description:
      "Cycle syncing is not one practice, it is four. A 2024 meta-analysis killed the case for phase-timed exercise. Here is the evidence grade for each protocol, plus a 2-cycle self-test.",
    publishedAt: "2026-05-06",
  },
  {
    slug: "how-does-cycle-syncing-work",
    title: "How does cycle syncing work? The hormone-cognition mechanism",
    description:
      "Estrogen and progesterone modulate four neurotransmitter systems (serotonin, GABA, dopamine, BDNF), producing predictable shifts in cognition, mood, and energy. The mechanism, in plain language.",
    publishedAt: "2026-05-09",
  },
  {
    slug: "cycle-syncing-on-birth-control",
    title: "Does cycle syncing work on birth control? Method-by-method",
    description:
      "Combined pill, mini-pill, hormonal IUD, copper IUD, implant, ring, patch: cycle syncing applies differently to each. A method-by-method verdict with the mechanism behind it.",
    publishedAt: "2026-05-13",
  },
  {
    slug: "cycle-syncing-beginner-plan",
    title: "Cycle syncing for beginners: a literal 4-week plan",
    description:
      "Spend Week 0 tracking only, then run a 4-week plan that maps each cycle phase to one focus. Concrete daily actions for work, exercise, and sleep. No diet rules in month one.",
    publishedAt: "2026-05-16",
  },
  {
    slug: "cycle-syncing-schedule-template",
    title: "Cycle syncing schedule template (free, no signup)",
    description:
      "A free cycle syncing schedule template you can copy in 5 minutes. Maps the four phases onto a 28-day calendar for work, exercise, and recovery. Built for knowledge workers, not lifestyle prescriptions.",
    publishedAt: "2026-05-19",
  },
  {
    slug: "free-cycle-syncing-apps-compared",
    title: "Free cycle syncing apps compared (2026): 6 honest reviews",
    description:
      "An honest 2026 comparison of free cycle syncing apps: Lumen, Lively, 28, Clue, Wild.AI, and Euki. Free-tier limits, privacy, account requirements, and which one fits which job.",
    publishedAt: "2026-05-22",
  },
  {
    slug: "follicular-phase-complete-guide",
    title: "Follicular phase: the complete guide for ambitious women",
    description:
      "An evidence-graded guide to the follicular phase: hormones, symptoms, what to schedule, what to avoid, and how PCOS, perimenopause, and hormonal birth control change the picture.",
    publishedAt: "2026-05-26",
  },
  {
    slug: "menstrual-phase-complete-guide",
    title: "Menstrual phase: the complete (and grounded) guide",
    description:
      "An evidence-graded menstrual phase guide: hormones, why you are tired, what to schedule, what to skip, the workout and food evidence, and where popular cycle syncing claims go too far. Built for knowledge workers who cannot just clear their calendar.",
    publishedAt: "2026-06-02",
  },
  {
    slug: "cycle-syncing-meal-timing",
    title: "Cycle syncing meal timing for cognitive performance",
    description:
      "Skip the food chart. The lever that moves cognitive performance across your cycle is when you eat, not what you eat. An evidence-honest take on meal timing, intermittent fasting, and caffeine across the menstrual cycle.",
    publishedAt: "2026-06-23",
  },
  {
    slug: "pcos-renamed-pmos",
    title: "PCOS renamed to PMOS: what the May 2026 announcement means",
    description:
      "PCOS has been officially renamed PMOS (Polyendocrine Metabolic Ovarian Syndrome) in a Lancet paper led by Helena Teede. What changed, why, and what it means for diagnosis and care.",
    publishedAt: "2026-05-19",
  },
  {
    slug: "pmos-vs-pcos",
    title: "PMOS vs PCOS: are they the same? Symptoms, diagnosis, and what changes",
    description:
      "PMOS and PCOS refer to the same clinical condition. PMOS is the new 2026 name; PCOS is the old one. What stays the same, what shifts, and what to ask your doctor.",
    publishedAt: "2026-05-19",
  },
  {
    slug: "best-period-tracking-apps",
    title: "Best period tracking apps in 2026: a privacy-conscious comparison",
    description:
      "Honest 2026 comparison of period tracking apps: Flo, Clue, Stardust, Natural Cycles, Apple Health. Tracking accuracy, privacy posture, free-tier limits.",
    publishedAt: "2026-05-20",
  },
  {
    slug: "best-cycle-tracking-wearables",
    title: "Best cycle tracking wearables in 2026: Oura vs Whoop vs Apple Watch",
    description:
      "An honest 2026 comparison of cycle tracking wearables: Oura, Whoop, Apple Watch, Garmin. What each measures, what it predicts, and where the data actually shines.",
    publishedAt: "2026-05-20",
  },
  {
    slug: "best-period-products",
    title: "Best period products in 2026: cups, discs, underwear, pads",
    description:
      "An honest comparison of period product categories in 2026: menstrual cups, discs, period underwear, organic pads, tampons. Cost, learning curve, eco impact.",
    publishedAt: "2026-05-20",
  },
  {
    slug: "best-sleep-products-luteal-phase",
    title: "Best sleep products for luteal phase: cooling, weighted, blackout",
    description:
      "Luteal phase sleep is disrupted by elevated basal temperature and REM disruption. The product categories that actually help: cooling sheets, weighted blankets, sleep masks.",
    publishedAt: "2026-05-20",
  },
  {
    slug: "cycle-syncing-workouts-luteal-phase",
    title: "Cycle syncing workouts for luteal phase: what the evidence supports",
    description:
      "Luteal phase workout recommendations, honestly graded. What the evidence supports, what is overstated, and a practical 2-week luteal training template.",
    publishedAt: "2026-05-20",
  },
  {
    slug: "cycle-syncing-food-follicular-phase",
    title: "Cycle syncing food for follicular phase: what the evidence supports",
    description:
      "Follicular phase nutrition recommendations, honestly graded. Most phase-food prescriptions are not evidence-based; here is what is, and what to eat on a real follicular day.",
    publishedAt: "2026-05-20",
  },
  {
    slug: "post-pill-cycle-recovery",
    title: "Post-pill cycle recovery: what to expect after stopping hormonal birth control",
    description:
      "Stopping the pill or other hormonal contraception starts a recovery period of irregular cycles for most women. What is normal, when to seek help, evidence-graded support.",
    publishedAt: "2026-05-20",
  },
] as const;

// Glossary manifest: single source for index, sidebar related pills, sitemap.
// Funnel stages: Unaware | Problem aware | Solution aware | Product aware | Converting
// Topics: Symptoms | Physiology | Hormones | Mechanism | Phases | Practice | Tools |
//         Conditions | Birth control | Nutrition | People | Research
export type GlossaryFunnel =
  | "Unaware"
  | "Problem aware"
  | "Solution aware"
  | "Product aware"
  | "Converting";

export type GlossaryTopic =
  | "Symptoms"
  | "Physiology"
  | "Hormones"
  | "Mechanism"
  | "Phases"
  | "Practice"
  | "Tools"
  | "Conditions"
  | "Birth control"
  | "Nutrition"
  | "People"
  | "Research";

export type GlossaryTerm = {
  slug: string;
  term: string;
  funnel: GlossaryFunnel;
  topic: GlossaryTopic;
  shortDef: string;
  status: "Planned" | "Drafted" | "Published";
};

export const GLOSSARY_TERMS: ReadonlyArray<GlossaryTerm> = [
  // A. Symptoms (Unaware)
  { slug: "pms", term: "PMS (Premenstrual Syndrome)", funnel: "Unaware", topic: "Symptoms", shortDef: "Cluster of physical and mood symptoms in the 7 to 10 days before period. Affects roughly 75% of menstruating women to some degree.", status: "Published" },
  { slug: "pmdd", term: "PMDD (Premenstrual Dysphoric Disorder)", funnel: "Unaware", topic: "Symptoms", shortDef: "Severe form of PMS affecting 3 to 8% of women. Clinical diagnosis; mood disturbance significant enough to impair daily life.", status: "Published" },
  { slug: "period-brain", term: "Period brain (cycle brain fog)", funnel: "Unaware", topic: "Symptoms", shortDef: "Subjective cognitive cloudiness during late luteal and early menstrual phases. Modest measurable effects on working memory.", status: "Published" },
  { slug: "energy-crash", term: "Energy crash (cycle-related fatigue)", funnel: "Unaware", topic: "Symptoms", shortDef: "Predictable drop in energy correlated with phase transitions. Most pronounced in late luteal and early menstrual.", status: "Published" },
  { slug: "premenstrual-cravings", term: "Premenstrual cravings", funnel: "Unaware", topic: "Symptoms", shortDef: "Increased appetite and food cravings in late luteal phase. Linked to serotonin and insulin fluctuation.", status: "Published" },
  { slug: "cyclical-bloating", term: "Cyclical bloating", funnel: "Unaware", topic: "Symptoms", shortDef: "Fluid retention common in late luteal phase from progesterone-driven sodium retention.", status: "Published" },
  { slug: "cyclical-mood-swings", term: "Cyclical mood swings", funnel: "Unaware", topic: "Symptoms", shortDef: "Recurring mood pattern tied to cycle phase. Predictable timing is the diagnostic clue versus clinical mood disorder.", status: "Published" },
  { slug: "hormonal-acne", term: "Hormonal acne", funnel: "Unaware", topic: "Symptoms", shortDef: "Acne pattern correlated with cycle; flares in late luteal. Driven by androgen and sebum interaction.", status: "Published" },
  { slug: "mittelschmerz", term: "Mittelschmerz (ovulation pain)", funnel: "Unaware", topic: "Symptoms", shortDef: "One-sided pelvic pain at ovulation. Usually harmless and brief (hours to one day).", status: "Published" },
  { slug: "breast-tenderness", term: "Cyclical breast tenderness", funnel: "Unaware", topic: "Symptoms", shortDef: "Tender or swollen breasts in late luteal phase. Progesterone-driven; resolves with period onset.", status: "Published" },
  { slug: "dysmenorrhea", term: "Dysmenorrhea (period pain)", funnel: "Unaware", topic: "Symptoms", shortDef: "Painful periods. Primary (intrinsic) or secondary (from a condition like endometriosis).", status: "Published" },
  { slug: "menstrual-migraine", term: "Menstrual migraine", funnel: "Unaware", topic: "Symptoms", shortDef: "Migraine pattern timed to the pre-period estrogen drop. Affects roughly 20% of women with migraines.", status: "Published" },
  { slug: "cyclical-depression", term: "Cyclical depression", funnel: "Unaware", topic: "Symptoms", shortDef: "Depressive symptoms timed to luteal phase. Distinct from major depressive disorder by timing.", status: "Published" },
  { slug: "premenstrual-anxiety", term: "Premenstrual anxiety", funnel: "Unaware", topic: "Symptoms", shortDef: "Anxiety spikes in late luteal phase. Linked to allopregnanolone withdrawal and GABA dysregulation.", status: "Published" },
  { slug: "menorrhagia", term: "Heavy menstrual bleeding (menorrhagia)", funnel: "Unaware", topic: "Symptoms", shortDef: "Periods longer than 7 days, or soaking through pad or tampon every 1 to 2 hours. Warrants medical evaluation.", status: "Published" },
  { slug: "hypomenorrhea", term: "Light or absent periods", funnel: "Unaware", topic: "Symptoms", shortDef: "Periods shorter than 3 days or very light flow. Can indicate hormonal imbalance, under-fueling, or thyroid issues.", status: "Published" },
  { slug: "mid-cycle-spotting", term: "Mid-cycle spotting", funnel: "Unaware", topic: "Symptoms", shortDef: "Light bleeding around ovulation. Usually harmless; persistent or heavy spotting warrants evaluation.", status: "Published" },
  { slug: "period-clots", term: "Period clots", funnel: "Unaware", topic: "Symptoms", shortDef: "Coagulated blood passed during heavy flow. Small clots normal; quarter-sized or larger warrants evaluation.", status: "Published" },
  { slug: "cyclical-insomnia", term: "Cyclical insomnia", funnel: "Unaware", topic: "Symptoms", shortDef: "Sleep disruption in late luteal and ovulatory phases from progesterone and temperature shifts.", status: "Published" },
  { slug: "premenstrual-irritability", term: "Premenstrual irritability", funnel: "Unaware", topic: "Symptoms", shortDef: "Increased frustration tolerance dropping in late luteal phase. Serotonin withdrawal model.", status: "Published" },
  { slug: "cyclical-ibs", term: "Cyclical IBS flare", funnel: "Unaware", topic: "Symptoms", shortDef: "Digestive symptoms (cramping, diarrhea, constipation) worsening pre-period. Prostaglandin-mediated.", status: "Published" },
  { slug: "catamenial-epilepsy", term: "Catamenial epilepsy", funnel: "Unaware", topic: "Symptoms", shortDef: "Seizure pattern correlated with cycle phases. Affects roughly 40% of women with epilepsy.", status: "Published" },

  // B. Cycle Physiology (Problem aware)
  { slug: "menstrual-cycle", term: "Menstrual cycle", funnel: "Problem aware", topic: "Physiology", shortDef: "Recurring hormonal cycle from day 1 of menstruation to the day before the next period. Normal range 21 to 35 days.", status: "Published" },
  { slug: "cycle-length", term: "Cycle length", funnel: "Problem aware", topic: "Physiology", shortDef: "Days from one period start to the next. Only about 12% of women have exactly 28-day cycles.", status: "Published" },
  { slug: "cycle-phase", term: "Cycle phase", funnel: "Problem aware", topic: "Physiology", shortDef: "One of four segments of the menstrual cycle: menstrual, follicular, ovulatory, luteal. Each has a distinct hormone profile.", status: "Published" },
  { slug: "ovulation", term: "Ovulation", funnel: "Problem aware", topic: "Physiology", shortDef: "Release of a mature egg from the ovary, triggered by the LH surge roughly 24 to 36 hours prior.", status: "Published" },
  { slug: "menstruation", term: "Menstruation", funnel: "Problem aware", topic: "Physiology", shortDef: "Shedding of the uterine lining when implantation does not occur. Lasts 3 to 7 days; marks day 1 of a new cycle.", status: "Published" },
  { slug: "anovulatory-cycle", term: "Anovulatory cycle", funnel: "Problem aware", topic: "Physiology", shortDef: "Cycle without ovulation. Common in adolescence, perimenopause, PCOS, high stress, and on hormonal birth control.", status: "Published" },
  { slug: "endometrium", term: "Endometrium", funnel: "Problem aware", topic: "Physiology", shortDef: "Uterine lining that thickens through the cycle in response to estrogen and progesterone. Sheds during menstruation.", status: "Published" },
  { slug: "corpus-luteum", term: "Corpus luteum", funnel: "Problem aware", topic: "Physiology", shortDef: "Hormone-producing structure formed from the follicle post-ovulation. Produces progesterone during the luteal phase.", status: "Published" },
  { slug: "ovarian-follicle", term: "Ovarian follicle", funnel: "Problem aware", topic: "Physiology", shortDef: "Fluid-filled sac in the ovary containing a developing egg. Roughly 15 to 20 develop per cycle; one becomes dominant.", status: "Published" },
  { slug: "ovarian-reserve", term: "Ovarian reserve", funnel: "Problem aware", topic: "Physiology", shortDef: "Number of viable eggs remaining. Declines with age; rapid decline starts around age 35.", status: "Published" },
  { slug: "menarche", term: "Menarche", funnel: "Problem aware", topic: "Physiology", shortDef: "First menstrual period. Average age 12 globally; range 8 to 15 considered normal.", status: "Published" },
  { slug: "menopause", term: "Menopause", funnel: "Problem aware", topic: "Physiology", shortDef: "Permanent end of menstruation. Diagnosed retrospectively after 12 months without a period. Average age 51.", status: "Published" },
  { slug: "postmenopause", term: "Postmenopause", funnel: "Problem aware", topic: "Physiology", shortDef: "Stage after 12 months without a period. Cycle syncing no longer applies; circadian rhythms still matter.", status: "Published" },
  { slug: "endocrine-system", term: "Endocrine system (cycle)", funnel: "Problem aware", topic: "Physiology", shortDef: "Hormone-producing glands. Pituitary, ovaries, thyroid, and adrenals all interact with the cycle.", status: "Published" },
  { slug: "hpo-axis", term: "HPO axis (Hypothalamic-Pituitary-Ovarian)", funnel: "Problem aware", topic: "Physiology", shortDef: "Feedback loop controlling the cycle. Hypothalamus releases GnRH, pituitary releases FSH and LH, ovaries produce estrogen and progesterone.", status: "Published" },
  { slug: "follicular-wave", term: "Follicular wave", funnel: "Problem aware", topic: "Physiology", shortDef: "Cohort of roughly 15 to 20 follicles developing each cycle. One becomes dominant; the rest regress.", status: "Published" },
  { slug: "pre-ovulatory-phase", term: "Pre-ovulatory phase", funnel: "Problem aware", topic: "Physiology", shortDef: "Late follicular days (roughly 5 days before ovulation). Peak estrogen window.", status: "Published" },
  { slug: "post-ovulatory-phase", term: "Post-ovulatory phase", funnel: "Problem aware", topic: "Physiology", shortDef: "Synonym for luteal phase. Period from ovulation to the next menstruation.", status: "Published" },

  // C. Hormones (Solution aware)
  { slug: "estrogen", term: "Estrogen (estradiol)", funnel: "Solution aware", topic: "Hormones", shortDef: "Primary female sex hormone (form: estradiol). Peaks in late follicular and ovulatory phases. Supports BDNF, dopamine, and serotonin.", status: "Published" },
  { slug: "progesterone", term: "Progesterone", funnel: "Solution aware", topic: "Hormones", shortDef: "Dominant hormone of the luteal phase. Calming, sleep-promoting; raises body temperature roughly 0.5°F after ovulation.", status: "Published" },
  { slug: "testosterone-in-women", term: "Testosterone (in women)", funnel: "Solution aware", topic: "Hormones", shortDef: "Present in women at roughly 10% of male levels. Peaks in the ovulatory phase. Affects libido, assertiveness, and muscle synthesis.", status: "Published" },
  { slug: "fsh", term: "FSH (Follicle Stimulating Hormone)", funnel: "Solution aware", topic: "Hormones", shortDef: "Stimulates follicle growth in the early follicular phase. Released by the pituitary gland.", status: "Published" },
  { slug: "lh", term: "LH (Luteinizing Hormone)", funnel: "Solution aware", topic: "Hormones", shortDef: "Triggers ovulation when surging mid-cycle. Released by the pituitary gland.", status: "Published" },
  { slug: "lh-surge", term: "LH surge", funnel: "Solution aware", topic: "Hormones", shortDef: "Sudden 5 to 10x rise in LH roughly 24 to 36 hours before ovulation. Detected by ovulation predictor kits.", status: "Published" },
  { slug: "cortisol-cycle", term: "Cortisol (cycle interaction)", funnel: "Solution aware", topic: "Hormones", shortDef: "Stress hormone fluctuating across the cycle. Chronic elevation suppresses reproductive hormones and causes cycle irregularity.", status: "Published" },
  { slug: "prolactin", term: "Prolactin", funnel: "Solution aware", topic: "Hormones", shortDef: "Milk production hormone. High levels suppress ovulation (lactational amenorrhea and stress amenorrhea).", status: "Published" },
  { slug: "thyroid-cycle", term: "Thyroid hormones (cycle)", funnel: "Solution aware", topic: "Hormones", shortDef: "T3 and T4 levels affect cycle regularity. Hypothyroidism or hyperthyroidism commonly cause cycle disruption.", status: "Published" },
  { slug: "dhea", term: "DHEA (dehydroepiandrosterone)", funnel: "Solution aware", topic: "Hormones", shortDef: "Adrenal androgen precursor. Declines with age. Some research interest in supplementation for ovarian aging.", status: "Published" },
  { slug: "androgens-women", term: "Androgens (in women)", funnel: "Solution aware", topic: "Hormones", shortDef: "Group including testosterone and DHEA. Elevated in PCOS; cause acne, hirsutism, and cycle irregularity.", status: "Published" },
  { slug: "shbg", term: "SHBG (sex hormone binding globulin)", funnel: "Solution aware", topic: "Hormones", shortDef: "Liver-produced protein that binds sex hormones. High SHBG means low free hormone activity.", status: "Published" },
  { slug: "insulin-cycle", term: "Insulin (cycle interaction)", funnel: "Solution aware", topic: "Hormones", shortDef: "Insulin sensitivity varies across the cycle and drops in the luteal phase. Contributes to PMS cravings.", status: "Published" },
  { slug: "estrogen-dominance", term: "Estrogen dominance", funnel: "Solution aware", topic: "Hormones", shortDef: "Relative excess of estrogen versus progesterone. Linked to heavy periods, breast tenderness, and fibroids.", status: "Published" },
  { slug: "luteal-phase-defect", term: "Luteal phase defect", funnel: "Solution aware", topic: "Hormones", shortDef: "Inadequate progesterone production in the luteal phase. Associated with short luteal phase and early miscarriage.", status: "Published" },
  { slug: "phytoestrogens", term: "Phytoestrogens", funnel: "Solution aware", topic: "Hormones", shortDef: "Plant compounds (soy isoflavones, flax lignans) with weak estrogenic activity.", status: "Published" },
  { slug: "xenoestrogens", term: "Xenoestrogens", funnel: "Solution aware", topic: "Hormones", shortDef: "Synthetic chemicals (BPA, phthalates, parabens) mimicking estrogen. Considered endocrine disruptors.", status: "Published" },
  { slug: "hrt", term: "Hormone Replacement Therapy (HRT)", funnel: "Solution aware", topic: "Hormones", shortDef: "Estrogen and progestin therapy for perimenopause and menopause symptoms. Different from birth control.", status: "Published" },

  // D. Mechanism (Solution aware)
  { slug: "bdnf", term: "BDNF (Brain-Derived Neurotrophic Factor)", funnel: "Solution aware", topic: "Mechanism", shortDef: "Protein supporting neuron growth and plasticity. Estrogen upregulates BDNF; explains the follicular learning advantage.", status: "Published" },
  { slug: "dopamine-cycle", term: "Dopamine (cycle modulation)", funnel: "Solution aware", topic: "Mechanism", shortDef: "Reward and motivation neurotransmitter. Estrogen amplifies dopamine signaling, driving novelty-seeking in the follicular phase.", status: "Published" },
  { slug: "serotonin-cycle", term: "Serotonin (cycle modulation)", funnel: "Solution aware", topic: "Mechanism", shortDef: "Mood and sleep neurotransmitter. Drops in late luteal phase; underlies PMS mood symptoms.", status: "Published" },
  { slug: "gaba", term: "GABA", funnel: "Solution aware", topic: "Mechanism", shortDef: "Inhibitory neurotransmitter; calming. Boosted by allopregnanolone in the luteal phase.", status: "Published" },
  { slug: "allopregnanolone", term: "Allopregnanolone", funnel: "Solution aware", topic: "Mechanism", shortDef: "Progesterone metabolite that modulates GABA. Drops sharply in late luteal phase; contributes to PMDD symptoms.", status: "Published" },
  { slug: "infradian-rhythm", term: "Infradian rhythm", funnel: "Solution aware", topic: "Mechanism", shortDef: "Biological rhythm longer than 24 hours. The menstrual cycle is the primary female infradian rhythm.", status: "Published" },
  { slug: "circadian-rhythm", term: "Circadian rhythm (vs infradian)", funnel: "Solution aware", topic: "Mechanism", shortDef: "Roughly 24-hour rhythm. Interacts with the infradian cycle; sleep architecture shifts across the cycle.", status: "Published" },
  { slug: "hormone-cognition", term: "Hormone-cognition link", funnel: "Solution aware", topic: "Mechanism", shortDef: "Mechanism by which sex hormones affect cognitive performance (verbal fluency, working memory, spatial reasoning).", status: "Published" },
  { slug: "neuroplasticity-cycle", term: "Neuroplasticity (cycle modulation)", funnel: "Solution aware", topic: "Mechanism", shortDef: "Brain's adaptive capacity, modulated by estrogen and BDNF cycling. Highest in late follicular phase.", status: "Published" },
  { slug: "sleep-architecture-cycle", term: "Sleep architecture (cycle shifts)", funnel: "Solution aware", topic: "Mechanism", shortDef: "REM and deep sleep proportions shift with the cycle. Progesterone disrupts REM in late luteal phase.", status: "Published" },
  { slug: "hrv-cycle", term: "Heart rate variability (HRV) and cycle", funnel: "Solution aware", topic: "Mechanism", shortDef: "Autonomic balance marker. Drops in luteal phase as progesterone reduces parasympathetic tone.", status: "Published" },
  { slug: "body-temperature-cycle", term: "Body temperature regulation (cycle)", funnel: "Solution aware", topic: "Mechanism", shortDef: "Basal body temperature rises roughly 0.5°F after ovulation. Used to confirm ovulation retrospectively.", status: "Published" },
  { slug: "inflammation-cycle", term: "Inflammation (cycle modulation)", funnel: "Solution aware", topic: "Mechanism", shortDef: "Inflammatory markers cycle; rise in late luteal and menstrual phases. Drives PMS and period pain.", status: "Published" },
  { slug: "insulin-sensitivity-cycle", term: "Insulin sensitivity (cycle)", funnel: "Solution aware", topic: "Mechanism", shortDef: "Insulin sensitivity highest in follicular phase; drops in luteal. Affects energy, cravings, and training response.", status: "Published" },

  // E. The 4 Phases (Solution aware)
  { slug: "follicular-phase", term: "Follicular phase", funnel: "Solution aware", topic: "Phases", shortDef: "Day 1 to ovulation (10 to 16 days). FSH and rising estrogen dominate. Energy and creativity rise in late follicular days.", status: "Published" },
  { slug: "late-follicular-phase", term: "Late follicular phase", funnel: "Solution aware", topic: "Phases", shortDef: "Days 6 to 13 (post-period). Peak estrogen window. Best for learning and strength training.", status: "Published" },
  { slug: "ovulatory-phase", term: "Ovulatory phase", funnel: "Solution aware", topic: "Phases", shortDef: "Days 14 to 16. Peak estrogen plus LH surge. Verbal fluency and social ease peak here.", status: "Published" },
  { slug: "fertile-window", term: "Fertile window", funnel: "Solution aware", topic: "Phases", shortDef: "Five days before plus the day of ovulation. Sperm survive roughly 5 days in fertile cervical mucus.", status: "Published" },
  { slug: "luteal-phase", term: "Luteal phase", funnel: "Solution aware", topic: "Phases", shortDef: "Ovulation to next period (roughly 14 days). Progesterone dominant. Detail orientation and completion focus.", status: "Published" },
  { slug: "early-luteal-phase", term: "Early luteal phase", funnel: "Solution aware", topic: "Phases", shortDef: "Days 17 to 22. Peak detail-orientation window. Best for editing, QA, and closing tasks.", status: "Published" },
  { slug: "late-luteal-phase", term: "Late luteal phase (PMS week)", funnel: "Solution aware", topic: "Phases", shortDef: "Days 23 to 28. Serotonin and allopregnanolone drop. PMS symptoms peak. Reduce demands.", status: "Published" },
  { slug: "menstrual-phase", term: "Menstrual phase", funnel: "Solution aware", topic: "Phases", shortDef: "Days 1 to 5 (bleeding). All hormones low. Reflection and planning phase.", status: "Published" },
  { slug: "phase-transition", term: "Phase transition", funnel: "Solution aware", topic: "Phases", shortDef: "The 1 to 2 day window between phases. Symptoms often most noticeable here.", status: "Published" },
  { slug: "cycle-map", term: "Cycle map", funnel: "Solution aware", topic: "Phases", shortDef: "Visual representation of the four phases on a calendar with hormone overlay. Lumen's visual primitive.", status: "Published" },

  // F. Practice (Solution aware)
  { slug: "cycle-syncing", term: "Cycle syncing", funnel: "Solution aware", topic: "Practice", shortDef: "Practice of aligning lifestyle (work, exercise, diet) with the four hormonal phases. Coined by Alisa Vitti (FloLiving).", status: "Published" },
  { slug: "phase-based-scheduling", term: "Phase-based scheduling", funnel: "Solution aware", topic: "Practice", shortDef: "Scheduling tasks based on predicted cycle phase rather than calendar week. Core Lumen positioning.", status: "Published" },
  { slug: "cycle-aware-productivity", term: "Cycle-aware productivity", funnel: "Solution aware", topic: "Practice", shortDef: "Productivity framework using cycle phase as input for work mode planning. Distinct from period tracking.", status: "Published" },
  { slug: "work-mode-rotation", term: "Phase rotation (work modes)", funnel: "Solution aware", topic: "Practice", shortDef: "Mapping four work modes (Reflect, Build, Connect, Finish) onto the four cycle phases.", status: "Published" },
  { slug: "cycle-anchor-date", term: "Cycle anchor date", funnel: "Solution aware", topic: "Practice", shortDef: "Day 1 of the current period; the reference point for predicting all four phases of the current cycle.", status: "Published" },
  { slug: "cycle-reanchoring", term: "Cycle re-anchoring", funnel: "Solution aware", topic: "Practice", shortDef: "Updating phase predictions on day 1 of the new period. Necessary because cycles drift.", status: "Published" },
  { slug: "phase-aligned-workouts", term: "Phase-aligned workouts", funnel: "Solution aware", topic: "Practice", shortDef: "Adjusting workout intensity and type by phase. Evidence is mixed; the 2024 meta-analysis found small effects.", status: "Published" },
  { slug: "phase-aligned-nutrition", term: "Phase-aligned nutrition", funnel: "Solution aware", topic: "Practice", shortDef: "Eating different foods per phase. Most overclaimed corner of cycle syncing; evidence is mostly mechanistic.", status: "Published" },
  { slug: "phase-aligned-sleep", term: "Phase-aligned sleep", funnel: "Solution aware", topic: "Practice", shortDef: "Adjusting bedtime and caffeine cutoff by phase. Late luteal needs earlier wind-down.", status: "Published" },
  { slug: "phase-aligned-skincare", term: "Phase-aligned skincare", funnel: "Solution aware", topic: "Practice", shortDef: "Adjusting skincare by phase. Wellness-coded with minimal evidence.", status: "Published" },
  { slug: "seed-cycling", term: "Seed cycling", funnel: "Solution aware", topic: "Practice", shortDef: "Eating specific seeds (flax and pumpkin in follicular; sesame and sunflower in luteal). Evidence is anecdotal.", status: "Published" },
  { slug: "deep-work-follicular", term: "Deep work in follicular phase", funnel: "Solution aware", topic: "Practice", shortDef: "Scheduling cognitively demanding work in the late follicular phase. Lumen positioning.", status: "Published" },
  { slug: "editing-luteal", term: "Editing in luteal phase", funnel: "Solution aware", topic: "Practice", shortDef: "Reserving detail-oriented editing for the early luteal phase. Higher error detection sensitivity.", status: "Published" },

  // G. Tools (Product aware)
  { slug: "cycle-tracking", term: "Cycle tracking", funnel: "Product aware", topic: "Tools", shortDef: "Recording cycle data (period dates, symptoms, basal temperature) for prediction.", status: "Published" },
  { slug: "period-tracker", term: "Period tracker (vs cycle syncing app)", funnel: "Product aware", topic: "Tools", shortDef: "App that logs period dates and symptoms. Distinct from a cycle syncing app, which prescribes actions per phase.", status: "Published" },
  { slug: "symptom-logging", term: "Symptom logging", funnel: "Product aware", topic: "Tools", shortDef: "Recording subjective symptoms (energy, mood, cramps) daily to detect cycle patterns.", status: "Published" },
  { slug: "basal-body-temperature", term: "Basal body temperature (BBT)", funnel: "Product aware", topic: "Tools", shortDef: "Lowest body temperature at rest. Rises roughly 0.5°F after ovulation; confirms ovulation retrospectively.", status: "Published" },
  { slug: "bbt-thermometer", term: "BBT thermometer", funnel: "Product aware", topic: "Tools", shortDef: "Specialized thermometer (0.01°F precision) for tracking basal body temperature.", status: "Published" },
  { slug: "cervical-mucus-tracking", term: "Cervical mucus tracking", funnel: "Product aware", topic: "Tools", shortDef: "Observing changes in cervical mucus texture across the cycle. Egg-white consistency marks the fertile window.", status: "Published" },
  { slug: "fam", term: "Fertility Awareness Method (FAM)", funnel: "Product aware", topic: "Tools", shortDef: "Birth control method combining basal body temperature, cervical mucus, and cycle tracking.", status: "Published" },
  { slug: "sympto-thermal-method", term: "Sympto-thermal method", funnel: "Product aware", topic: "Tools", shortDef: "FAM variant combining BBT, cervical mucus, and symptom tracking. The highest-efficacy fertility awareness method.", status: "Published" },
  { slug: "standard-days-method", term: "Standard Days Method", funnel: "Product aware", topic: "Tools", shortDef: "Calendar-based FAM. Avoid intercourse days 8 to 19. Lower efficacy than sympto-thermal.", status: "Published" },
  { slug: "calendar-method", term: "Calendar method", funnel: "Product aware", topic: "Tools", shortDef: "Predicting ovulation purely from cycle calendar. The least reliable FAM variant.", status: "Published" },
  { slug: "lam", term: "Lactational Amenorrhea Method (LAM)", funnel: "Product aware", topic: "Tools", shortDef: "Using exclusive breastfeeding as birth control (first 6 months). Up to 98% effective if strict criteria are met.", status: "Published" },
  { slug: "opk", term: "Ovulation Predictor Kit (OPK)", funnel: "Product aware", topic: "Tools", shortDef: "Urine test detecting the LH surge. Predicts ovulation 24 to 36 hours ahead.", status: "Published" },
  { slug: "cycle-tracking-wearable", term: "Cycle tracking wearable", funnel: "Product aware", topic: "Tools", shortDef: "Wearable device (Oura, Whoop, Apple Watch) tracking basal body temp, HRV, and heart rate to predict phases.", status: "Published" },
  { slug: "continuous-fertility-monitor", term: "Continuous fertility monitor", funnel: "Product aware", topic: "Tools", shortDef: "Devices (Mira, Inito) measuring hormone metabolites in urine continuously.", status: "Published" },
  { slug: "phase-calculator", term: "Phase calculator", funnel: "Product aware", topic: "Tools", shortDef: "Tool converting last period date plus cycle length into the four phase date ranges. Lumen's core product.", status: "Published" },
  { slug: "cycle-data-export", term: "Cycle data export", funnel: "Product aware", topic: "Tools", shortDef: "Ability to download cycle history. Important for privacy and provider sharing. Varies by app.", status: "Published" },
  { slug: "privacy-first-tracking", term: "Privacy-first cycle tracking", funnel: "Product aware", topic: "Tools", shortDef: "Tracking with local-only data, no account, and no third-party sharing. Increasingly important post-Roe.", status: "Published" },

  // H. Conditions (Converting)
  { slug: "pcos", term: "PCOS (Polycystic Ovary Syndrome)", funnel: "Converting", topic: "Conditions", shortDef: "Endocrine disorder affecting 8 to 13% of women. Irregular ovulation plus androgen excess. Disrupts cycle syncing.", status: "Published" },
  { slug: "endometriosis", term: "Endometriosis", funnel: "Converting", topic: "Conditions", shortDef: "Endometrial-like tissue grows outside the uterus. Causes severe period pain and can affect cycle regularity.", status: "Published" },
  { slug: "adenomyosis", term: "Adenomyosis", funnel: "Converting", topic: "Conditions", shortDef: "Endometrial tissue grows into the uterine muscle wall. Causes heavy painful periods.", status: "Published" },
  { slug: "uterine-fibroids", term: "Uterine fibroids", funnel: "Converting", topic: "Conditions", shortDef: "Non-cancerous growths in the uterine wall. Common in 30s and 40s. Can cause heavy bleeding.", status: "Published" },
  { slug: "perimenopause", term: "Perimenopause", funnel: "Converting", topic: "Conditions", shortDef: "Hormonal transition before menopause (typically late 30s to 50s). Follicular phase shortens first.", status: "Published" },
  { slug: "postpartum-cycle-return", term: "Postpartum cycle return", funnel: "Converting", topic: "Conditions", shortDef: "First cycles after childbirth are often anovulatory and irregular. Predictions unreliable for 3 to 6 cycles.", status: "Published" },
  { slug: "lactational-amenorrhea", term: "Lactational amenorrhea", funnel: "Converting", topic: "Conditions", shortDef: "Suppression of ovulation during exclusive breastfeeding. Cycles may not return for months to over a year.", status: "Published" },
  { slug: "hypothalamic-amenorrhea", term: "Hypothalamic amenorrhea", funnel: "Converting", topic: "Conditions", shortDef: "Cycle loss from under-fueling, over-training, or chronic stress. Reversible; common in athletes.", status: "Published" },
  { slug: "poi", term: "Premature ovarian insufficiency", funnel: "Converting", topic: "Conditions", shortDef: "Loss of ovarian function before age 40. Affects roughly 1% of women.", status: "Published" },
  { slug: "red-s", term: "Female athlete triad / RED-S", funnel: "Converting", topic: "Conditions", shortDef: "Cluster: low energy availability plus menstrual dysfunction plus low bone density. Affects roughly 30% of female athletes.", status: "Published" },
  { slug: "fha", term: "Functional hypothalamic amenorrhea", funnel: "Converting", topic: "Conditions", shortDef: "Reversible cycle loss from stress or under-fueling. Treated by addressing the root cause, not adding hormones.", status: "Published" },
  { slug: "post-pill-amenorrhea", term: "Post-pill amenorrhea", funnel: "Converting", topic: "Conditions", shortDef: "Delayed cycle return after stopping hormonal birth control. Most resolve within 3 months.", status: "Published" },

  // I. Birth Control (Converting)
  { slug: "combined-hormonal-contraceptive", term: "Combined hormonal contraceptive", funnel: "Converting", topic: "Birth control", shortDef: "Estrogen plus progestin combination (pill, patch, ring). Suppresses ovulation; cycle syncing not applicable.", status: "Published" },
  { slug: "mini-pill", term: "Progestin-only pill (mini-pill)", funnel: "Converting", topic: "Birth control", shortDef: "Progestin without estrogen. Variable ovulation suppression; cycle syncing may partially apply.", status: "Published" },
  { slug: "hormonal-iud", term: "Hormonal IUD", funnel: "Converting", topic: "Birth control", shortDef: "Levonorgestrel-releasing IUD (Mirena, Kyleena, Liletta). Often suppresses ovulation; effect varies by user.", status: "Published" },
  { slug: "copper-iud", term: "Copper IUD", funnel: "Converting", topic: "Birth control", shortDef: "Non-hormonal IUD (Paragard). Does not suppress the cycle; cycle syncing applies normally.", status: "Published" },
  { slug: "contraceptive-implant", term: "Contraceptive implant (Nexplanon)", funnel: "Converting", topic: "Birth control", shortDef: "Etonogestrel implant. Suppresses ovulation in most users. Cycle syncing not applicable.", status: "Published" },
  { slug: "depo-provera", term: "Depo-Provera injection", funnel: "Converting", topic: "Birth control", shortDef: "Medroxyprogesterone injection every 3 months. Suppresses ovulation. Slow cycle return after stopping.", status: "Published" },
  { slug: "vaginal-ring", term: "Vaginal ring (NuvaRing)", funnel: "Converting", topic: "Birth control", shortDef: "Combined hormonal ring. Same hormonal effect as the combined pill.", status: "Published" },
  { slug: "contraceptive-patch", term: "Contraceptive patch", funnel: "Converting", topic: "Birth control", shortDef: "Combined hormonal patch. Same hormonal effect as the combined pill.", status: "Published" },
  { slug: "withdrawal-bleeding", term: "Withdrawal bleeding", funnel: "Converting", topic: "Birth control", shortDef: "Scheduled bleed during the placebo week of the combined pill. Not a true period.", status: "Published" },
  { slug: "emergency-contraception", term: "Emergency contraception (Plan B, Ella)", funnel: "Converting", topic: "Birth control", shortDef: "Post-coital contraceptive. Levonorgestrel (Plan B) or ulipristal (Ella). Effective up to 72 to 120 hours.", status: "Published" },
  { slug: "coming-off-birth-control", term: "Coming off birth control", funnel: "Converting", topic: "Birth control", shortDef: "Transition back to a natural cycle. May involve irregular cycles for 3 to 6 months.", status: "Published" },

  // J. Constrained practice (Converting)
  { slug: "cycle-syncing-on-birth-control", term: "Cycle syncing on birth control", funnel: "Converting", topic: "Practice", shortDef: "Method-by-method nuance: most hormonal methods suppress cycling; non-hormonal methods preserve it.", status: "Published" },
  { slug: "cycle-syncing-pcos", term: "Cycle syncing for PCOS", funnel: "Converting", topic: "Practice", shortDef: "Modified approach for irregular cycles. Track ovulation directly (OPK, BBT) rather than calendar predict.", status: "Published" },
  { slug: "cycle-syncing-perimenopause", term: "Cycle syncing in perimenopause", funnel: "Converting", topic: "Practice", shortDef: "Track shortening cycles and symptoms over months. Calendar predictions become unreliable.", status: "Published" },
  { slug: "cycle-syncing-endometriosis", term: "Cycle syncing for endometriosis", funnel: "Converting", topic: "Practice", shortDef: "Severe period pain disrupts standard menstrual phase recommendations. Pain management takes priority.", status: "Published" },
  { slug: "cycle-syncing-athletes", term: "Cycle syncing for athletes", funnel: "Converting", topic: "Practice", shortDef: "Training periodization aligned to the cycle. Stacy Sims framework; evidence mixed but practical.", status: "Published" },

  // K. Nutrition (Solution aware)
  { slug: "magnesium-pms", term: "Magnesium (for PMS)", funnel: "Solution aware", topic: "Nutrition", shortDef: "Mineral with moderate evidence for reducing PMS symptoms. Typical dose 200 to 400mg/day in glycinate form.", status: "Published" },
  { slug: "vitamin-b6-pms", term: "Vitamin B6 (for PMS)", funnel: "Solution aware", topic: "Nutrition", shortDef: "Cofactor for serotonin synthesis. Evidence for moderate PMS reduction. Dose 50 to 100mg/day.", status: "Published" },
  { slug: "iron-period", term: "Iron (period support)", funnel: "Solution aware", topic: "Nutrition", shortDef: "Lost during menstruation. Heavy bleeders are often iron-deficient. Test ferritin before supplementing.", status: "Published" },
  { slug: "omega-3-pms", term: "Omega-3 (for PMS, inflammation)", funnel: "Solution aware", topic: "Nutrition", shortDef: "EPA and DHA reduce inflammatory PMS symptoms. Dose 1 to 2g combined EPA/DHA daily.", status: "Published" },
  { slug: "vitex", term: "Vitex (chasteberry)", funnel: "Solution aware", topic: "Nutrition", shortDef: "Herbal extract with moderate evidence for cycle regularity and PMS. Affects prolactin and dopamine.", status: "Published" },
  { slug: "inositol-pcos", term: "Inositol (for PCOS)", funnel: "Solution aware", topic: "Nutrition", shortDef: "Myo and D-chiro inositol show evidence for improving ovulation and insulin sensitivity in PCOS.", status: "Published" },
  { slug: "spearmint-tea", term: "Spearmint tea (for PCOS)", funnel: "Solution aware", topic: "Nutrition", shortDef: "Anti-androgenic effects in small studies. Used for hirsutism in PCOS.", status: "Published" },

  // L. People & Research (Solution aware)
  { slug: "alisa-vitti", term: "Alisa Vitti / FloLiving", funnel: "Solution aware", topic: "People", shortDef: "Cycle syncing popularizer; FloLiving founder; author of WomanCode and In the FLO.", status: "Published" },
  { slug: "stacy-sims", term: "Stacy Sims", funnel: "Solution aware", topic: "People", shortDef: "Female athlete physiology researcher; author of ROAR. Cycle-aware training research.", status: "Published" },
  { slug: "lara-briden", term: "Lara Briden", funnel: "Solution aware", topic: "People", shortDef: "Naturopathic doctor; author of Period Repair Manual. Evidence-based women's health.", status: "Published" },
  { slug: "sundstrom-poromaa-2014", term: "Sundström-Poromaa & Gingnell 2014", funnel: "Solution aware", topic: "Research", shortDef: "Influential review of cognitive variation across the menstrual cycle. Used to ground evidence claims.", status: "Published" },
  { slug: "2024-exercise-meta", term: "2024 phase-timed exercise meta-analysis", funnel: "Solution aware", topic: "Research", shortDef: "Meta-analysis finding a small effect of phase-timed exercise on training outcomes. Cooled the hype.", status: "Published" },
] as const;
