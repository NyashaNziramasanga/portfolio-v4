import { useId } from "react";
import { cn } from "@/lib/utils";
import { NumberInput } from "@/tools/border-radius-calculator/components/NumberInput";

type RadiusSliderProps = {
  label: string;
  helper?: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  accentClass?: string;
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
  accentClass = "accent-primary",
  onChange,
}: RadiusSliderProps) {
  const sliderId = useId();
  const inputId = useId();

  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <label
          htmlFor={sliderId}
          className="text-sm font-medium text-brand-100"
        >
          {label}
        </label>

        <div className="flex items-baseline gap-1 rounded-md bg-brand-900/70 pl-1 pr-2 transition-shadow focus-within:ring-2 focus-within:ring-primary">
          <NumberInput
            id={inputId}
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={onChange}
            aria-label={`${label} value`}
            className="w-10 bg-transparent py-0.5 text-right text-xs font-semibold tabular-nums text-brand-100 outline-none"
          />
          <span className="text-xs font-semibold text-brand-100">{unit}</span>
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
        className={cn(
          "h-1.5 w-full cursor-pointer appearance-none rounded-full bg-brand-700",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-800",
          accentClass,
        )}
      />

      {helper ? (
        <p className="text-xs text-brand-400">{helper}</p>
      ) : null}
    </div>
  );
}
