import * as stylex from "@stylexjs/stylex";

/** Shared structural dimensions and stacking levels in pixels. */
export const layout = stylex.defineConsts({
  touchTarget: 44,
  sidebarWidth: 288,
  contentNarrow: 672,
  contentMedium: 768,
  contentWide: 896,
  contentMax: 1024,
  pageMax: 1280,
  sectionPaddingDesktop: 64,
  stackPickerBottomClearance: 112,
  zSticky: 10,
  zSkipLink: 100,
});
