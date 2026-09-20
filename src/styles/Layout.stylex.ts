import * as stylex from "@stylexjs/stylex";

/** Shared structural dimensions and stacking levels in pixels. */
export const layout = stylex.defineConsts({
  /** 44px */
  touchTarget: 44,
  /** 288px */
  sidebarWidth: 288,
  /** 672px */
  contentNarrow: 672,
  /** 768px */
  contentMedium: 768,
  /** 896px */
  contentWide: 896,
  /** 1024px */
  contentMax: 1024,
  /** 1280px */
  pageMax: 1280,
  /** 64px */
  sectionPaddingDesktop: 64,
  /** 112px */
  stackPickerBottomClearance: 112,
  /** 10 */
  zSticky: 10,
  /** 100 */
  zSkipLink: 100,
});
