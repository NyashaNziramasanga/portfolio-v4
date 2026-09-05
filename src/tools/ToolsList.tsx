import * as stylex from "@stylexjs/stylex";
import toolsData from "@/tools/data/tools.json";
import { ToolCard } from "@/tools/ToolCard";
import type { ToolListItem } from "@/tools/types";
import { colors, constants } from "../styles/tokens.stylex";

const tools = toolsData as ToolListItem[];

export function ToolsList() {
  return (
    <div {...stylex.props(styles.root)}>
      <h2 {...stylex.props(styles.title)}>Tools</h2>
      <div {...stylex.props(styles.list)}>
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
}

const styles = stylex.create({
  root: {
    display: "flex",
    width: "100%",
    maxWidth: 1024,
    flexDirection: "column",
  },
  title: {
    marginBottom: {
      default: 32,
      [constants.sm]: 40,
    },
    fontSize: {
      default: 20,
      [constants.sm]: 24,
    },
    lineHeight: {
      default: "28px",
      [constants.sm]: "32px",
    },
    fontWeight: 700,
    color: colors.brand50,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
});
