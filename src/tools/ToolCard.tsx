import { Link } from "@tanstack/react-router";
import { ChevronRight, Wrench } from "lucide-react";
import * as stylex from "@stylexjs/stylex";
import type { ToolListItem } from "@/tools/types";
import { track } from "@vercel/analytics/react";
import { colors } from "../styles/Colors.stylex";
import { spacing } from "../styles/Spacing.stylex";
import { radii } from "../styles/BorderRadius.stylex";
import {
  fontSizes,
  fontWeights,
  lineHeights,
} from "../styles/Typography.stylex";
import { motion } from "../styles/Motion.stylex";
import { breakpoints } from "../styles/Breakpoints.stylex";
import { shadows } from "../styles/Shadows.stylex";

type ToolCardProps = {
  tool: ToolListItem;
};

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link
      to="/tools/$toolId"
      params={{ toolId: tool.slug }}
      onClick={() => track("Tool Opened", { tool: tool.slug })}
      {...stylex.props(styles.card, stylex.defaultMarker())}
    >
      <div {...stylex.props(styles.row)}>
        <div {...stylex.props(styles.iconBox)}>
          <Wrench {...stylex.props(styles.wrench)} />
        </div>

        <div {...stylex.props(styles.copy)}>
          <p {...stylex.props(styles.title)}>{tool.title}</p>
          <p {...stylex.props(styles.description)}>{tool.description}</p>
        </div>

        <ChevronRight {...stylex.props(styles.chevron)} />
      </div>
    </Link>
  );
}

const styles = stylex.create({
  card: {
    borderRadius: {
      default: radii.lg,
      [breakpoints.sm]: radii.xl,
    },
    backgroundColor: {
      default: colors.surface,
      ":hover": colors.surfaceHover,
    },
    paddingInline: {
      default: spacing.md,
      [breakpoints.sm]: spacing.xl,
    },
    paddingBlock: {
      default: spacing.md,
      [breakpoints.sm]: spacing.lg,
    },
    color: colors.textPrimary,
    boxShadow: {
      default: shadows.elevationXs,
      ":hover": shadows.elevationMd,
      ":focus-visible": shadows.focusOffsetBackground,
    },
    transform: {
      default: "translateY(0)",
      ":hover": "translateY(-2px)",
    },
    transitionProperty: "all",
    transitionDuration: motion.slow,
    transitionTimingFunction: motion.easeOut,
    outline: {
      ":focus-visible": "none",
    },
  },
  row: {
    display: "flex",
    alignItems: "flex-start",
    gap: {
      default: spacing.sm,
      [breakpoints.sm]: spacing.md,
    },
  },
  iconBox: {
    marginTop: spacing.xxs,
    display: "flex",
    height: {
      default: 32,
      [breakpoints.sm]: 40,
    },
    width: {
      default: 32,
      [breakpoints.sm]: 40,
    },
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.sm,
    backgroundColor: colors.surfaceHover,
    color: colors.accent,
  },
  wrench: {
    width: {
      default: 16,
      [breakpoints.sm]: 20,
    },
    height: {
      default: 16,
      [breakpoints.sm]: 20,
    },
  },
  copy: {
    minWidth: 0,
    flex: "1",
  },
  title: {
    fontSize: {
      default: fontSizes.bodySmall,
      [breakpoints.sm]: fontSizes.bodyLarge,
    },
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.snug,
    color: colors.textPrimary,
  },
  description: {
    marginTop: spacing.xxs,
    fontSize: {
      default: fontSizes.label,
      [breakpoints.sm]: fontSizes.body,
    },
    lineHeight: {
      default: lineHeights.line16,
      [breakpoints.sm]: lineHeights.line20,
    },
    color: colors.textMuted,
  },
  chevron: {
    marginTop: spacing.xxs,
    width: {
      default: 16,
      [breakpoints.sm]: 20,
    },
    height: {
      default: 16,
      [breakpoints.sm]: 20,
    },
    flexShrink: 0,
    color: {
      default: colors.textMuted,
      [stylex.when.ancestor(":hover")]: colors.textStrong,
    },
    transform: {
      default: "translateX(0)",
      [stylex.when.ancestor(":hover")]: "translateX(2px)",
    },
    transitionProperty: "transform, color",
    transitionDuration: motion.slow,
  },
});
