import * as stylex from "@stylexjs/stylex";

/** Motion preferences shared by transitions and animations. */
export const motion = stylex.defineConsts({
  /** @media (prefers-reduced-motion: reduce) */
  reduce: "@media (prefers-reduced-motion: reduce)",
  /** @media (prefers-reduced-motion: no-preference) */
  allow: "@media (prefers-reduced-motion: no-preference)",
  /** 0ms */
  instant: "0ms",
  /** 150ms */
  fast: "150ms",
  /** 200ms */
  normal: "200ms",
  /** 300ms */
  slow: "300ms",
  /** 2s */
  pulseDuration: "2s",
  /** 3s */
  floatDuration: "3s",
  /** cubic-bezier(0, 0, 0.2, 1) */
  easeOut: "cubic-bezier(0, 0, 0.2, 1)",
  /** ease-in-out */
  easeInOut: "ease-in-out",
  /** cubic-bezier(0.4, 0, 0.6, 1) */
  pulseEasing: "cubic-bezier(0.4, 0, 0.6, 1)",
});
