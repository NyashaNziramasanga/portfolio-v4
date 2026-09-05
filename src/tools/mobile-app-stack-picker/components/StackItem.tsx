import { Boxes, Star } from "lucide-react";
import * as stylex from "@stylexjs/stylex";
import { SimpleIconSvg } from "@/components/SimpleIconSvg";
import { getSimpleIcon } from "@/tools/mobile-app-stack-picker/simpleIcons";
import type { StackItem as StackItemType } from "@/tools/types";
import { colors } from "../../../styles/Colors.stylex";
import { spacing } from "../../../styles/Spacing.stylex";
import { radii } from "../../../styles/BorderRadius.stylex";
import {
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacing,
} from "../../../styles/Typography.stylex";
import { motion } from "../../../styles/Motion.stylex";
import { shadows } from "../../../styles/Shadows.stylex";
import { layout } from "../../../styles/Layout.stylex";

type StackItemProps = {
  item: StackItemType;
  selected: boolean;
  onSelect: () => void;
};

export function StackItem({ item, selected, onSelect }: StackItemProps) {
  const icon = getSimpleIcon(item.iconKey);
  const iconColor = icon ? `#${icon.hex}` : undefined;
  const isPick = "pick" in item && item.pick === true;
  const pickReason =
    "pickReason" in item && typeof item.pickReason === "string"
      ? item.pickReason
      : undefined;
  const tooltipText = pickReason ?? "My pick";
  const hasReason = Boolean(pickReason);

  return (
    <button
      type="button"
      onClick={onSelect}
      {...stylex.props(
        styles.button,
        isPick && !selected && styles.pick,
        selected && styles.selected,
      )}
      aria-pressed={selected}
    >
      <span {...stylex.props(styles.iconBox)}>
        {icon ? (
          <SimpleIconSvg
            icon={icon}
            style={[styles.icon, styles.iconColor(iconColor ?? "currentColor")]}
            aria-label={item.label}
          />
        ) : (
          <Boxes {...stylex.props(styles.icon, styles.fallbackIcon)} />
        )}
      </span>
      <span {...stylex.props(styles.itemLabel)}>{item.label}</span>
      {isPick && (
        <span
          {...stylex.props(styles.pickMarker, stylex.defaultMarker())}
          aria-label={tooltipText}
        >
          <Star
            {...stylex.props(styles.star, selected && styles.starSelected)}
            aria-hidden
          />
          <span
            {...stylex.props(
              styles.tooltip,
              hasReason ? styles.tooltipReason : styles.tooltipShort,
            )}
          >
            {hasReason && (
              <span {...stylex.props(styles.tooltipTitle)}>Why I pick it</span>
            )}
            {tooltipText}
          </span>
        </span>
      )}
    </button>
  );
}

const styles = stylex.create({
  button: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    gap: spacing.space10,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: {
      default: colors.surface,
      ":hover": colors.surfaceHover,
    },
    paddingInline: spacing.space12,
    paddingBlock: spacing.space8,
    textAlign: "left",
    fontSize: fontSizes.body,
    lineHeight: lineHeights.line20,
    color: colors.textStrong,
    transitionProperty: {
      [motion.allow]: "all",
    },
    outline: {
      ":focus-visible": "none",
    },
    boxShadow: {
      ":focus-visible": shadows.focusOffsetBackground,
    },
  },
  pick: {
    borderLeftWidth: 2,
    borderLeftColor: colors.accent,
  },
  selected: {
    borderColor: colors.accent,
    backgroundColor: colors.surfaceHover,
    boxShadow: shadows.accentOutline,
  },
  iconBox: {
    display: "flex",
    height: 20,
    width: 20,
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.xxs,
    backgroundColor: colors.backgroundAlpha60,
  },
  icon: {
    width: 14,
    height: 14,
  },
  iconColor: (color: string) => ({
    color,
  }),
  fallbackIcon: {
    color: colors.textMuted,
  },
  itemLabel: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  pickMarker: {
    position: "relative",
    marginLeft: "auto",
    display: "flex",
    flexShrink: 0,
    alignItems: "center",
  },
  star: {
    width: 14,
    height: 14,
    color: colors.accent,
    fill: colors.accent,
  },
  starSelected: {
    fill: colors.accentAlpha80,
  },
  tooltip: {
    pointerEvents: "none",
    position: "absolute",
    bottom: "100%",
    right: 0,
    zIndex: layout.zSticky,
    marginBottom: spacing.space6,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    paddingInline: spacing.space8,
    paddingBlock: spacing.space4,
    fontSize: fontSizes.caption,
    fontWeight: fontWeights.medium,
    color: colors.textPrimary,
    boxShadow: shadows.tooltip,
    opacity: {
      default: 0,
      [stylex.when.ancestor(":hover")]: 1,
    },
    transitionProperty: {
      [motion.allow]: "opacity",
    },
    transitionDuration: {
      [motion.allow]: motion.fast,
    },
  },
  tooltipReason: {
    width: 224,
    textAlign: "left",
    lineHeight: lineHeights.snug,
  },
  tooltipShort: {
    whiteSpace: "nowrap",
  },
  tooltipTitle: {
    marginBottom: spacing.space4,
    display: "block",
    fontSize: fontSizes.micro,
    fontWeight: fontWeights.semibold,
    textTransform: "uppercase",
    letterSpacing: letterSpacing.wider,
    color: colors.accent,
  },
});
