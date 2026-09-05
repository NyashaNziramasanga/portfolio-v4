import { User, Briefcase, BookOpen, Wrench, PanelsTopLeft } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import * as stylex from "@stylexjs/stylex";
import { Button } from "@/components/ui/button";
import sectionsData from "@/data/sections.json";
import { colors, constants } from "../styles/tokens.stylex";

const SECTION_ICONS: Record<string, LucideIcon> = {
  about: User,
  "flagship-work": PanelsTopLeft,
  experience: Briefcase,
  publications: BookOpen,
  tools: Wrench,
};

export function SidebarNav({
  activeSection,
  onSelect,
}: {
  activeSection: string;
  onSelect: (id: string) => void;
}) {
  return (
    <nav aria-label="Page sections" {...stylex.props(styles.root)}>
      {sectionsData.map(({ id, label }) => {
        const Icon = SECTION_ICONS[id];
        return (
          <Button
            key={id}
            variant="ghost"
            aria-current={activeSection === id ? "true" : undefined}
            style={[styles.button, activeSection === id && styles.active]}
            onClick={() => onSelect(id)}
          >
            {Icon && <Icon {...stylex.props(styles.icon)} />}
            {label}
          </Button>
        );
      })}
    </nav>
  );
}

const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  button: {
    minHeight: 44,
    justifyContent: "flex-start",
    gap: 10,
    fontSize: 18,
    lineHeight: "28px",
    fontWeight: 500,
    color: {
      default: colors.brand300,
      ":hover": colors.brand100,
    },
    backgroundColor: {
      default: "transparent",
      ":hover": "color-mix(in oklab, #2D3748 60%, transparent)",
    },
    transform: {
      default: null,
      ":hover": "scale(1.01)",
      [constants.reduceMotion]: "none",
    },
    transitionProperty: "transform, color, background-color, font-weight",
    transitionDuration: constants.durationSlow,
    transitionTimingFunction: "ease-in-out",
  },
  active: {
    fontWeight: 600,
    color: colors.brand50,
  },
  icon: {
    width: 18,
    height: 18,
    flexShrink: 0,
  },
});
