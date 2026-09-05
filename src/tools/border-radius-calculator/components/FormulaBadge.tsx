import { useId } from "react";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { NumberInput } from "@/tools/border-radius-calculator/components/NumberInput";
import {
  RADIUS_BOUNDS,
  type RadiusField,
} from "@/tools/border-radius-calculator/hooks/useBorderRadius";
import { colors, constants } from "../../../styles/tokens.stylex";

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
      default: 8,
      [constants.sm]: 12,
    },
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.brand700,
    backgroundColor: "color-mix(in oklab, #1F2937 60%, transparent)",
    padding: 16,
    color: colors.brand200,
  },
  pill: {
    display: "flex",
    minWidth: 64,
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    paddingInline: 12,
    paddingBlock: 6,
    textAlign: "center",
    boxShadow: {
      ":focus-within": "0 0 0 2px currentColor",
    },
    transitionProperty: "box-shadow",
  },
  label: {
    cursor: "pointer",
    fontSize: 10,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    opacity: 0.8,
  },
  input: {
    width: 48,
    backgroundColor: "transparent",
    textAlign: "center",
    fontSize: 16,
    lineHeight: "24px",
    fontWeight: 600,
    fontVariantNumeric: "tabular-nums",
    color: "currentColor",
    outline: "none",
  },
  operator: {
    fontSize: 20,
    lineHeight: "28px",
    fontWeight: 600,
    color: colors.brand300,
  },
});

const pillStyles = stylex.create({
  outer: {
    backgroundColor: "color-mix(in oklab, hsl(207 68% 50%) 15%, transparent)",
    color: colors.primary,
    borderColor: "color-mix(in oklab, hsl(207 68% 50%) 40%, transparent)",
  },
  inner: {
    backgroundColor: "color-mix(in oklab, #90CDF4 15%, transparent)",
    color: colors.blue200,
    borderColor: "color-mix(in oklab, #90CDF4 40%, transparent)",
  },
  padding: {
    backgroundColor: "color-mix(in oklab, #252F3F 70%, transparent)",
    color: colors.brand100,
    borderColor: colors.brand500,
  },
});
