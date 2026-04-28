import type { DayInfo } from "./cycle-calculator";
import type { Phase } from "./cycle-calculator";
import { getHormoneLevels, type HormoneLevels } from "./hormone-data";
import {
  phaseProfiles,
  taskLabels,
  taskRatings,
  type TaskType,
} from "./phase-data";

export type SubPhase = "early" | "mid" | "late";

export interface DayDetails {
  day: DayInfo;
  hormones: HormoneLevels;
  subPhase: SubPhase;
  hormoneSummary: string;
  cognitiveNote: string;
  bodyNote: string;
  topTasks: Array<{ task: TaskType; rating: number; reason: string }>;
  avoidTasks: Array<{ task: TaskType; rating: number; reason: string }>;
  scienceNote: string;
}

export function getDayDetails(
  day: DayInfo,
  cycleLength: number,
  periodLength: number,
): DayDetails {
  const hormones = getHormoneLevels(day.dayInCycle, cycleLength, periodLength);
  const subPhase = getSubPhase(day.dayInPhase, day.phaseLength);

  const hormoneSummary = describeHormones(hormones, day.phase, subPhase);
  const cognitiveNote = getCognitiveNote(day.phase, subPhase);
  const bodyNote = getBodyNote(day.phase, subPhase);
  const scienceNote = phaseProfiles[day.phase].scientificBacking;

  const ratings = (Object.keys(taskLabels) as TaskType[]).map((task) => ({
    task,
    rating: taskRatings[task][day.phase],
  }));
  const sorted = [...ratings].sort((a, b) => b.rating - a.rating);

  const topTasks = sorted.slice(0, 3).map(({ task, rating }) => ({
    task,
    rating,
    reason: getTaskReason(task, day.phase),
  }));

  const avoidTasks = sorted.slice(-3).reverse().map(({ task, rating }) => ({
    task,
    rating,
    reason: getTaskReason(task, day.phase),
  }));

  return {
    day,
    hormones,
    subPhase,
    hormoneSummary,
    cognitiveNote,
    bodyNote,
    topTasks,
    avoidTasks,
    scienceNote,
  };
}

function getSubPhase(dayInPhase: number, phaseLength: number): SubPhase {
  const ratio = dayInPhase / phaseLength;
  if (ratio <= 0.34) return "early";
  if (ratio <= 0.67) return "mid";
  return "late";
}

function describeHormones(h: HormoneLevels, phase: Phase, sub: SubPhase): string {
  const e = describe(h.estrogen);
  const p = describe(h.progesterone);
  if (phase === "ovulatory") {
    return `Estrogen ${e}, LH surge active, slight testosterone bump. Peak hormonal cognition window.`;
  }
  if (phase === "menstrual") {
    return `Estrogen ${e}, progesterone ${p}. Both hormones at cycle minimum — body diverts energy to menstruation.`;
  }
  if (phase === "follicular") {
    return `Estrogen ${e} (rising), progesterone ${p}. FSH bumping in early days; brain in novelty-seeking mode.`;
  }
  if (sub === "late") {
    return `Estrogen ${e} (dropping), progesterone ${p} (dropping). Pre-menstrual hormone withdrawal — PMS territory if you're prone.`;
  }
  return `Estrogen ${e}, progesterone ${p} (rising${sub === "mid" ? " near peak" : ""}). Calming, detail-focused state.`;
}

function describe(level: number): string {
  if (level < 25) return "low";
  if (level < 50) return "moderate";
  if (level < 75) return "elevated";
  return "high";
}

function getCognitiveNote(phase: Phase, sub: SubPhase): string {
  const map: Record<Phase, Record<SubPhase, string>> = {
    menstrual: {
      early: "Lowest cognitive demand window. Reflective, big-picture thinking serves you. Don't force execution.",
      mid: "Energy still low but mental fog often clearing. Light planning works. Don't expect peak output.",
      late: "Estrogen starting its slow climb. Capacity for new input returning. Use for soft re-entry.",
    },
    follicular: {
      early: "Rising estrogen primes neuroplasticity. Excellent for learning new skills, ideating, or starting projects.",
      mid: "Verbal memory and learning capacity climbing. Tackle the hardest cognitive lifts of the cycle here.",
      late: "Pre-ovulatory cognition near peak. Confidence rising. Schedule the ambitious work.",
    },
    ovulatory: {
      early: "LH surge underway. Verbal fluency and persuasion at cycle peak. Today is for people, not solo focus.",
      mid: "Peak window. Schedule the negotiation, presentation, hard conversation, or networking event.",
      late: "Estrogen plateauing. Last day of peak social cognition. Use it.",
    },
    luteal: {
      early: "Progesterone climbing. Calmer, more detail-oriented. Excellent for finishing started projects.",
      mid: "Peak progesterone. Detail work and editing strongest. Avoid starting new ambitious projects.",
      late: "Hormone withdrawal phase. Energy and verbal recall drop. Protect from emotional conversations. Light work only.",
    },
  };
  return map[phase][sub];
}

