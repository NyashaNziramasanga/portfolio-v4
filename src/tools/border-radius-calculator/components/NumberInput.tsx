import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type InputHTMLAttributes,
} from "react";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";

type NumberInputProps = {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  style?: StyleXStyles;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "min" | "max" | "step" | "onChange" | "type" | "className" | "style"
>;

const clamp = (value: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, value));

/**
 * Controlled numeric input that lets the user type freely without "snapping"
 * mid-stroke: only commits values that are within bounds, and clamps on blur.
 * Stays in sync with the canonical `value` prop whenever the input is unfocused.
 */
export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  function NumberInput(
    { value, min, max, step = 1, onChange, style, ...rest },
    ref,
  ) {
    const [draft, setDraft] = useState(() => String(value));
    const isFocused = useRef(false);

    useEffect(() => {
      if (!isFocused.current) setDraft(String(value));
    }, [value]);

    const commit = (raw: string) => {
      if (raw === "") {
        setDraft(String(value));
        return;
      }
      const parsed = Number(raw);
      if (!Number.isFinite(parsed)) {
        setDraft(String(value));
        return;
      }
      const next = clamp(Math.round(parsed), min, max);
      setDraft(String(next));
      if (next !== value) onChange(next);
    };

    const { onFocus, onBlur, onKeyDown, ...inputProps } = rest;

    return (
      <input
        ref={ref}
        type="number"
        inputMode="numeric"
        value={draft}
        min={min}
        max={max}
        step={step}
        {...stylex.props(styles.input, style)}
        {...inputProps}
        onChange={(event) => {
          const next = event.target.value;
          setDraft(next);
          if (next === "" || next === "-") return;
          const parsed = Number(next);
          if (!Number.isFinite(parsed)) return;
          if (parsed < min || parsed > max) return;
          const rounded = Math.round(parsed);
          if (rounded !== value) onChange(rounded);
        }}
        onFocus={(event) => {
          isFocused.current = true;
          event.target.select();
          onFocus?.(event);
        }}
        onBlur={(event) => {
          isFocused.current = false;
          commit(event.target.value);
          onBlur?.(event);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.currentTarget.blur();
          }
          onKeyDown?.(event);
        }}
      />
    );
  },
);

const styles = stylex.create({
  input: {
    appearance: "none",
    // StyleX supports vendor-prefixed runtime output, but the lint rule only
    // validates standard property names.
    // eslint-disable-next-line @stylexjs/valid-styles
    MozAppearance: "textfield",
    "::-webkit-inner-spin-button": {
      margin: 0,
      appearance: "none",
    },
    "::-webkit-outer-spin-button": {
      margin: 0,
      appearance: "none",
    },
  },
});
