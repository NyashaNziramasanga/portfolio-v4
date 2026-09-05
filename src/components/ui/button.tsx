import type { ButtonHTMLAttributes, Ref } from "react";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { colors } from "../../styles/tokens.stylex";

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
    gap: 8,
    whiteSpace: "nowrap",
    borderRadius: 6,
    fontSize: 14,
    lineHeight: "20px",
    fontWeight: 500,
    transitionProperty: "color, background-color, border-color",
    outline: {
      ":focus-visible": "none",
    },
    boxShadow: {
      default: "none",
      ":focus-visible": "0 0 0 2px #1A202C, 0 0 0 4px hsl(207 68% 50%)",
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
      default: colors.primary,
      ":hover": "color-mix(in oklab, hsl(207 68% 50%) 90%, transparent)",
    },
    color: colors.primaryForeground,
  },
  destructive: {
    backgroundColor: {
      default: colors.destructive,
      ":hover": "color-mix(in oklab, hsl(0 84.2% 60.2%) 90%, transparent)",
    },
    color: colors.destructiveForeground,
  },
  outline: {
    borderWidth: 1,
    borderColor: colors.secondary,
    backgroundColor: {
      default: colors.brand900,
      ":hover": colors.primary,
    },
    color: {
      ":hover": colors.primaryForeground,
    },
  },
  secondary: {
    backgroundColor: {
      default: colors.secondary,
      ":hover": "color-mix(in oklab, hsl(216 12% 54%) 80%, transparent)",
    },
    color: colors.secondaryForeground,
  },
  ghost: {
    backgroundColor: {
      default: "transparent",
      ":hover": colors.primary,
    },
    color: {
      ":hover": colors.primaryForeground,
    },
  },
  link: {
    color: colors.primary,
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
    paddingInline: 16,
    paddingBlock: 8,
  },
  sm: {
    height: 36,
    borderRadius: 6,
    paddingInline: 12,
  },
  lg: {
    height: 44,
    borderRadius: 6,
    paddingInline: 32,
  },
  icon: {
    width: 40,
    height: 40,
  },
});

export { Button };
export type { ButtonProps, ButtonSize, ButtonVariant };
