import {
  Moon,
  Sprout,
  Sun,
  CircleDot,
  Brain,
  HeartPulse,
  Activity,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Calendar,
  Users,
  Sparkles,
  ClipboardList,
  GraduationCap,
  ListTodo,
  Presentation,
  MessageCircle,
  FileSearch,
  Network,
  type LucideIcon,
} from "lucide-react";
import type { Phase } from "./cycle-calculator";
import type { TaskType } from "./phase-data";

export const phaseIcons: Record<Phase, LucideIcon> = {
  menstrual: Moon,
  follicular: Sprout,
  ovulatory: Sun,
  luteal: CircleDot,
};

export const taskIcons: Record<TaskType, LucideIcon> = {
  deepWork: Brain,
  meetings: Users,
  creative: Sparkles,
  admin: ClipboardList,
  learning: GraduationCap,
  planning: ListTodo,
  presentations: Presentation,
  hardConvos: MessageCircle,
  detailWork: FileSearch,
  networking: Network,
};

export const sectionIcons = {
  hormone: Activity,
  brain: Brain,
  body: HeartPulse,
  schedule: CheckCircle2,
  avoid: AlertCircle,
  science: BookOpen,
  calendar: Calendar,
} as const;

export type { LucideIcon };
