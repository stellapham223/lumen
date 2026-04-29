import type { Phase } from "./cycle-calculator";

export type TaskType =
  | "deepWork"
  | "meetings"
  | "creative"
  | "admin"
  | "learning"
  | "planning"
  | "presentations"
  | "hardConvos"
  | "detailWork"
  | "networking";

export interface PhaseProfile {
  name: string;
  shortLabel: string;
  description: string;
  hormoneState: string;
  cognitiveStrength: string;
  bestFor: TaskType[];
  avoidWhenPossible: TaskType[];
  energyTip: string;
  scientificBacking: string;
  color: {
    bg: string;
    text: string;
    border: string;
    accent: string;
  };
}

export const taskLabels: Record<TaskType, string> = {
  deepWork: "Deep work",
  meetings: "Meetings",
  creative: "Creative work",
  admin: "Admin tasks",
  learning: "Learning",
  planning: "Planning",
  presentations: "Presentations",
  hardConvos: "Hard conversations",
  detailWork: "Detail work",
  networking: "Networking",
};

export const phaseProfiles: Record<Phase, PhaseProfile> = {
  menstrual: {
    name: "Menstrual",
    shortLabel: "Reflect",
    description:
      "Energy is at its lowest. Your body is asking for rest, and your mind for big-picture thinking, not execution.",
    hormoneState: "Estrogen low, progesterone low",
    cognitiveStrength:
      "Strategic thinking, intuition, big-picture reflection. Right-brain dominant; good for connecting patterns.",
    bestFor: ["planning", "creative", "learning"],
    avoidWhenPossible: ["presentations", "hardConvos", "networking"],
    energyTip:
      "Don't fight the dip. Use this phase to review what's working and plan the next cycle. Schedule shallow tasks if anything.",
    scientificBacking:
      "Estrogen and progesterone both low; neurotransmitter activity (serotonin, dopamine) lower. Body diverts energy to menstruation.",
    color: {
      bg: "bg-rose-50",
      text: "text-rose-900",
      border: "border-rose-200",
      accent: "bg-rose-500",
    },
  },
  follicular: {
    name: "Follicular",
    shortLabel: "Build",
    description:
      "Estrogen rising. Your brain is novelty-seeking and primed for learning. The best time to start something new.",
    hormoneState: "Estrogen rising, progesterone low",
    cognitiveStrength:
      "Learning new skills, creative ideation, problem-solving with new frameworks. High motivation and tolerance for ambiguity.",
    bestFor: ["learning", "creative", "deepWork", "planning"],
    avoidWhenPossible: ["admin", "detailWork"],
    energyTip:
      "Start the project you've been putting off. Take the course. Sketch the new product. Your brain wants new; feed it.",
    scientificBacking:
      "Rising estrogen enhances neuroplasticity, BDNF, and dopamine sensitivity. Studies show improved verbal memory and learning capacity.",
    color: {
      bg: "bg-amber-50",
      text: "text-amber-900",
      border: "border-amber-200",
      accent: "bg-amber-500",
    },
  },
  ovulatory: {
    name: "Ovulatory",
    shortLabel: "Connect",
    description:
      "Peak estrogen. Verbal fluency and social cognition spike. This is your social superpower window.",
    hormoneState: "Estrogen peak, slight testosterone bump, LH surge",
    cognitiveStrength:
      "Verbal fluency, persuasion, reading social cues, confident decision-making, negotiation.",
    bestFor: ["presentations", "hardConvos", "meetings", "networking"],
    avoidWhenPossible: ["detailWork", "admin"],
    energyTip:
      "Schedule the hard conversation now. The pitch. The negotiation. The networking event. Solo deep work feels restless; use this phase for people work.",
    scientificBacking:
      "Estrogen at cycle peak. Studies (Hampson 2020, Sundström-Poromaa 2014) show enhanced verbal fluency and emotional recognition. Slight testosterone increase boosts confidence.",
    color: {
      bg: "bg-emerald-50",
      text: "text-emerald-900",
      border: "border-emerald-200",
      accent: "bg-emerald-500",
    },
  },
  luteal: {
    name: "Luteal",
    shortLabel: "Finish",
    description:
      "Progesterone rises, estrogen drops late. Your brain wants to finish things, not start them. Detail-oriented mode.",
    hormoneState: "Progesterone rising then dropping, estrogen drops late",
    cognitiveStrength:
      "Detail-orientation, completing tasks, editing, organizing. Better tolerance for repetitive work.",
    bestFor: ["detailWork", "admin", "deepWork", "planning"],
    avoidWhenPossible: ["presentations", "hardConvos"],
    energyTip:
      "Tie up loose ends. Edit the doc. File the receipts. Close the tabs. Late luteal (last 3-4 days): protect your energy. Avoid emotional conversations.",
    scientificBacking:
      "Rising progesterone is calming but also linked to lower verbal fluency and increased fatigue late in phase. Estrogen drop pre-menstrual associated with PMS symptoms in 75% of menstruating women (ACOG).",
    color: {
      bg: "bg-violet-50",
      text: "text-violet-900",
      border: "border-violet-200",
      accent: "bg-violet-500",
    },
  },
};

export const taskRatings: Record<TaskType, Record<Phase, number>> = {
  deepWork: { menstrual: 3, follicular: 4, ovulatory: 3, luteal: 4 },
  meetings: { menstrual: 2, follicular: 4, ovulatory: 5, luteal: 3 },
  creative: { menstrual: 3, follicular: 5, ovulatory: 4, luteal: 3 },
  admin: { menstrual: 4, follicular: 2, ovulatory: 2, luteal: 5 },
  learning: { menstrual: 2, follicular: 5, ovulatory: 4, luteal: 3 },
  planning: { menstrual: 5, follicular: 4, ovulatory: 3, luteal: 3 },
  presentations: { menstrual: 1, follicular: 4, ovulatory: 5, luteal: 2 },
  hardConvos: { menstrual: 2, follicular: 3, ovulatory: 5, luteal: 2 },
  detailWork: { menstrual: 3, follicular: 3, ovulatory: 2, luteal: 5 },
  networking: { menstrual: 2, follicular: 4, ovulatory: 5, luteal: 2 },
};

export function getRatingLabel(rating: number): string {
  if (rating >= 5) return "Peak fit";
  if (rating === 4) return "Strong fit";
  if (rating === 3) return "Neutral";
  if (rating === 2) return "Hard mode";
  return "Avoid";
}
