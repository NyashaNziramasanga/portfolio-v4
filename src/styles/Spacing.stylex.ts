import * as stylex from "@stylexjs/stylex";

/**
 * Compact spacing scale based on a 4px grid.
 *
 * Use these tokens for reusable gaps, margins, and padding. Measurements tied
 * to a structural layout requirement belong in Layout.stylex.ts instead.
 */
export const spacing = stylex.defineConsts({
  /** 0px */
  none: 0,
  /** 4px */
  xxs: 4,
  /** 8px */
  xs: 8,
  /** 12px */
  sm: 12,
  /** 16px */
  md: 16,
  /** 20px */
  lg: 20,
  /** 24px */
  xl: 24,
  /** 32px */
  xxl: 32,
  /** 40px */
  xxxl: 40,
});
