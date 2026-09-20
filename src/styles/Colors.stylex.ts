import * as stylex from "@stylexjs/stylex";

/**
 * Dark-theme color system.
 *
 * Components should prefer these semantic names over raw color literals. The
 * values intentionally preserve the portfolio's existing visual palette.
 */
export const colors = stylex.defineVars({
  /** #1A202C */
  background: "#1A202C",
  /** #1F2937 */
  surfaceSubtle: "#1F2937",
  /** #252F3F */
  surface: "#252F3F",
  /** #2D3748 */
  surfaceHover: "#2D3748",
  /** #4A5568 */
  border: "#4A5568",
  /** #A0AEC0 */
  textMuted: "#A0AEC0",
  /** #CBD5E0 */
  textSecondary: "#CBD5E0",
  /** #E2E8F0 */
  textStrong: "#E2E8F0",
  /** #EDF2F7 */
  textPrimary: "#EDF2F7",
  /** #90CDF4 */
  accentSoft: "#90CDF4",
  /** #63B3ED */
  accentText: "#63B3ED",
  /** #4299E1 */
  accentSurface: "#4299E1",
  /** hsl(207 68% 50%) */
  accent: "hsl(207 68% 50%)",
  /** hsl(0 0% 100%) */
  accentForeground: "hsl(0 0% 100%)",
  /** #2B6CB0 */
  actionPrimary: "#2B6CB0",
  /** #2C5282 */
  actionPrimaryHover: "#2C5282",
  /** #FFFFFF */
  actionPrimaryText: "#FFFFFF",
  /** #4A5568 */
  actionSecondary: "#4A5568",
  /** #2D3748 */
  actionSecondaryHover: "#2D3748",
  /** #EDF2F7 */
  actionSecondaryText: "#EDF2F7",
  /** #C53030 */
  actionDanger: "#C53030",
  /** #9B2C2C */
  actionDangerHover: "#9B2C2C",
  /** #FFFFFF */
  actionDangerText: "#FFFFFF",
  /** hsl(218 17% 35%) */
  scrollbarThumb: "hsl(218 17% 35%)",
  /** hsl(218 15% 65%) */
  scrollbarThumbHover: "hsl(218 15% 65%)",
  /** transparent */
  transparent: "transparent",
  /** #000 */
  black: "#000",
  /** #fff */
  white: "#fff",
  /** color-mix(in oklab, #000 60%, transparent) */
  overlay: "color-mix(in oklab, #000 60%, transparent)",
  /** color-mix(in oklab, #1A202C 60%, transparent) */
  backgroundAlpha60: "color-mix(in oklab, #1A202C 60%, transparent)",
  /** color-mix(in oklab, #1A202C 70%, transparent) */
  backgroundAlpha70: "color-mix(in oklab, #1A202C 70%, transparent)",
  /** color-mix(in oklab, #1A202C 80%, transparent) */
  backgroundAlpha80: "color-mix(in oklab, #1A202C 80%, transparent)",
  /** rgb(26 32 44 / 0.95) */
  backgroundOpaque95: "rgb(26 32 44 / 0.95)",
  /** color-mix(in oklab, #1F2937 20%, transparent) */
  surfaceSubtleAlpha20: "color-mix(in oklab, #1F2937 20%, transparent)",
  /** color-mix(in oklab, #1F2937 35%, transparent) */
  surfaceSubtleAlpha35: "color-mix(in oklab, #1F2937 35%, transparent)",
  /** color-mix(in oklab, #1F2937 50%, transparent) */
  surfaceSubtleAlpha50: "color-mix(in oklab, #1F2937 50%, transparent)",
  /** color-mix(in oklab, #1F2937 60%, transparent) */
  surfaceSubtleAlpha60: "color-mix(in oklab, #1F2937 60%, transparent)",
  /** color-mix(in oklab, #1F2937 70%, transparent) */
  surfaceSubtleAlpha70: "color-mix(in oklab, #1F2937 70%, transparent)",
  /** color-mix(in oklab, #252F3F 50%, transparent) */
  surfaceAlpha50: "color-mix(in oklab, #252F3F 50%, transparent)",
  /** color-mix(in oklab, #252F3F 70%, transparent) */
  surfaceAlpha70: "color-mix(in oklab, #252F3F 70%, transparent)",
  /** color-mix(in oklab, #2D3748 60%, transparent) */
  surfaceHoverAlpha60: "color-mix(in oklab, #2D3748 60%, transparent)",
  /** color-mix(in oklab, #4A5568 30%, transparent) */
  borderAlpha30: "color-mix(in oklab, #4A5568 30%, transparent)",
  /** color-mix(in oklab, #4A5568 35%, transparent) */
  borderAlpha35: "color-mix(in oklab, #4A5568 35%, transparent)",
  /** color-mix(in oklab, #4A5568 40%, transparent) */
  borderAlpha40: "color-mix(in oklab, #4A5568 40%, transparent)",
  /** color-mix(in oklab, #4A5568 50%, transparent) */
  borderAlpha50: "color-mix(in oklab, #4A5568 50%, transparent)",
  /** color-mix(in oklab, #4A5568 55%, transparent) */
  borderAlpha55: "color-mix(in oklab, #4A5568 55%, transparent)",
  /** color-mix(in oklab, #4A5568 60%, transparent) */
  borderAlpha60: "color-mix(in oklab, #4A5568 60%, transparent)",
  /** color-mix(in oklab, #4A5568 70%, transparent) */
  borderAlpha70: "color-mix(in oklab, #4A5568 70%, transparent)",
  /** color-mix(in oklab, #4A5568 75%, transparent) */
  borderAlpha75: "color-mix(in oklab, #4A5568 75%, transparent)",
  /** color-mix(in oklab, #4299E1 10%, transparent) */
  accentSurfaceAlpha10: "color-mix(in oklab, #4299E1 10%, transparent)",
  /** color-mix(in oklab, #4299E1 15%, transparent) */
  accentSurfaceAlpha15: "color-mix(in oklab, #4299E1 15%, transparent)",
  /** color-mix(in oklab, #4299E1 20%, transparent) */
  accentSurfaceAlpha20: "color-mix(in oklab, #4299E1 20%, transparent)",
  /** color-mix(in oklab, #4299E1 30%, transparent) */
  accentSurfaceAlpha30: "color-mix(in oklab, #4299E1 30%, transparent)",
  /** color-mix(in oklab, #4299E1 40%, transparent) */
  accentSurfaceAlpha40: "color-mix(in oklab, #4299E1 40%, transparent)",
  /** color-mix(in oklab, #4299E1 60%, transparent) */
  accentSurfaceAlpha60: "color-mix(in oklab, #4299E1 60%, transparent)",
  /** color-mix(in oklab, hsl(207 68% 50%) 15%, transparent) */
  accentAlpha15: "color-mix(in oklab, hsl(207 68% 50%) 15%, transparent)",
  /** color-mix(in oklab, hsl(207 68% 50%) 30%, transparent) */
  accentAlpha30: "color-mix(in oklab, hsl(207 68% 50%) 30%, transparent)",
  /** color-mix(in oklab, hsl(207 68% 50%) 40%, transparent) */
  accentAlpha40: "color-mix(in oklab, hsl(207 68% 50%) 40%, transparent)",
  /** color-mix(in oklab, hsl(207 68% 50%) 70%, transparent) */
  accentAlpha70: "color-mix(in oklab, hsl(207 68% 50%) 70%, transparent)",
  /** color-mix(in oklab, hsl(207 68% 50%) 80%, transparent) */
  accentAlpha80: "color-mix(in oklab, hsl(207 68% 50%) 80%, transparent)",
  /** color-mix(in oklab, hsl(207 68% 50%) 90%, transparent) */
  accentAlpha90: "color-mix(in oklab, hsl(207 68% 50%) 90%, transparent)",
  /** color-mix(in oklab, #90CDF4 15%, transparent) */
  accentSoftAlpha15: "color-mix(in oklab, #90CDF4 15%, transparent)",
  /** color-mix(in oklab, #90CDF4 40%, transparent) */
  accentSoftAlpha40: "color-mix(in oklab, #90CDF4 40%, transparent)",
  /** rgb(0 0 0 / 0.2) */
  mediaOverlay20: "rgb(0 0 0 / 0.2)",
  /** rgb(0 0 0 / 0.3) */
  mediaOverlay30: "rgb(0 0 0 / 0.3)",
  /** rgb(237 242 247 / 0.95) */
  mediaControl: "rgb(237 242 247 / 0.95)",
  /** color-mix(in oklab, #2A4365 40%, transparent) */
  videoBadgeSurface: "color-mix(in oklab, #2A4365 40%, transparent)",
  /** #63B3ED */
  videoBadgeText: "#63B3ED",
  /** color-mix(in oklab, #78350F 40%, transparent) */
  articleBadgeSurface: "color-mix(in oklab, #78350F 40%, transparent)",
  /** #FBBF24 */
  articleBadgeText: "#FBBF24",
  /** color-mix(in oklab, #064E3B 40%, transparent) */
  imageBadgeSurface: "color-mix(in oklab, #064E3B 40%, transparent)",
  /** #34D399 */
  imageBadgeText: "#34D399",
  /** color-mix(in oklab, #4C1D95 40%, transparent) */
  gifBadgeSurface: "color-mix(in oklab, #4C1D95 40%, transparent)",
  /** #A78BFA */
  gifBadgeText: "#A78BFA",
});
