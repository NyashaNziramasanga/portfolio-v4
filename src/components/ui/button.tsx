import type { ButtonHTMLAttributes, Ref } from "react";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { colors } from "../../styles/Colors.stylex";
import { spacing } from "../../styles/Spacing.stylex";
import { radii } from "../../styles/BorderRadius.stylex";
import { fonts } from "../../styles/Fonts.stylex";
import { lineHeights } from "../../styles/Typography.stylex";
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
    gap: spacing.space8,
    whiteSpace: "nowrap",
    borderRadius: radii.sm,
    lineHeight: lineHeights.line20,
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
      default: colors.accent,
      ":hover": colors.accentAlpha90,
    },
    color: colors.accentForeground,
  },
  destructive: {
    backgroundColor: {
      default: colors.danger,
      ":hover": colors.dangerAlpha90,
    },
    color: colors.dangerForeground,
  },
  outline: {
    borderWidth: 1,
    borderColor: colors.secondary,
    backgroundColor: {
      default: colors.background,
      ":hover": colors.accent,
    },
    color: {
      ":hover": colors.accentForeground,
    },
  },
  secondary: {
    backgroundColor: {
      default: colors.secondary,
      ":hover": colors.secondaryAlpha80,
    },
    color: colors.secondaryForeground,
  },
  ghost: {
    backgroundColor: {
      default: colors.transparent,
      ":hover": colors.accent,
    },
    color: {
      ":hover": colors.accentForeground,
    },
  },
  link: {
    color: colors.accent,
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
    paddingInline: spacing.space16,
    paddingBlock: spacing.space8,
  },
  sm: {
    height: 36,
    borderRadius: radii.sm,
    paddingInline: spacing.space12,
  },
  lg: {
    height: 44,
    borderRadius: radii.sm,
    paddingInline: spacing.space32,
  },
  icon: {
    width: 40,
    height: 40,
  },
});

export { Button };
export type { ButtonProps, ButtonSize, ButtonVariant };
