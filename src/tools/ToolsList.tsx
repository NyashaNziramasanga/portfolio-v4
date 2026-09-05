import * as stylex from "@stylexjs/stylex";
import toolsData from "@/tools/data/tools.json";
import { ToolCard } from "@/tools/ToolCard";
import type { ToolListItem } from "@/tools/types";
import { colors } from "../styles/Colors.stylex";
import { fonts } from "../styles/Fonts.stylex";
import { spacing } from "../styles/Spacing.stylex";
import { breakpoints } from "../styles/Breakpoints.stylex";
import { layout } from "../styles/Layout.stylex";

const tools = toolsData as ToolListItem[];

export function ToolsList() {
  return (
    <div {...stylex.props(styles.root)}>
      <h2 {...stylex.props(fonts.sectionHeading, styles.title)}>Tools</h2>
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
    maxWidth: layout.contentMax,
    flexDirection: "column",
  },
  title: {
    marginBottom: {
      default: spacing.xxl,
      [breakpoints.sm]: spacing.xxxl,
    },
    color: colors.textPrimary,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.md,
  },
});
