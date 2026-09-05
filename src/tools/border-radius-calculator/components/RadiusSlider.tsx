import { useId } from "react";
import * as stylex from "@stylexjs/stylex";
import { NumberInput } from "@/tools/border-radius-calculator/components/NumberInput";
import { colors } from "../../../styles/tokens.stylex";

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
    gap: 12,
  },
  label: {
    fontSize: 14,
    lineHeight: "20px",
    fontWeight: 500,
    color: colors.brand100,
  },
  valueBox: {
    display: "flex",
    alignItems: "baseline",
    gap: 4,
    borderRadius: 6,
    backgroundColor: "color-mix(in oklab, #1A202C 70%, transparent)",
    paddingLeft: 4,
    paddingRight: 8,
    boxShadow: {
      ":focus-within": "0 0 0 2px hsl(207 68% 50%)",
    },
    transitionProperty: "box-shadow",
  },
  numberInput: {
    width: 40,
    backgroundColor: "transparent",
    paddingBlock: 2,
    textAlign: "right",
    fontSize: 12,
    lineHeight: "16px",
    fontWeight: 600,
    fontVariantNumeric: "tabular-nums",
    color: colors.brand100,
    outline: "none",
  },
  unit: {
    fontSize: 12,
    lineHeight: "16px",
    fontWeight: 600,
    color: colors.brand100,
  },
  slider: {
    marginTop: 6,
    height: 6,
    width: "100%",
    cursor: "pointer",
    appearance: "none",
    borderRadius: 9999,
    backgroundColor: colors.brand700,
    accentColor: colors.primary,
    outline: {
      ":focus-visible": "none",
    },
    boxShadow: {
      ":focus-visible": "0 0 0 2px #1F2937, 0 0 0 4px hsl(207 68% 50%)",
    },
  },
  helper: {
    marginTop: 6,
    fontSize: 12,
    lineHeight: "16px",
    color: colors.brand400,
  },
});
