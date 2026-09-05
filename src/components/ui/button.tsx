import type { ButtonHTMLAttributes, Ref } from "react";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { colors } from "../../styles/Colors.stylex";
import { spacing } from "../../styles/Spacing.stylex";
import { radii } from "../../styles/BorderRadius.stylex";
import { fonts } from "../../styles/Fonts.stylex";
import {
  fontWeights,
  lineHeights,
} from "../../styles/Typography.stylex";
import { shadows } from "../../styles/Shadows.stylex";

type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";
type ButtonSize = "default" | "sm" | "lg" | "icon";

interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "className" | "style"
> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  style?: StyleXStyles;
  ref?: Ref<HTMLButtonElement>;
}

function Button({
  style,
  variant = "default",
  size = "default",
  ref,
  ...props
}: ButtonProps) {
  return (
    <button
      {...stylex.props(
        fonts.body,
        styles.base,
        variantStyles[variant],
        sizeStyles[size],
        style,
      )}
      ref={ref}
      {...props}
    />
  );
}

const styles = stylex.create({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    whiteSpace: "nowrap",
    borderRadius: radii.sm,
    lineHeight: lineHeights.line20,
    fontWeight: fontWeights.medium,
    transitionProperty: "color, background-color, border-color",
    outline: {
      ":focus-visible": "none",
    },
    boxShadow: {
      default: shadows.none,
      ":focus-visible": shadows.focusOffsetBackground,
    },
    pointerEvents: {
      default: "auto",
      ":disabled": "none",
    },
    opacity: {
      default: 1,
      ":disabled": 0.5,
    },
  },
});

const variantStyles = stylex.create({
  default: {
    backgroundColor: {
      default: colors.actionPrimary,
      ":hover": colors.actionPrimaryHover,
    },
    color: colors.actionPrimaryText,
  },
  destructive: {
    backgroundColor: {
      default: colors.actionDanger,
      ":hover": colors.actionDangerHover,
    },
    color: colors.actionDangerText,
  },
  outline: {
    borderWidth: 1,
    borderColor: colors.actionSecondary,
    backgroundColor: {
      default: colors.background,
      ":hover": colors.actionPrimary,
    },
    color: {
      ":hover": colors.actionPrimaryText,
    },
  },
  secondary: {
    backgroundColor: {
      default: colors.actionSecondary,
      ":hover": colors.actionSecondaryHover,
    },
    color: colors.actionSecondaryText,
  },
  ghost: {
    backgroundColor: {
      default: colors.transparent,
      ":hover": colors.actionPrimary,
    },
    color: {
      ":hover": colors.actionPrimaryText,
    },
  },
  link: {
    color: colors.accentText,
    textUnderlineOffset: 4,
    textDecorationLine: {
      default: "none",
      ":hover": "underline",
    },
  },
});

const sizeStyles = stylex.create({
  default: {
    height: 40,
    paddingInline: spacing.md,
    paddingBlock: spacing.xs,
  },
  sm: {
    height: 36,
    borderRadius: radii.sm,
    paddingInline: spacing.sm,
  },
  lg: {
    height: 44,
    borderRadius: radii.sm,
    paddingInline: spacing.xxl,
  },
  icon: {
    width: 40,
    height: 40,
  },
});

export { Button };
export type { ButtonProps, ButtonSize, ButtonVariant };
