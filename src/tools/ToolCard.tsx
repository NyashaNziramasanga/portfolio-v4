import { Link } from "@tanstack/react-router";
import { ChevronRight, Wrench } from "lucide-react";
import * as stylex from "@stylexjs/stylex";
import type { ToolListItem } from "@/tools/types";
import { track } from "@vercel/analytics/react";
import { colors, constants } from "../styles/tokens.stylex";

type ToolCardProps = {
  tool: ToolListItem;
};

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link
      to="/tools/$toolId"
      params={{ toolId: tool.slug }}
      onClick={() => track("Tool Opened", { tool: tool.slug })}
      {...stylex.props(styles.card, stylex.defaultMarker())}
    >
      <div {...stylex.props(styles.row)}>
        <div {...stylex.props(styles.iconBox)}>
          <Wrench {...stylex.props(styles.wrench)} />
        </div>

        <div {...stylex.props(styles.copy)}>
          <p {...stylex.props(styles.title)}>{tool.title}</p>
          <p {...stylex.props(styles.description)}>{tool.description}</p>
        </div>

        <ChevronRight {...stylex.props(styles.chevron)} />
      </div>
    </Link>
  );
}

const styles = stylex.create({
  card: {
    borderRadius: {
      default: 12,
      [constants.sm]: 16,
    },
    backgroundColor: {
      default: colors.brand700,
      ":hover": colors.brand600,
    },
    paddingInline: {
      default: 16,
      [constants.sm]: 24,
    },
    paddingBlock: {
      default: 16,
      [constants.sm]: 20,
    },
    color: colors.brand50,
    boxShadow: {
      default: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      ":hover":
        "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      ":focus-visible": "0 0 0 2px #1A202C, 0 0 0 4px hsl(207 68% 50%)",
    },
    transform: {
      default: "translateY(0)",
      ":hover": "translateY(-2px)",
    },
    transitionProperty: "all",
    transitionDuration: "300ms",
    transitionTimingFunction: constants.easeOut,
    outline: {
      ":focus-visible": "none",
    },
  },
  row: {
    display: "flex",
    alignItems: "flex-start",
    gap: {
      default: 12,
      [constants.sm]: 16,
    },
  },
  iconBox: {
    marginTop: 2,
    display: "flex",
    height: {
      default: 32,
      [constants.sm]: 40,
    },
    width: {
      default: 32,
      [constants.sm]: 40,
    },
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    backgroundColor: colors.brand600,
    color: colors.primary,
  },
  wrench: {
    width: {
      default: 16,
      [constants.sm]: 20,
    },
    height: {
      default: 16,
      [constants.sm]: 20,
    },
  },
  copy: {
    minWidth: 0,
    flex: "1",
  },
  title: {
    fontSize: {
      default: 13,
      [constants.sm]: 16,
    },
    fontWeight: 600,
    lineHeight: 1.375,
    color: colors.brand50,
  },
  description: {
    marginTop: 4,
    fontSize: {
      default: 12,
      [constants.sm]: 14,
    },
    lineHeight: {
      default: "16px",
      [constants.sm]: "20px",
    },
    color: colors.brand300,
  },
  chevron: {
    marginTop: 4,
    width: {
      default: 16,
      [constants.sm]: 20,
    },
    height: {
      default: 16,
      [constants.sm]: 20,
    },
    flexShrink: 0,
    color: {
      default: colors.brand300,
      [stylex.when.ancestor(":hover")]: colors.brand100,
    },
    transform: {
      default: "translateX(0)",
      [stylex.when.ancestor(":hover")]: "translateX(2px)",
    },
    transitionProperty: "transform, color",
    transitionDuration: "300ms",
  },
});
