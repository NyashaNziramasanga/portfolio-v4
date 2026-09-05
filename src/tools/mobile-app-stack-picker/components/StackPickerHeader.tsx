import * as stylex from "@stylexjs/stylex";
import { colors } from "../../../styles/Colors.stylex";
import { spacing } from "../../../styles/Spacing.stylex";
import { radii } from "../../../styles/BorderRadius.stylex";
import {
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacing,
} from "../../../styles/Typography.stylex";
import { breakpoints } from "../../../styles/Breakpoints.stylex";
import { layout } from "../../../styles/Layout.stylex";

export function StackPickerHeader() {
  return (
    <header {...stylex.props(styles.root)}>
      <h2 {...stylex.props(styles.title)}>
        Pick a <span {...stylex.props(styles.accent)}>stack</span>. Ship it.
      </h2>
      <p {...stylex.props(styles.description)}>
        Click through each layer to build your mobile app stack. Export a clean
        prompt you can paste into your workflow.
      </p>

      <div {...stylex.props(styles.tags)}>
        <span {...stylex.props(styles.primaryTag)}>single click to select</span>
        <span {...stylex.props(styles.tag)}>click again to deselect</span>
        <span {...stylex.props(styles.tag)}>
          picks appear in the bottom bar
        </span>
      </div>
    </header>
  );
}

const styles = stylex.create({
  root: {
    marginBottom: {
      default: spacing.xl,
      [breakpoints.sm]: spacing.xxl,
    },
  },
  title: {
    fontSize: {
      default: fontSizes.displaySmall,
      [breakpoints.sm]: fontSizes.displayLarge,
    },
    lineHeight: {
      default: lineHeights.line36,
      [breakpoints.sm]: lineHeights.none,
    },
    fontWeight: fontWeights.extraBold,
    letterSpacing: letterSpacing.display,
    color: colors.textPrimary,
  },
  accent: {
    color: colors.accent,
  },
  description: {
    marginTop: spacing.xs,
    maxWidth: layout.contentNarrow,
    fontSize: {
      default: fontSizes.body,
      [breakpoints.sm]: fontSizes.bodyLarge,
    },
    lineHeight: {
      default: lineHeights.line20,
      [breakpoints.sm]: lineHeights.line24,
    },
    color: colors.textMuted,
  },
  tags: {
    marginTop: spacing.md,
    display: "flex",
    flexWrap: "wrap",
    gap: spacing.xs,
    fontSize: fontSizes.caption,
    fontWeight: fontWeights.semibold,
    textTransform: "uppercase",
    letterSpacing: letterSpacing.wide,
  },
  primaryTag: {
    borderRadius: radii.sm,
    backgroundColor: colors.accentAlpha15,
    paddingInline: spacing.sm,
    paddingBlock: spacing.xxs,
    color: colors.accentText,
  },
  tag: {
    borderRadius: radii.sm,
    backgroundColor: colors.surface,
    paddingInline: spacing.sm,
    paddingBlock: spacing.xxs,
    color: colors.textSecondary,
  },
});
