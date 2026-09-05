import { User, Briefcase, BookOpen, Wrench, PanelsTopLeft } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import * as stylex from "@stylexjs/stylex";
import { Button } from "@/components/ui/button";
import sectionsData from "@/data/sections.json";
import { colors } from "../styles/Colors.stylex";
import { spacing } from "../styles/Spacing.stylex";
import {
  fontSizes,
  fontWeights,
  lineHeights,
} from "../styles/Typography.stylex";
import { motion } from "../styles/Motion.stylex";
import { layout } from "../styles/Layout.stylex";

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
    gap: spacing.space2,
  },
  button: {
    minHeight: layout.touchTarget,
    justifyContent: "flex-start",
    gap: spacing.space10,
    fontSize: fontSizes.titleSmall,
    lineHeight: lineHeights.line28,
    fontWeight: fontWeights.medium,
    color: {
      default: colors.textMuted,
      ":hover": colors.textStrong,
    },
    backgroundColor: {
      default: colors.transparent,
      ":hover": colors.surfaceHoverAlpha60,
    },
    transform: {
      default: null,
      ":hover": "scale(1.01)",
      [motion.reduce]: "none",
    },
    transitionProperty: "transform, color, background-color, font-weight",
    transitionDuration: motion.slow,
    transitionTimingFunction: motion.easeInOut,
  },
  active: {
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary,
  },
  icon: {
    width: 18,
    height: 18,
    flexShrink: 0,
  },
});
