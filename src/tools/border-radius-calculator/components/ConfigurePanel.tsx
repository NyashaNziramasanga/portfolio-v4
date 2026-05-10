import { Button } from "@/components/ui/button";
import { RadiusSlider } from "@/tools/border-radius-calculator/components/RadiusSlider";
import {
  RADIUS_BOUNDS,
  type RadiusField,
  type RadiusState,
} from "@/tools/border-radius-calculator/hooks/useBorderRadius";

type ConfigurePanelProps = {
  state: RadiusState;
  onChange: (field: RadiusField, value: number) => void;
  onReset: () => void;
};

export function ConfigurePanel({ state, onChange, onReset }: ConfigurePanelProps) {
  return (
    <section
      aria-labelledby="configure-heading"
      className="rounded-2xl border border-brand-700 bg-brand-800/60 p-5 sm:p-6"
    >
      <header className="mb-5 flex items-center justify-between gap-3">
        <h3 id="configure-heading" className="text-lg font-semibold text-brand-50">
          Configure
        </h3>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="border border-brand-500 bg-brand-800 text-brand-100 hover:bg-brand-700"
          onClick={onReset}
        >
          Reset
        </Button>
      </header>

      <div className="space-y-5">
        <RadiusSlider
          label="Padding"
          value={state.padding}
          min={RADIUS_BOUNDS.padding.min}
          max={RADIUS_BOUNDS.padding.max}
          onChange={(value) => onChange("padding", value)}
        />
        <RadiusSlider
          label="Outer Radius"
          value={state.outer}
          min={RADIUS_BOUNDS.outer.min}
          max={RADIUS_BOUNDS.outer.max}
          onChange={(value) => onChange("outer", value)}
        />
        <RadiusSlider
          label="Inner Radius"
          value={state.inner}
          min={RADIUS_BOUNDS.inner.min}
          max={RADIUS_BOUNDS.inner.max}
          onChange={(value) => onChange("inner", value)}
        />
        <RadiusSlider
          label="Min Radius"
          helper="Prevents the inner radius from going below this floor."
          value={state.min}
          min={RADIUS_BOUNDS.min.min}
          max={RADIUS_BOUNDS.min.max}
          onChange={(value) => onChange("min", value)}
        />
      </div>
    </section>
  );
}
