import type { PropsWithChildren } from "react";
import * as stylex from "@stylexjs/stylex";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { RegisteredTool } from "@/tools/types";
import { colors, constants } from "../styles/tokens.stylex";

type ToolPageProps = PropsWithChildren<{
  tool: RegisteredTool;
}>;

export function ToolPage({ tool, children }: ToolPageProps) {
  return (
    <main {...stylex.props(styles.root)}>
      <div {...stylex.props(styles.container)}>
        <Link to="/" hash="tools" {...stylex.props(styles.backLink)}>
          <ArrowLeft {...stylex.props(styles.icon)} />
          Back to portfolio
        </Link>

        <header {...stylex.props(styles.header)}>
          <h1 {...stylex.props(styles.title)}>{tool.title}</h1>
          <p {...stylex.props(styles.description)}>{tool.description}</p>
        </header>

        {children}
      </div>
    </main>
  );
}

const styles = stylex.create({
  root: {
    minHeight: "100vh",
    backgroundColor: colors.brand900,
    color: colors.brand50,
  },
  container: {
    marginInline: "auto",
    display: "flex",
    width: "100%",
    maxWidth: 1280,
    flexDirection: "column",
    paddingInline: {
      default: 16,
      [constants.sm]: 32,
    },
    paddingBlock: {
      default: 24,
      [constants.sm]: 32,
    },
  },
  backLink: {
    display: "inline-flex",
    width: "fit-content",
    alignItems: "center",
    gap: 8,
    borderRadius: 6,
    paddingInline: 8,
    paddingBlock: 6,
    fontSize: 14,
    lineHeight: "20px",
    color: {
      default: colors.brand300,
      ":hover": colors.brand100,
    },
    transitionProperty: "color",
    outline: {
      ":focus-visible": "none",
    },
    boxShadow: {
      ":focus-visible": "0 0 0 2px hsl(207 68% 50%)",
    },
  },
  icon: {
    width: 16,
    height: 16,
  },
  header: {
    marginTop: 12,
    marginBottom: {
      default: 24,
      [constants.sm]: 32,
    },
    borderBottomWidth: 1,
    borderBottomColor: colors.brand500,
    paddingBottom: 20,
  },
  title: {
    fontSize: {
      default: 24,
      [constants.sm]: 30,
    },
    lineHeight: {
      default: "32px",
      [constants.sm]: "36px",
    },
    fontWeight: 700,
    color: colors.brand50,
  },
  description: {
    marginTop: 8,
    maxWidth: 768,
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
});
