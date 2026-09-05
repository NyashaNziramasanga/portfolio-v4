import * as stylex from "@stylexjs/stylex";
import { breakpoints } from "./Breakpoints.stylex";
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  letterSpacing,
  lineHeights,
} from "./Typography.stylex";

/**
 * Semantic font recipes composed from the primitive typography tokens.
 *
 * Apply these recipes with `stylex.props()` and add component-specific styles
 * afterward when responsive sizing, line height, or tracking needs to override
 * a recipe.
 *
 * @example
 * <h2 {...stylex.props(fonts.heading, styles.heading)}>Heading</h2>
 */
export const fonts = stylex.create({
  sectionHeading: {
    fontFamily: fontFamilies.sans,
    fontSize: {
      default: fontSizes.title,
      [breakpoints.sm]: fontSizes.heading,
    },
    fontWeight: fontWeights.bold,
    lineHeight: {
      default: lineHeights.line28,
      [breakpoints.sm]: lineHeights.line32,
    },
  },
  sectionDescription: {
    fontFamily: fontFamilies.sans,
    fontSize: {
      default: fontSizes.body,
      [breakpoints.sm]: fontSizes.bodyLarge,
    },
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.relaxed,
  },
  eyebrow: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.label,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.line16,
    letterSpacing: letterSpacing.eyebrow,
    textTransform: "uppercase",
  },
  displayLarge: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.displayLarge,
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.tight,
    letterSpacing: letterSpacing.display,
  },
  display: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.display,
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.tight,
    letterSpacing: letterSpacing.display,
  },
  heading: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.heading,
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.line32,
  },
  titleLarge: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.title,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.line28,
  },
  title: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.titleSmall,
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.line28,
  },
  bodyLarge: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.bodyLarge,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.line24,
  },
  body: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.body,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.line20,
  },
  bodySmall: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.bodySmall,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.line20,
  },
  caption: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.label,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.line16,
  },
  mono: {
    fontFamily: fontFamilies.mono,
    fontSize: fontSizes.body,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.line20,
  },
});
