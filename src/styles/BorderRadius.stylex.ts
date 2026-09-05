import * as stylex from "@stylexjs/stylex";

/** Border-radius scale preserving the existing component geometry. */
export const radii = stylex.defineConsts({
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  circle: "50%",
  pill: 9999,
});