function getBodyNote(phase: Phase, sub: SubPhase): string {
  const map: Record<Phase, Record<SubPhase, string>> = {
    menstrual: {
      early: "Cramping common days 1-2. Iron loss real (~15-30mg). Eat iron-rich food, prioritize sleep, low-impact movement only.",
      mid: "Cramping easing. Energy still 60-70% baseline. Walks > workouts.",
      late: "Period winding down. Energy returning. Can resume light strength training.",
    },
    follicular: {
      early: "Recovery improving. Body tolerates higher training load. Insulin sensitivity high — carbs handled well.",
      mid: "Peak training tolerance window. Strength and endurance both supported.",
      late: "Pre-ovulation: peak performance for high-intensity work. Coordination strong.",
    },
    ovulatory: {
      early: "Body temperature rising slightly post-ovulation. Slight risk of ligament laxity — careful with high-impact.",
      mid: "Energy high but ligament laxity peaks. Power work fine; avoid max-load asymmetric lifts if injury-prone.",
      late: "Energy still high, body returning to balanced state.",
    },
    luteal: {
      early: "Body temp 0.3-0.5°C higher. Slightly reduced exercise tolerance. Strength still solid; cardio harder.",
      mid: "Mid-luteal: appetite up (real, not weakness). Cravings driven by progesterone. Carb timing matters.",
      late: "Pre-menstrual: water retention, breast tenderness, sleep often disrupted. Reduce caffeine if PMS-prone.",
    },
  };
  return map[phase][sub];
}

function getTaskReason(task: TaskType, phase: Phase): string {
  const reasons: Record<TaskType, Record<Phase, string>> = {
    deepWork: {
      menstrual: "Mental fog limits sustained focus; reflective work better.",
      follicular: "Rising estrogen enhances learning and concentration capacity.",
      ovulatory: "Cognitive resources pulled toward social/verbal — solo focus feels restless.",
      luteal: "Progesterone calming; sustained focus on familiar problems works well.",
    },
    meetings: {
      menstrual: "Social energy lowest; reschedule non-critical meetings.",
      follicular: "Verbal fluency climbing; collaboration productive.",
      ovulatory: "Peak verbal and emotional cognition — schedule the high-stakes meetings.",
      luteal: "Patience for back-to-backs reduced; batch shorter meetings.",
    },
    creative: {
      menstrual: "Right-brain reflective mode — useful for connecting patterns, less for ideation pressure.",
      follicular: "Novelty-seeking dopamine peak; brainstorming and new directions thrive.",
      ovulatory: "Confidence high but social cognition pulls outward; team creative > solo.",
      luteal: "Detail-creative (editing, refining) better than open ideation.",
    },
    admin: {
      menstrual: "Low-stimulation tasks tolerable; clear inbox during this window.",
      follicular: "Brain craves new — admin feels punishing.",
      ovulatory: "Wasted peak window; defer admin if possible.",
      luteal: "Detail-focus peak — perfect for admin, expense reports, organizing.",
    },
    learning: {
      menstrual: "Memory consolidation suppressed; absorption low.",
      follicular: "Estrogen-driven neuroplasticity peak — best learning window of cycle (Hampson 2020).",
      ovulatory: "Learning OK but social cognition demands attention.",
      luteal: "Reviewing learned material works; new acquisition harder.",
    },
    planning: {
      menstrual: "Big-picture strategic thinking peak — plan the next cycle.",
      follicular: "Tactical planning energetic but may overcommit.",
      ovulatory: "Planning under social cognition skew — beware optimistic estimates.",
      luteal: "Detail planning excellent; risk-aware mindset.",
    },
    presentations: {
      menstrual: "Verbal recall and energy lowest — high failure risk.",
      follicular: "Confidence and fluency climbing; solid choice.",
      ovulatory: "Peak verbal cognition — schedule here for maximum impact.",
      luteal: "Progesterone reduces verbal fluency late phase; avoid late-luteal presentations.",
    },
    hardConvos: {
      menstrual: "Emotional reserves lowest; defer.",
      follicular: "Diplomatic capacity present.",
      ovulatory: "Emotional recognition and confidence peak — best window for hard conversations.",
      luteal: "Progesterone + estrogen drop late phase amplifies emotional reactivity; avoid.",
    },
    detailWork: {
      menstrual: "Possible but not ideal — focus inconsistent.",
      follicular: "Detail-tolerance moderate; brain wants new.",
      ovulatory: "Restlessness undermines fine-grained work.",
      luteal: "Peak window for editing, proofing, finishing — progesterone supports detail focus.",
    },
    networking: {
      menstrual: "Social battery depleted; defer.",
      follicular: "Confidence rising; small networking productive.",
      ovulatory: "Peak social cognition + reading cues + warmth — best networking window.",
      luteal: "Energy and patience declining; conserve for must-attend events only.",
    },
  };
  return reasons[task][phase];
}
