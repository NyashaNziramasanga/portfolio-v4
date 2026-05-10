import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type InputHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

type NumberInputProps = {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  className?: string;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "min" | "max" | "step" | "onChange" | "type"
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
    { value, min, max, step = 1, onChange, className, ...rest },
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
        className={cn(
          "appearance-none [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none",
          className,
        )}
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
