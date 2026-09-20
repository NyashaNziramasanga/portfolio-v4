import * as stylex from "@stylexjs/stylex";

/** Mobile-first responsive breakpoints. */
export const breakpoints = stylex.defineConsts({
  /** @media (min-width: 640px) */
  sm: "@media (min-width: 640px)",
  /** @media (min-width: 768px) */
  md: "@media (min-width: 768px)",
  /** @media (min-width: 1024px) */
  lg: "@media (min-width: 1024px)",
  /** @media (min-width: 1280px) */
  xl: "@media (min-width: 1280px)",
});
