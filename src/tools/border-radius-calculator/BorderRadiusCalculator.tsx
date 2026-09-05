import * as stylex from "@stylexjs/stylex";
import { BorderRadiusHeader } from "@/tools/border-radius-calculator/components/BorderRadiusHeader";
import { RadiusIllustration } from "@/tools/border-radius-calculator/components/RadiusIllustration";
import { ConfigurePanel } from "@/tools/border-radius-calculator/components/ConfigurePanel";
import { FormulaBadge } from "@/tools/border-radius-calculator/components/FormulaBadge";
import { SnippetOutput } from "@/tools/border-radius-calculator/components/SnippetOutput";
import { useBorderRadius } from "@/tools/border-radius-calculator/hooks/useBorderRadius";
import { spacing } from "../../styles/Spacing.stylex";
import { breakpoints } from "../../styles/Breakpoints.stylex";

export function BorderRadiusCalculator() {
  const { state, set, reset } = useBorderRadius();

  return (
    <div {...stylex.props(styles.root)}>
      <BorderRadiusHeader />

      <div {...stylex.props(styles.layout)}>
        <div {...stylex.props(styles.main)}>
          <RadiusIllustration
            outerRadius={state.outer}
            innerRadius={state.inner}
            padding={state.padding}
          />
          <FormulaBadge
            innerRadius={state.inner}
            padding={state.padding}
            outerRadius={state.outer}
            onChange={set}
          />
          <SnippetOutput
            outerRadius={state.outer}
            innerRadius={state.inner}
            padding={state.padding}
          />
        </div>

        <aside {...stylex.props(styles.aside)}>
          <ConfigurePanel state={state} onChange={set} onReset={reset} />
        </aside>
      </div>
    </div>
  );
}

const styles = stylex.create({
  root: {
    paddingBottom: {
      default: spacing.space39,
      [breakpoints.sm]: spacing.space40,
    },
  },
  layout: {
    display: "grid",
    gap: {
      default: spacing.space20,
      [breakpoints.lg]: spacing.space24,
    },
    gridTemplateColumns: {
      [breakpoints.lg]: "minmax(0, 1fr) 360px",
    },
  },
  main: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.space20,
  },
  aside: {
    position: {
      [breakpoints.lg]: "sticky",
    },
    top: {
      [breakpoints.lg]: spacing.space24,
    },
    alignSelf: {
      [breakpoints.lg]: "flex-start",
    },
  },
});
