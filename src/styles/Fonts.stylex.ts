import * as stylex from "@stylexjs/stylex";
import {
  fontFamilies,
  fontSizes,
  fontWeights,
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
  displayLarge: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.displayLarge,
    fontWeight: fontWeights.bold,
  },
  display: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.display,
    fontWeight: fontWeights.bold,
  },
  heading: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.heading,
    fontWeight: fontWeights.bold,
  },
  titleLarge: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.title,
    fontWeight: fontWeights.semibold,
  },
  title: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.titleSmall,
    fontWeight: fontWeights.bold,
  },
  bodyLarge: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.bodyLarge,
    fontWeight: fontWeights.semibold,
  },
  body: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.body,
    fontWeight: fontWeights.medium,
  },
  bodySmall: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.bodySmall,
    fontWeight: fontWeights.medium,
  },
  caption: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.label,
    fontWeight: fontWeights.semibold,
  },
  captionSmall: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.captionSmall,
    fontWeight: fontWeights.regular,
  },
  mono: {
    fontFamily: fontFamilies.mono,
    fontSize: fontSizes.body,
    fontWeight: fontWeights.regular,
  },
});
