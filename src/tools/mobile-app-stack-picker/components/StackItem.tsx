import { Boxes, Star } from "lucide-react";
import * as stylex from "@stylexjs/stylex";
import { SimpleIconSvg } from "@/components/SimpleIconSvg";
import { getSimpleIcon } from "@/tools/mobile-app-stack-picker/simpleIcons";
import type { StackItem as StackItemType } from "@/tools/types";
import { colors, constants } from "../../../styles/tokens.stylex";

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
    gap: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.brand500,
    backgroundColor: {
      default: colors.brand700,
      ":hover": colors.brand600,
    },
    paddingInline: 12,
    paddingBlock: 8,
    textAlign: "left",
    fontSize: 14,
    lineHeight: "20px",
    color: colors.brand100,
    transitionProperty: {
      [constants.allowMotion]: "all",
    },
    outline: {
      ":focus-visible": "none",
    },
    boxShadow: {
      ":focus-visible": "0 0 0 2px #1A202C, 0 0 0 4px hsl(207 68% 50%)",
    },
  },
  pick: {
    borderLeftWidth: 2,
    borderLeftColor: colors.primary,
  },
  selected: {
    borderColor: colors.primary,
    backgroundColor: colors.brand600,
    boxShadow:
      "0 0 0 1px color-mix(in oklab, hsl(207 68% 50%) 70%, transparent)",
  },
  iconBox: {
    display: "flex",
    height: 20,
    width: 20,
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
    backgroundColor: "color-mix(in oklab, #1A202C 60%, transparent)",
  },
  icon: {
    width: 14,
    height: 14,
  },
  iconColor: (color: string) => ({
    color,
  }),
  fallbackIcon: {
    color: colors.brand300,
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
    color: colors.primary,
    fill: colors.primary,
  },
  starSelected: {
    fill: "color-mix(in oklab, hsl(207 68% 50%) 80%, transparent)",
  },
  tooltip: {
    pointerEvents: "none",
    position: "absolute",
    bottom: "100%",
    right: 0,
    zIndex: constants.zSticky,
    marginBottom: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.brand500,
    backgroundColor: colors.brand900,
    paddingInline: 8,
    paddingBlock: 4,
    fontSize: 10,
    fontWeight: 500,
    color: colors.brand50,
    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
    opacity: {
      default: 0,
      [stylex.when.ancestor(":hover")]: 1,
    },
    transitionProperty: {
      [constants.allowMotion]: "opacity",
    },
    transitionDuration: {
      [constants.allowMotion]: constants.durationFast,
    },
  },
  tooltipReason: {
    width: 224,
    textAlign: "left",
    lineHeight: 1.375,
  },
  tooltipShort: {
    whiteSpace: "nowrap",
  },
  tooltipTitle: {
    marginBottom: 4,
    display: "block",
    fontSize: 9,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: colors.primary,
  },
});
