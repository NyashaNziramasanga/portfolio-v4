import * as stylex from "@stylexjs/stylex";
import { colors, constants } from "../../../styles/tokens.stylex";

export function StackPickerHeader() {
  return (
    <header {...stylex.props(styles.root)}>
      <h2 {...stylex.props(styles.title)}>
        Pick a <span {...stylex.props(styles.accent)}>stack</span>. Ship it.
      </h2>
      <p {...stylex.props(styles.description)}>
        Click through each layer to build your mobile app stack. Export a clean
        prompt you can paste into your workflow.
      </p>

      <div {...stylex.props(styles.tags)}>
        <span {...stylex.props(styles.primaryTag)}>single click to select</span>
        <span {...stylex.props(styles.tag)}>click again to deselect</span>
        <span {...stylex.props(styles.tag)}>
          picks appear in the bottom bar
        </span>
      </div>
    </header>
  );
}

const styles = stylex.create({
  root: {
    marginBottom: {
      default: 24,
      [constants.sm]: 32,
    },
  },
  title: {
    fontSize: {
      default: 30,
      [constants.sm]: 48,
    },
    lineHeight: {
      default: "36px",
      [constants.sm]: "1",
    },
    fontWeight: 800,
    letterSpacing: "-0.025em",
    color: colors.brand50,
  },
  accent: {
    color: colors.primary,
  },
  description: {
    marginTop: 8,
    maxWidth: 672,
    fontSize: {
      default: 14,
      [constants.sm]: 16,
    },
    lineHeight: {
      default: "20px",
      [constants.sm]: "24px",
    },
    color: colors.brand300,
  },
  tags: {
    marginTop: 16,
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    fontSize: 11,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.025em",
  },
  primaryTag: {
    borderRadius: 6,
    backgroundColor: "color-mix(in oklab, hsl(207 68% 50%) 15%, transparent)",
    paddingInline: 10,
    paddingBlock: 4,
    color: colors.primary,
  },
  tag: {
    borderRadius: 6,
    backgroundColor: colors.brand700,
    paddingInline: 10,
    paddingBlock: 4,
    color: colors.brand200,
  },
});
