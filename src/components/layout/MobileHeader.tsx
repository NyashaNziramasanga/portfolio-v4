import { Menu, X } from "lucide-react";
import type { Ref } from "react";
import * as stylex from "@stylexjs/stylex";
import { ProfileAvatar } from "@/components/ProfileAvatar";
import { colors } from "../../styles/Colors.stylex";
import { spacing } from "../../styles/Spacing.stylex";
import { radii } from "../../styles/BorderRadius.stylex";
import {
  fontSizes,
  fontWeights,
  lineHeights,
} from "../../styles/Typography.stylex";
import { breakpoints } from "../../styles/Breakpoints.stylex";
import { shadows } from "../../styles/Shadows.stylex";
import { layout } from "../../styles/Layout.stylex";

export function MobileHeader({
  isOpen,
  onToggle,
  buttonRef,
}: {
  isOpen: boolean;
  onToggle: () => void;
  buttonRef?: Ref<HTMLButtonElement>;
}) {
  return (
    <header {...stylex.props(styles.root)}>
      <div {...stylex.props(styles.identity)}>
        <ProfileAvatar size="mobile" style={styles.avatar} />
        <div>
          <p {...stylex.props(styles.name)}>Nash Nziramasanga</p>
          <p {...stylex.props(styles.role)}>Senior Mobile Engineer</p>
        </div>
      </div>
      <button
        ref={buttonRef}
        onClick={onToggle}
        {...stylex.props(styles.button)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? (
          <X {...stylex.props(styles.icon)} />
        ) : (
          <Menu {...stylex.props(styles.icon)} />
        )}
      </button>
    </header>
  );
}

const styles = stylex.create({
  root: {
    display: {
      default: "flex",
      [breakpoints.lg]: "none",
    },
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.background,
    paddingInline: spacing.space20,
    paddingBlock: spacing.space14,
  },
  identity: {
    display: "flex",
    alignItems: "center",
    gap: spacing.space12,
  },
  avatar: {
    width: 36,
    height: 36,
    boxShadow: shadows.avatarRingSmall,
  },
  name: {
    fontSize: fontSizes.body,
    lineHeight: lineHeights.line20,
    fontWeight: fontWeights.bold,
    color: colors.textPrimary,
  },
  role: {
    fontSize: fontSizes.label,
    lineHeight: lineHeights.line16,
    color: colors.textMuted,
  },
  button: {
    display: "inline-flex",
    minHeight: layout.touchTarget,
    minWidth: layout.touchTarget,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.md,
    padding: spacing.space8,
    color: {
      default: colors.textSecondary,
      ":hover": colors.textPrimary,
    },
    backgroundColor: {
      default: colors.transparent,
      ":hover": colors.surfaceHoverAlpha60,
    },
    transitionProperty: "color, background-color",
  },
  icon: {
    width: 24,
    height: 24,
  },
});
