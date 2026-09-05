import * as stylex from "@stylexjs/stylex";

/**
 * Primitive typography tokens used to build the semantic recipes in
 * `Fonts.stylex.ts` and one-off responsive type rules.
 */

/** Font stacks used by the portfolio. */
export const fontFamilies = stylex.defineConsts({
  sans: "Inter Variable, Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif",
  mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
});

/** Semantic type scale in pixels. */
export const fontSizes = stylex.defineConsts({
  micro: 9,
  caption: 10,
  captionSmall: 11,
  label: 12,
  bodySmall: 13,
  body: 14,
  bodyLarge: 16,
  titleSmall: 18,
  title: 20,
  heading: 24,
  displaySmall: 30,
  display: 36,
  displayLarge: 48,
});

/** Supported font weights. */
export const fontWeights = stylex.defineConsts({
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extraBold: 800,
});

/** Unitless and fixed line-height values used by existing components. */
export const lineHeights = stylex.defineConsts({
  none: 1,
  normal: 1.5,
  tight: 1.25,
  snug: 1.375,
  relaxed: 1.625,
  line16: "16px",
  line20: "20px",
  line24: "24px",
  line28: "28px",
  line32: "32px",
  line36: "36px",
});

/** Tracking values for labels, headings, and display text. */
export const letterSpacing = stylex.defineConsts({
  display: "-0.025em",
  wide: "0.025em",
  wider: "0.05em",
  label: "0.1em",
  labelWide: "0.14em",
  eyebrow: "0.18em",
});
