import * as stylex from "@stylexjs/stylex";

/** Elevation, focus, and media shadows. */
export const shadows = stylex.defineConsts({
  none: "none",
  elevationXs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  elevationSm:
    "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  elevationMd:
    "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  elevationLg: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  media: "0 10px 15px -3px rgb(0 0 0 / 0.25), 0 4px 6px -4px rgb(0 0 0 / 0.25)",
  mediaHover:
    "0 20px 25px -5px rgb(0 0 0 / 0.3), 0 8px 10px -6px rgb(0 0 0 / 0.3)",
  mediaStrong:
    "0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)",
  tooltip: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
  focus: "0 0 0 2px hsl(207 68% 50%)",
  focusOffsetBackground:
    "0 0 0 2px #1A202C, 0 0 0 4px hsl(207 68% 50%)",
  focusOffsetSurface: "0 0 0 2px #1F2937, 0 0 0 4px hsl(207 68% 50%)",
  accentOutline:
    "0 0 0 1px color-mix(in oklab, hsl(207 68% 50%) 70%, transparent)",
  accentSubtleOutline:
    "0 0 0 1px color-mix(in oklab, hsl(207 68% 50%) 30%, transparent)",
  raisedAccent:
    "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 0 0 1px color-mix(in oklab, hsl(207 68% 50%) 30%, transparent)",
  accentInset: "inset 0 0 0 1px color-mix(in oklab, #4299E1 20%, transparent)",
  currentColorFocus: "0 0 0 2px currentColor",
  avatarRing: "0 0 0 4px #718096",
  avatarRingSmall: "0 0 0 2px #718096",
});
