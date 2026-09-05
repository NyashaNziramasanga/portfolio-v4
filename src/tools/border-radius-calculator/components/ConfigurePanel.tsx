import * as stylex from "@stylexjs/stylex";
import { Button } from "@/components/ui/button";
import { RadiusSlider } from "@/tools/border-radius-calculator/components/RadiusSlider";
import {
  RADIUS_BOUNDS,
  type RadiusField,
  type RadiusState,
} from "@/tools/border-radius-calculator/hooks/useBorderRadius";
import { colors, constants } from "../../../styles/tokens.stylex";

type ConfigurePanelProps = {
  state: RadiusState;
  onChange: (field: RadiusField, value: number) => void;
  onReset: () => void;
};

export function ConfigurePanel({
  state,
  onChange,
  onReset,
}: ConfigurePanelProps) {
  return (
    <section aria-labelledby="configure-heading" {...stylex.props(styles.root)}>
      <header {...stylex.props(styles.header)}>
        <h3 id="configure-heading" {...stylex.props(styles.title)}>
          Configure
        </h3>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          style={styles.reset}
          onClick={onReset}
        >
          Reset
        </Button>
      </header>

      <div {...stylex.props(styles.controls)}>
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

const styles = stylex.create({
  root: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.brand700,
    backgroundColor: "color-mix(in oklab, #1F2937 60%, transparent)",
    padding: {
      default: 20,
      [constants.sm]: 24,
    },
  },
  header: {
    marginBottom: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  title: {
    fontSize: 18,
    lineHeight: "28px",
    fontWeight: 600,
    color: colors.brand50,
  },
  reset: {
    borderWidth: 1,
    borderColor: colors.brand500,
    backgroundColor: {
      default: colors.brand800,
      ":hover": colors.brand700,
    },
    color: colors.brand100,
  },
  controls: {
    display: "flex",
    flexDirection: "column",
    gap: 26,
  },
});
