import * as stylex from "@stylexjs/stylex";
import { colors, constants } from "../../../styles/tokens.stylex";

export function BorderRadiusHeader() {
  return (
    <header {...stylex.props(styles.root)}>
      <h2 {...stylex.props(styles.title)}>
        Concentric corners, <span {...stylex.props(styles.accent)}>solved</span>
        .
      </h2>
      <p {...stylex.props(styles.description)}>
        The rule of thumb for nested rounded rectangles is{" "}
        <span {...stylex.props(styles.code)}>
          inner radius + padding = outer radius
        </span>
        . Drag any slider and the others stay in sync.
      </p>
    </header>
  );
}

const styles = stylex.create({
  root: {
    marginBottom: {
      default: 24,
      [constants.sm]: 28,
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
  code: {
    borderRadius: 6,
    backgroundColor: colors.brand700,
    paddingInline: 6,
    paddingBlock: 2,
    fontFamily:
      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    fontSize: 12,
    color: colors.brand100,
  },
});
