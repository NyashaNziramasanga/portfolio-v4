import * as stylex from "@stylexjs/stylex";

/** Shared layout dimensions and stacking levels in pixels. */
export const layout = stylex.defineConsts({
  touchTarget: 44,
  sidebarWidth: 288,
  contentNarrow: 672,
  contentMedium: 768,
  contentWide: 896,
  contentMax: 1024,
  pageMax: 1280,
  zSticky: 10,
  zSkipLink: 100,
});
