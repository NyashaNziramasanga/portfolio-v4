import * as stylex from "@stylexjs/stylex";

/**
 * Compact spacing scale based on a 4px grid.
 *
 * Use these tokens for reusable gaps, margins, and padding. Measurements tied
 * to a structural layout requirement belong in Layout.stylex.ts instead.
 */
export const spacing = stylex.defineConsts({
  none: 0,
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
});
