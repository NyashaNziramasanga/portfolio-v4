type FormulaBadgeProps = {
  innerRadius: number;
  padding: number;
  outerRadius: number;
};

const outerStyle = "bg-primary/15 text-primary border-primary/40";
const innerStyle = "bg-blue-200/15 text-blue-200 border-blue-200/40";
const paddingStyle = "bg-brand-700/70 text-brand-100 border-brand-500";

function Pill({
  label,
  value,
  className,
}: {
  label: string;
  value: number;
  className: string;
}) {
  return (
    <div
      className={`flex min-w-[64px] flex-col items-center rounded-lg border px-3 py-1.5 text-center ${className}`}
    >
      <span className="text-[10px] font-semibold uppercase tracking-wider opacity-80">
        {label}
      </span>
      <span className="text-base font-semibold tabular-nums">{value}</span>
    </div>
  );
}

export function FormulaBadge({
  innerRadius,
  padding,
  outerRadius,
}: FormulaBadgeProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-brand-700 bg-brand-800/60 p-4 text-brand-200 sm:gap-3">
      <Pill label="Inner R" value={innerRadius} className={innerStyle} />
      <span className="text-xl font-semibold text-brand-300">+</span>
      <Pill label="Padding" value={padding} className={paddingStyle} />
      <span className="text-xl font-semibold text-brand-300">=</span>
      <Pill label="Outer R" value={outerRadius} className={outerStyle} />
    </div>
  );
}
