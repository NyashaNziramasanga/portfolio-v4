import * as stylex from "@stylexjs/stylex";
import { BorderRadiusHeader } from "@/tools/border-radius-calculator/components/BorderRadiusHeader";
import { RadiusIllustration } from "@/tools/border-radius-calculator/components/RadiusIllustration";
import { ConfigurePanel } from "@/tools/border-radius-calculator/components/ConfigurePanel";
import { FormulaBadge } from "@/tools/border-radius-calculator/components/FormulaBadge";
import { SnippetOutput } from "@/tools/border-radius-calculator/components/SnippetOutput";
import { useBorderRadius } from "@/tools/border-radius-calculator/hooks/useBorderRadius";
import { constants } from "../../styles/tokens.stylex";

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
      default: 39,
      [constants.sm]: 40,
    },
  },
  layout: {
    display: "grid",
    gap: {
      default: 20,
      [constants.lg]: 24,
    },
    gridTemplateColumns: {
      [constants.lg]: "minmax(0, 1fr) 360px",
    },
  },
  main: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  aside: {
    position: {
      [constants.lg]: "sticky",
    },
    top: {
      [constants.lg]: 24,
    },
    alignSelf: {
      [constants.lg]: "flex-start",
    },
  },
});
