import * as stylex from "@stylexjs/stylex";

/**
 * Primitive typography tokens used to build the semantic recipes in
 * `Fonts.stylex.ts` and one-off responsive type rules.
 */

/** Font stacks used by the portfolio. */
export const fontFamilies = stylex.defineConsts({
  /** Inter Variable, Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif */
  sans: "Inter Variable, Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif",
  /** ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace */
  mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
});

/** Semantic type scale in pixels. */
export const fontSizes = stylex.defineConsts({
  /** 11px */
  caption: 11,
  /** 12px */
  label: 12,
  /** 13px */
  bodySmall: 13,
  /** 14px */
  body: 14,
  /** 16px */
  bodyLarge: 16,
  /** 18px */
  titleSmall: 18,
  /** 20px */
  title: 20,
  /** 24px */
  heading: 24,
  /** 30px */
  displaySmall: 30,
  /** 36px */
  display: 36,
  /** 48px */
  displayLarge: 48,
});

/** Supported font weights. */
export const fontWeights = stylex.defineConsts({
  /** 400 */
  regular: 400,
  /** 500 */
  medium: 500,
  /** 600 */
  semibold: 600,
  /** 700 */
  bold: 700,
  /** 800 */
  extraBold: 800,
});

/** Unitless and fixed line-height values used by existing components. */
export const lineHeights = stylex.defineConsts({
  /** 1 */
  none: 1,
  /** 1.5 */
  normal: 1.5,
  /** 1.25 */
  tight: 1.25,
  /** 1.375 */
  snug: 1.375,
  /** 1.625 */
  relaxed: 1.625,
  /** 16px */
  line16: "16px",
  /** 20px */
  line20: "20px",
  /** 24px */
  line24: "24px",
  /** 28px */
  line28: "28px",
  /** 32px */
  line32: "32px",
  /** 36px */
  line36: "36px",
});

/** Tracking values for labels, headings, and display text. */
export const letterSpacing = stylex.defineConsts({
  /** -0.025em */
  display: "-0.025em",
  /** 0.025em */
  wide: "0.025em",
  /** 0.05em */
  wider: "0.05em",
  /** 0.1em */
  label: "0.1em",
  /** 0.14em */
  labelWide: "0.14em",
  /** 0.18em */
  eyebrow: "0.18em",
});
