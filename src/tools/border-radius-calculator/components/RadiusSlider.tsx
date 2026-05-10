import { useId } from "react";
import { cn } from "@/lib/utils";

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
  const id = useId();

  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <label
          htmlFor={id}
          className="text-sm font-medium text-brand-100"
        >
          {label}
        </label>
        <span className="rounded-md bg-brand-900/70 px-2 py-0.5 text-xs font-semibold tabular-nums text-brand-100">
          {value}
          {unit}
        </span>
      </div>

      <input
        id={id}
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
