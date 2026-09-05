import { useId } from "react";
import * as stylex from "@stylexjs/stylex";
import { NumberInput } from "@/tools/border-radius-calculator/components/NumberInput";
import { colors } from "../../../styles/Colors.stylex";
import { spacing } from "../../../styles/Spacing.stylex";
import { radii } from "../../../styles/BorderRadius.stylex";
import {
  fontSizes,
  fontWeights,
  lineHeights,
} from "../../../styles/Typography.stylex";
import { shadows } from "../../../styles/Shadows.stylex";

type RadiusSliderProps = {
  label: string;
  helper?: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
};

export function RadiusSlider({
  label,
  helper,
  value,
  min,
  max,
  step = 1,
  unit = "px",
  onChange,
}: RadiusSliderProps) {
  const sliderId = useId();
  const inputId = useId();

  return (
    <div {...stylex.props(styles.root)}>
      <div {...stylex.props(styles.header)}>
        <label htmlFor={sliderId} {...stylex.props(styles.label)}>
          {label}
        </label>

        <div {...stylex.props(styles.valueBox)}>
          <NumberInput
            id={inputId}
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={onChange}
            aria-label={`${label} value`}
            style={styles.numberInput}
          />
          <span {...stylex.props(styles.unit)}>{unit}</span>
        </div>
      </div>

      <input
        id={sliderId}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        {...stylex.props(styles.slider)}
      />

      {helper ? <p {...stylex.props(styles.helper)}>{helper}</p> : null}
    </div>
  );
}

const styles = stylex.create({
  root: {},
  header: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: spacing.space12,
  },
  label: {
    fontSize: fontSizes.body,
    lineHeight: lineHeights.line20,
    fontWeight: fontWeights.medium,
    color: colors.textStrong,
  },
  valueBox: {
    display: "flex",
    alignItems: "baseline",
    gap: spacing.space4,
    borderRadius: radii.sm,
    backgroundColor: colors.backgroundAlpha70,
    paddingLeft: spacing.space4,
    paddingRight: spacing.space8,
    boxShadow: {
      ":focus-within": shadows.focus,
    },
    transitionProperty: "box-shadow",
  },
  numberInput: {
    width: 40,
    backgroundColor: colors.transparent,
    paddingBlock: spacing.space2,
    textAlign: "right",
    fontSize: fontSizes.label,
    lineHeight: lineHeights.line16,
    fontWeight: fontWeights.semibold,
    fontVariantNumeric: "tabular-nums",
    color: colors.textStrong,
    outline: "none",
  },
  unit: {
    fontSize: fontSizes.label,
    lineHeight: lineHeights.line16,
    fontWeight: fontWeights.semibold,
    color: colors.textStrong,
  },
  slider: {
    marginTop: spacing.space6,
    height: 6,
    width: "100%",
    cursor: "pointer",
    appearance: "none",
    borderRadius: radii.pill,
    backgroundColor: colors.surface,
    accentColor: colors.accent,
    outline: {
      ":focus-visible": "none",
    },
    boxShadow: {
      ":focus-visible": shadows.focusOffsetSurface,
    },
  },
  helper: {
    marginTop: spacing.space6,
    fontSize: fontSizes.label,
    lineHeight: lineHeights.line16,
    color: colors.textSubtle,
  },
});
