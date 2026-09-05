import * as stylex from "@stylexjs/stylex";
import toolsData from "@/tools/data/tools.json";
import { ToolCard } from "@/tools/ToolCard";
import type { ToolListItem } from "@/tools/types";
import { colors } from "../styles/Colors.stylex";
import { spacing } from "../styles/Spacing.stylex";
import {
  fontSizes,
  fontWeights,
  lineHeights,
} from "../styles/Typography.stylex";
import { breakpoints } from "../styles/Breakpoints.stylex";
import { layout } from "../styles/Layout.stylex";

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
    maxWidth: layout.contentMax,
    flexDirection: "column",
  },
  title: {
    marginBottom: {
      default: spacing.space32,
      [breakpoints.sm]: spacing.space40,
    },
    fontSize: {
      default: fontSizes.title,
      [breakpoints.sm]: fontSizes.heading,
    },
    lineHeight: {
      default: lineHeights.line28,
      [breakpoints.sm]: lineHeights.line32,
    },
    fontWeight: fontWeights.bold,
    color: colors.textPrimary,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.space16,
  },
});
