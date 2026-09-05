import * as stylex from "@stylexjs/stylex";

/** Motion preferences shared by transitions and animations. */
export const motion = stylex.defineConsts({
  reduce: "@media (prefers-reduced-motion: reduce)",
  allow: "@media (prefers-reduced-motion: no-preference)",
  instant: "0ms",
  fast: "150ms",
  normal: "200ms",
  slow: "300ms",
  pulseDuration: "2s",
  floatDuration: "3s",
  easeOut: "cubic-bezier(0, 0, 0.2, 1)",
  easeInOut: "ease-in-out",
  pulseEasing: "cubic-bezier(0.4, 0, 0.6, 1)",
});
