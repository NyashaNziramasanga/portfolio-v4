import * as stylex from "@stylexjs/stylex";
import { Button } from "@/components/ui/button";
import { RadiusSlider } from "@/tools/border-radius-calculator/components/RadiusSlider";
import { colors } from "../../../styles/Colors.stylex";
import { spacing } from "../../../styles/Spacing.stylex";
import { radii } from "../../../styles/BorderRadius.stylex";
import {
  fontSizes,
  fontWeights,
  lineHeights,
} from "../../../styles/Typography.stylex";
import { breakpoints } from "../../../styles/Breakpoints.stylex";
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
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.surface,
    backgroundColor: colors.surfaceSubtleAlpha60,
    padding: {
      default: spacing.space20,
      [breakpoints.sm]: spacing.space24,
    },
  },
  header: {
    marginBottom: spacing.space20,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.space12,
  },
  title: {
    fontSize: fontSizes.titleSmall,
    lineHeight: lineHeights.line28,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary,
  },
  reset: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: {
      default: colors.surfaceSubtle,
      ":hover": colors.surface,
    },
    color: colors.textStrong,
  },
  controls: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.space26,
  },
});
