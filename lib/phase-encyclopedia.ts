import type { Phase } from "./cycle-calculator";

export interface HormoneProfile {
  hormone: string;
  level: string;
  note: string;
}

export interface PointWithSource {
  title: string;
  detail: string;
  source?: string;
}

export interface RecommendedRead {
  title: string;
  author: string;
  note: string;
}

export interface PhaseEncyclopedia {
  longDescription: string;
  hormoneProfile: HormoneProfile[];
  cognitiveChanges: PointWithSource[];
  physicalChanges: PointWithSource[];
  leanInto: string[];
  defer: string[];
  commonMistakes: string[];
  recommendedReading: RecommendedRead[];
}

export const phaseEncyclopedia: Record<Phase, PhaseEncyclopedia> = {
  menstrual: {
    longDescription:
      "The opening days of your cycle, when both estrogen and progesterone sit at their lowest of the month. Often experienced as 'low energy', the menstrual phase is also when activity in the corpus callosum shifts and your brain trends toward right-brain dominance — strategic, reflective, pattern-connecting work suits this state. This is your built-in retrospective. Don't fight it; use it.",
    hormoneProfile: [
      { hormone: "Estrogen", level: "Very low (~15% of cycle peak)", note: "Begins climbing slowly by day 3-4" },
      { hormone: "Progesterone", level: "Very low (~5% of peak)", note: "Will stay low until after ovulation" },
      { hormone: "FSH", level: "Slight bump days 2-5", note: "Signals next round of follicle development" },
      { hormone: "LH", level: "Low", note: "Won't surge until ovulation" },
    ],
    cognitiveChanges: [
      {
        title: "Right-brain dominance peaks early menstrual",
        detail: "Strategic, big-picture, intuitive thinking is supported. Pattern recognition strong. Use for retrospectives, planning, and connecting dots from past months.",
        source: "Hausmann 2020",
      },
      {
        title: "Verbal recall slightly suppressed",
        detail: "Word-finding and rapid recall can feel slower. Avoid memory-heavy tasks like presentations or live debates if you can defer.",
        source: "Hampson 2020",
      },
      {
        title: "Reduced cognitive bandwidth for novelty",
        detail: "Your brain prefers familiar problems and reflection over new input. Save the fresh learning for follicular.",
      },
      {
        title: "Emotional clarity improves day 3-5",
        detail: "As prostaglandins decrease, mood regulation improves. Late menstrual is good for honest journaling and personal review.",
      },
    ],
    physicalChanges: [
      {
        title: "Iron loss 15-30mg over the cycle",
        detail: "Heavier days 1-2. If you have anemia or thalassemia trait (low MCV), pay attention — fatigue compounds. Iron-rich food critical here.",
      },
      {
        title: "Basal body temperature lowest of cycle",
        detail: "Body running 0.3-0.5°C cooler than luteal. Cardio capacity slightly higher; prefer warm-ups longer.",
      },
      {
        title: "Insulin sensitivity peaks",
        detail: "Body uses carbs efficiently. Don't restrict — this is the worst time to cut calories. Body needs more, not less.",
      },
      {
        title: "Cortisol slightly elevated days 1-2",
        detail: "Recovery from intense workouts slower. Walks > workouts. Yoga, mobility, restorative movement.",
      },
    ],
    leanInto: [
      "Cycle retrospective: what worked last month, what to change",
      "Strategic planning for the cycle ahead",
      "Light reading, reviewing past notes, journaling",
      "Low-impact movement: walks, mobility, restorative yoga",
      "Iron-rich nutrition: red meat, lentils, spinach paired with vitamin C",
      "Extra sleep — body needs it; this is investment, not laziness",
    ],
    defer: [
      "High-stakes presentations or pitches",
      "New project launches",
      "Networking events or panels",
      "Heavy strength training (especially days 1-2)",
      "Difficult emotional conversations",
      "High-volume admin requiring sustained focus",
    ],
    commonMistakes: [
      "Forcing peak-phase productivity expectations onto menstrual self → frustration spiral",
      "Cutting calories during menstruation — body needs more energy, not less",
      "Skipping iron-rich food → fatigue worsens days 3-5",
      "Dismissing the phase as 'just feeling tired' instead of strategically using it",
      "Scheduling presentations in this phase because the calendar said so",
    ],
    recommendedReading: [
      { title: "ROAR", author: "Stacy Sims, PhD", note: "Chapter on menstrual phase nutrition + training" },
      { title: "The XX Brain", author: "Lisa Mosconi, PhD", note: "Female brain hormone research" },
    ],
  },

  follicular: {
    longDescription:
      "Estrogen rising. This is your brain's growth phase: BDNF (brain-derived neurotrophic factor) climbs, dopamine sensitivity increases, and neuroplasticity peaks. You're wired for novelty, learning, and confidence. Tackle the hardest cognitive lifts of the cycle here. The window is short — usually 7-10 days — and biologically optimized for ambitious work.",
    hormoneProfile: [
      { hormone: "Estrogen", level: "Rising (20→90% of peak)", note: "Steepest climb in last 3 days before ovulation" },
      { hormone: "Progesterone", level: "Low", note: "Stays low until ovulation" },
      { hormone: "FSH", level: "Moderate, declining", note: "Selected dominant follicle taking over" },
      { hormone: "LH", level: "Slowly rising", note: "Sets up the LH surge for ovulation" },
    ],
    cognitiveChanges: [
      {
        title: "Neuroplasticity peaks pre-ovulation",
        detail: "Estrogen enhances BDNF, dendritic spine density, and synaptic plasticity in hippocampus. Translation: best learning window of the cycle.",
        source: "Hampson 2020",
      },
      {
        title: "Verbal memory and learning capacity climb",
        detail: "New material absorbed faster, retained better. If you have an exam, certification, or skill to learn — schedule deep practice here.",
        source: "Sundström-Poromaa 2014",
      },
      {
        title: "Dopamine sensitivity increases",
        detail: "Novelty feels rewarding. Motivation to start new projects strongest. Risk: overcommitment — see common mistakes.",
      },
      {
        title: "Confidence and risk tolerance climb",
        detail: "You're more willing to make decisions, take action, ship work. Use it but stress-test bigger decisions before ovulation peak.",
      },
    ],
    physicalChanges: [
      {
        title: "Recovery and training tolerance peak",
        detail: "Body handles higher training volume and intensity. PRs often happen here. Plan progressive overload around this window.",
      },
      {
        title: "Insulin sensitivity high",
        detail: "Carbs handled well. Strength gains supported. Don't fear higher carb intake on heavy training days.",
      },
      {
        title: "Skin and hair often look best",
        detail: "Estrogen supports collagen, sebum balance. Coincidence? Biology — and visible.",
      },
      {
        title: "Sleep efficiency improves",
        detail: "Body temperature stable, cortisol regulated. Use this — quality sleep compounds the cognitive gains.",
      },
    ],
    leanInto: [
      "Start the project you've been deferring",
      "Take the course, read the technical book, learn the new skill",
      "Pitch new ideas, draft proposals, sketch new directions",
      "Heaviest training days — strength, intensity, skill acquisition",
      "Brainstorming sessions, ideation workshops",
      "Negotiate / decide on bigger commitments (capacity is real)",
    ],
    defer: [
      "Heavy admin or repetitive tasks (will feel punishing)",
      "Detail editing of finished work (better in luteal)",
      "Closing tasks / shutting things down",
    ],
    commonMistakes: [
      "Overcommitting in this phase → luteal-you suffers under the weight",
      "Wasting peak window on admin or low-value meetings",
      "Not scheduling enough actual deep work — it's the prime window for it",
      "Underestimating sleep requirements during heavy training",
      "Starting too many things in parallel (dopamine bias)",
    ],
    recommendedReading: [
      { title: "ROAR", author: "Stacy Sims, PhD", note: "Follicular phase training programming" },
      { title: "Hormones, brain, and behaviour", author: "Hampson E. (2020)", note: "Peer-reviewed review on cycle cognition" },
    ],
  },

  ovulatory: {
    longDescription:
      "Three days. Estrogen at cycle peak, LH surging, slight testosterone bump. This is your social and verbal cognition window — the time when your brain is biologically primed for high-stakes communication: pitching, presenting, negotiating, networking, hard conversations. The window is short. Calendar around it intentionally.",
    hormoneProfile: [
      { hormone: "Estrogen", level: "Peak (~85-90% of cycle max)", note: "Briefly dips at ovulation, returns" },
      { hormone: "LH", level: "SURGE — peak day", note: "Triggers ovulation 24-36h after surge starts" },
      { hormone: "Testosterone", level: "Slight bump", note: "Adds to confidence and assertiveness" },
      { hormone: "Progesterone", level: "Starts climbing post-ovulation", note: "Will dominate luteal" },
    ],
    cognitiveChanges: [
      {
        title: "Verbal fluency at cycle peak",
        detail: "Word-finding, persuasion, articulating complex ideas — all peak here. Studies show measurable improvements in verbal IQ tasks during ovulatory phase.",
        source: "Hampson 2020",
      },
      {
        title: "Emotional recognition sharpest",
        detail: "Reading body language, microexpressions, and social context measurably better. Negotiation advantage.",
        source: "Sundström-Poromaa 2014",
      },
      {
        title: "Confidence + assertiveness peak",
        detail: "Combination of estrogen + testosterone. Decisions feel decisive. Speak in meetings — your authority lands differently.",
      },
      {
        title: "Solo deep work feels restless",
        detail: "Cognitive resources pull toward social/verbal output. Save heads-down focus for follicular or luteal.",
      },
    ],
    physicalChanges: [
      {
        title: "Body temperature rises 0.3-0.5°C post-ovulation",
        detail: "Stays elevated through luteal. Cardio feels harder; same effort = higher heart rate.",
      },
      {
        title: "Ligament laxity peaks",
        detail: "Increased risk of ACL and other ligament injuries during high-impact, asymmetric, or rotational movements. Scale heavy max-effort lifts carefully.",
      },
      {
        title: "Energy still high but pivoting",
        detail: "Coordination and reaction time still strong. Power output excellent. Watch the laxity caveat above.",
      },
      {
        title: "Libido often peaks",
        detail: "Biology. Worth knowing — can affect focus, social energy.",
      },
    ],
    leanInto: [
      "Schedule the high-stakes presentation, pitch, or negotiation",
      "Hard conversations: feedback, breakups, salary, conflict resolution",
      "Networking events, panels, podcast appearances, podcasts you guest on",
      "Sales calls, fundraising pitches",
      "Workshops or talks where you're presenting",
      "Hardest training: power output, sprints, plyos (with laxity caveat)",
    ],
    defer: [
      "Solo deep focus work (will feel restless)",
      "Detail editing or proofreading",
      "Heavy admin batches",
      "Long heads-down writing sessions",
    ],
    commonMistakes: [
      "Wasting peak social window on solo work — ovulatory is for people, not screens",
      "Not scheduling the hard conversation here when it could go best",
      "Overestimating max strength training without accounting for ligament laxity risk",
      "Booking back-to-back solo deep work blocks that feel impossible",
      "Underprepping for the high-stakes meeting because you're 'on' anyway (preparation still matters)",
    ],
    recommendedReading: [
      { title: "Hampson 2020", author: "Hormones and Behavior", note: "Verbal fluency studies in ovulatory phase" },
      { title: "Sundström-Poromaa 2014", author: "Frontiers in Neuroscience", note: "Emotional cognition across cycle" },
    ],
  },

  luteal: {
    longDescription:
      "Progesterone takes over. Calmer, slower, more detail-oriented. Early luteal still feels productive — like a controlled descent. Mid-luteal is detail-work nirvana. Late luteal (last 3-4 days) is hormonal withdrawal: estrogen and progesterone both drop, mimicking some symptoms of mild depression in 75% of women. Plan accordingly. This is finishing season, not starting season.",
    hormoneProfile: [
      { hormone: "Progesterone", level: "Rising → peak (mid) → drop (late)", note: "The dominant hormone of this phase" },
      { hormone: "Estrogen", level: "Secondary peak then decline", note: "Drops sharply in last 3-4 days" },
      { hormone: "FSH", level: "Suppressed", note: "Will rebound when next cycle starts" },
      { hormone: "LH", level: "Low", note: "Quiet phase for LH" },
    ],
    cognitiveChanges: [
      {
        title: "Detail orientation peaks",
        detail: "Progesterone supports sustained focus on familiar, repetitive cognitive work. Editing, proofreading, organizing systems — strong.",
      },
      {
        title: "Verbal fluency declines (especially late luteal)",
        detail: "The opposite of ovulatory. Word-finding slower, presentations harder. Defer if you can.",
        source: "Hampson 2020",
      },
      {
        title: "Risk-aversion climbs",
        detail: "Decisions feel more cautious. Useful for stress-testing plans made in follicular optimism. Don't make big new commitments here — review them.",
      },
      {
        title: "Late luteal: emotional reactivity rises",
        detail: "Hormone withdrawal mimics serotonin drop. 75% of menstruating women experience PMS to some degree (ACOG). If prone, protect emotional load.",
        source: "ACOG",
      },
    ],
    physicalChanges: [
      {
        title: "Body temperature elevated 0.3-0.5°C",
        detail: "Cardio feels harder. Same heart rate = lower output. Adjust expectations on conditioning work.",
      },
      {
        title: "Appetite genuinely increases",
        detail: "Mid-luteal: BMR rises ~5-10%. Cravings driven by progesterone, not weakness. Eat more, especially protein and complex carbs.",
      },
      {
        title: "Water retention common late luteal",
        detail: "Bloating, breast tenderness, slight weight increase. Real, expected, transient. Reduce sodium if uncomfortable.",
      },
      {
        title: "Sleep quality often degrades late luteal",
        detail: "Body temp + progesterone drop disrupt deep sleep. Reduce caffeine, prioritize bedtime.",
      },
    ],
    leanInto: [
      "Editing finished work — drafts, code, designs, copy",
      "Detail-heavy admin: expense reports, organizing files, cleaning email",
      "Closing out projects, tying loose ends, shipping the thing",
      "Reviewing and refining (vs. starting new)",
      "Strength training works well early-mid luteal; reduce volume late",
      "Higher protein intake, complex carbs, regular meals",
    ],
    defer: [
      "Starting new ambitious projects (you'll abandon them in menstrual)",
      "High-stakes presentations late luteal",
      "Emotional conversations late luteal (reactivity high)",
      "Networking events that drain energy without clear ROI",
      "Restrictive diets — they backfire in this phase",
    ],
    commonMistakes: [
      "Treating mid-luteal appetite as a willpower failure — it's BMR + progesterone",
      "Scheduling presentations late luteal because 'I should be able to'",
      "Cutting calories aggressively → cravings worsen + late-luteal mood crashes harder",
      "Starting new things in luteal optimism → abandoning in menstrual reality",
      "Ignoring late-luteal emotional reactivity → unnecessary conflict",
      "Over-caffeinating to counter fatigue → wrecks sleep further",
    ],
    recommendedReading: [
      { title: "ROAR", author: "Stacy Sims, PhD", note: "Luteal phase nutrition + training adjustments" },
      { title: "Period Power", author: "Maisie Hill", note: "Late luteal management strategies" },
      { title: "ACOG PMS Guidelines", author: "American College of OB-GYN", note: "Clinical PMS criteria" },
    ],
  },
};
