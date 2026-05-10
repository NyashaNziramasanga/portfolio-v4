import { useId } from "react";
import { cn } from "@/lib/utils";
import { NumberInput } from "@/tools/border-radius-calculator/components/NumberInput";
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

const outerStyle = "bg-primary/15 text-primary border-primary/40";
const innerStyle = "bg-blue-200/15 text-blue-200 border-blue-200/40";
const paddingStyle = "bg-brand-700/70 text-brand-100 border-brand-500";

type EditablePillProps = {
  label: string;
  value: number;
  field: RadiusField;
  className: string;
  onChange: (field: RadiusField, value: number) => void;
};

function EditablePill({
  label,
  value,
  field,
  className,
  onChange,
}: EditablePillProps) {
  const inputId = useId();
  const bounds = RADIUS_BOUNDS[field];

  return (
    <div
      className={cn(
        "flex min-w-[64px] flex-col items-center rounded-lg border px-3 py-1.5 text-center transition-shadow focus-within:ring-2 focus-within:ring-current",
        className,
      )}
    >
      <label
        htmlFor={inputId}
        className="cursor-pointer text-[10px] font-semibold uppercase tracking-wider opacity-80"
      >
        {label}
      </label>
      <NumberInput
        id={inputId}
        value={value}
        min={bounds.min}
        max={bounds.max}
        onChange={(next) => onChange(field, next)}
        aria-label={`${label} value`}
        className="w-12 bg-transparent text-center text-base font-semibold tabular-nums text-current outline-none"
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
    <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-brand-700 bg-brand-800/60 p-4 text-brand-200 sm:gap-3">
      <EditablePill
        label="Inner R"
        value={innerRadius}
        field="inner"
        className={innerStyle}
        onChange={onChange}
      />
      <span className="text-xl font-semibold text-brand-300">+</span>
      <EditablePill
        label="Padding"
        value={padding}
        field="padding"
        className={paddingStyle}
        onChange={onChange}
      />
      <span className="text-xl font-semibold text-brand-300">=</span>
      <EditablePill
        label="Outer R"
        value={outerRadius}
        field="outer"
        className={outerStyle}
        onChange={onChange}
      />
    </div>
  );
}
