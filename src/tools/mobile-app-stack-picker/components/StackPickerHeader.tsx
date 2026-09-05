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
      default: spacing.space24,
      [breakpoints.sm]: spacing.space32,
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
    marginTop: spacing.space8,
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
    marginTop: spacing.space16,
    display: "flex",
    flexWrap: "wrap",
    gap: spacing.space8,
    fontSize: fontSizes.captionSmall,
    fontWeight: fontWeights.semibold,
    textTransform: "uppercase",
    letterSpacing: letterSpacing.wide,
  },
  primaryTag: {
    borderRadius: radii.sm,
    backgroundColor: colors.accentAlpha15,
    paddingInline: spacing.space10,
    paddingBlock: spacing.space4,
    color: colors.accent,
  },
  tag: {
    borderRadius: radii.sm,
    backgroundColor: colors.surface,
    paddingInline: spacing.space10,
    paddingBlock: spacing.space4,
    color: colors.textSecondary,
  },
});
