import * as stylex from "@stylexjs/stylex";
import type { Platform } from "./types";
import { colors } from "../../styles/Colors.stylex";
import { radii } from "../../styles/BorderRadius.stylex";
import {
  fontSizes,
  fontWeights,
  lineHeights,
} from "../../styles/Typography.stylex";
import { breakpoints } from "../../styles/Breakpoints.stylex";
import { brandColors } from "../../styles/BrandColors.stylex";

export function PlatformIcon({ platform }: { platform: Platform }) {
  if (platform === "youtube") {
    return (
      <div {...stylex.props(styles.box, styles.youtube)}>
        <svg viewBox="0 0 24 24" {...stylex.props(styles.icon)} aria-hidden>
          <path fill="currentColor" d="M8 5v14l11-7z" />
        </svg>
      </div>
    );
  }
  if (platform === "medium") {
    return (
      <div {...stylex.props(styles.box, styles.black)}>
        <svg
          viewBox="0 0 24 24"
          {...stylex.props(styles.icon)}
          fill="currentColor"
          aria-hidden
        >
          <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
        </svg>
      </div>
    );
  }
  if (platform === "devto") {
    return (
      <div {...stylex.props(styles.box, styles.black)}>
        <span {...stylex.props(styles.devText)} aria-hidden>
          DEV
        </span>
      </div>
    );
  }
  if (platform === "flinders") {
    return (
      <div {...stylex.props(styles.box, styles.flinders)}>
        <svg
          viewBox="0 0 24 24"
          {...stylex.props(styles.icon)}
          fill="currentColor"
          aria-hidden
        >
          <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
        </svg>
      </div>
    );
  }
  return null;
}

const styles = stylex.create({
  box: {
    display: "flex",
    height: {
      default: 32,
      [breakpoints.sm]: 40,
    },
    width: {
      default: 32,
      [breakpoints.sm]: 40,
    },
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: radii.sm,
  },
  youtube: {
    backgroundColor: brandColors.youtube,
  },
  black: {
    backgroundColor: colors.black,
  },
  flinders: {
    backgroundColor: brandColors.flinders,
  },
  icon: {
    width: {
      default: 16,
      [breakpoints.sm]: 20,
    },
    height: {
      default: 16,
      [breakpoints.sm]: 20,
    },
    color: colors.white,
    fill: "currentColor",
  },
  devText: {
    textAlign: "center",
    fontSize: {
      default: fontSizes.caption,
      [breakpoints.sm]: fontSizes.label,
    },
    fontWeight: fontWeights.bold,
    textTransform: "uppercase",
    lineHeight: lineHeights.none,
    color: colors.white,
  },
});
