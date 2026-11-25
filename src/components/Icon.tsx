import {
  BookOpen,
  LayoutDashboard,
  Globe2,
  MessagesSquare,
  ClipboardCheck,
  ChartNoAxesCombined,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Languages,
  Utensils,
  Flag,
  Music2,
  Sprout,
  GraduationCap,
  HeartHandshake,
  Accessibility,
  Volume2,
  Moon,
  Sun,
  Contrast,
  Menu,
  X,
  Check,
  ChevronRight,
  Lightbulb,
  ThumbsUp,
  RotateCcw,
  LogOut,
  LockKeyhole,
  CheckCheck,
  Users,
  Compass,
} from "lucide-react";
const icons = {
  book: BookOpen,
  dashboard: LayoutDashboard,
  globe: Globe2,
  messages: MessagesSquare,
  clipboard: ClipboardCheck,
  chart: ChartNoAxesCombined,
  arrow: ArrowUpRight,
  next: ArrowRight,
  sparkles: Sparkles,
  languages: Languages,
  utensils: Utensils,
  flag: Flag,
  music: Music2,
  sprout: Sprout,
  graduation: GraduationCap,
  heart: HeartHandshake,
  accessibility: Accessibility,
  volume: Volume2,
  moon: Moon,
  sun: Sun,
  contrast: Contrast,
  menu: Menu,
  x: X,
  check: Check,
  chevron: ChevronRight,
  idea: Lightbulb,
  like: ThumbsUp,
  reset: RotateCcw,
  logout: LogOut,
  lock: LockKeyhole,
  checks: CheckCheck,
  users: Users,
  compass: Compass,
};
export type IconName = keyof typeof icons;
export function Icon({
  name,
  size = 20,
  ...props
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  const Component = icons[name];
  return (
    <Component size={size} strokeWidth={1.75} aria-hidden="true" {...props} />
  );
}
