import * as stylex from "@stylexjs/stylex";
import { colors } from "../../../styles/Colors.stylex";
import { spacing } from "../../../styles/Spacing.stylex";
import { radii } from "../../../styles/BorderRadius.stylex";
import { fonts } from "../../../styles/Fonts.stylex";
import {
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacing,
} from "../../../styles/Typography.stylex";
import { breakpoints } from "../../../styles/Breakpoints.stylex";
import { layout } from "../../../styles/Layout.stylex";

export function BorderRadiusHeader() {
  return (
    <header {...stylex.props(styles.root)}>
      <h2 {...stylex.props(styles.title)}>
        Concentric corners, <span {...stylex.props(styles.accent)}>solved</span>
        .
      </h2>
      <p {...stylex.props(styles.description)}>
        The rule of thumb for nested rounded rectangles is{" "}
        <span {...stylex.props(fonts.mono, styles.code)}>
          inner radius + padding = outer radius
        </span>
        . Drag any slider and the others stay in sync.
      </p>
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
  code: {
    borderRadius: radii.sm,
    backgroundColor: colors.surface,
    paddingInline: spacing.xs,
    paddingBlock: spacing.xxs,
    fontSize: fontSizes.label,
    color: colors.textStrong,
  },
});
