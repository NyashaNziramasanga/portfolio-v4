import { useId } from "react";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { NumberInput } from "@/tools/border-radius-calculator/components/NumberInput";
import { colors } from "../../../styles/Colors.stylex";
import { spacing } from "../../../styles/Spacing.stylex";
import { radii } from "../../../styles/BorderRadius.stylex";
import {
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacing,
} from "../../../styles/Typography.stylex";
import { breakpoints } from "../../../styles/Breakpoints.stylex";
import { shadows } from "../../../styles/Shadows.stylex";
import {
  RADIUS_BOUNDS,
  type RadiusField,
} from "@/tools/border-radius-calculator/hooks/useBorderRadius";

type FormulaBadgeProps = {
  innerRadius: number;
  padding: number;
  outerRadius: number;
  onChange: (field: RadiusField, value: number) => void;
};

type EditablePillProps = {
  label: string;
  value: number;
  field: RadiusField;
  style: StyleXStyles;
  onChange: (field: RadiusField, value: number) => void;
};

function EditablePill({
  label,
  value,
  field,
  style,
  onChange,
}: EditablePillProps) {
  const inputId = useId();
  const bounds = RADIUS_BOUNDS[field];

  return (
    <div {...stylex.props(styles.pill, style)}>
      <label htmlFor={inputId} {...stylex.props(styles.label)}>
        {label}
      </label>
      <NumberInput
        id={inputId}
        value={value}
        min={bounds.min}
        max={bounds.max}
        onChange={(next) => onChange(field, next)}
        aria-label={`${label} value`}
        style={styles.input}
      />
    </div>
  );
}

export function FormulaBadge({
  innerRadius,
  padding,
  outerRadius,
  onChange,
}: FormulaBadgeProps) {
  return (
    <div {...stylex.props(styles.root)}>
      <EditablePill
        label="Inner R"
        value={innerRadius}
        field="inner"
        style={pillStyles.inner}
        onChange={onChange}
      />
      <span {...stylex.props(styles.operator)}>+</span>
      <EditablePill
        label="Padding"
        value={padding}
        field="padding"
        style={pillStyles.padding}
        onChange={onChange}
      />
      <span {...stylex.props(styles.operator)}>=</span>
      <EditablePill
        label="Outer R"
        value={outerRadius}
        field="outer"
        style={pillStyles.outer}
        onChange={onChange}
      />
    </div>
  );
}

const styles = stylex.create({
  root: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: {
      default: spacing.space8,
      [breakpoints.sm]: spacing.space12,
    },
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.surface,
    backgroundColor: colors.surfaceSubtleAlpha60,
    padding: spacing.space16,
    color: colors.textSecondary,
  },
  pill: {
    display: "flex",
    minWidth: 64,
    flexDirection: "column",
    alignItems: "center",
    borderRadius: radii.md,
    borderWidth: 1,
    paddingInline: spacing.space12,
    paddingBlock: spacing.space6,
    textAlign: "center",
    boxShadow: {
      ":focus-within": shadows.currentColorFocus,
    },
    transitionProperty: "box-shadow",
  },
  label: {
    cursor: "pointer",
    fontSize: fontSizes.caption,
    fontWeight: fontWeights.semibold,
    textTransform: "uppercase",
    letterSpacing: letterSpacing.wider,
    opacity: 0.8,
  },
  input: {
    width: 48,
    backgroundColor: colors.transparent,
    textAlign: "center",
    fontSize: fontSizes.bodyLarge,
    lineHeight: lineHeights.line24,
    fontWeight: fontWeights.semibold,
    fontVariantNumeric: "tabular-nums",
    color: "currentColor",
    outline: "none",
  },
  operator: {
    fontSize: fontSizes.title,
    lineHeight: lineHeights.line28,
    fontWeight: fontWeights.semibold,
    color: colors.textMuted,
  },
});

const pillStyles = stylex.create({
  outer: {
    backgroundColor: colors.accentAlpha15,
    color: colors.accent,
    borderColor: colors.accentAlpha40,
  },
  inner: {
    backgroundColor: colors.accentSoftAlpha15,
    color: colors.accentSoft,
    borderColor: colors.accentSoftAlpha40,
  },
  padding: {
    backgroundColor: colors.surfaceAlpha70,
    color: colors.textStrong,
    borderColor: colors.border,
  },
});
