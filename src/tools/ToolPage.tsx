import type { PropsWithChildren } from "react";
import * as stylex from "@stylexjs/stylex";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { RegisteredTool } from "@/tools/types";
import { colors } from "../styles/Colors.stylex";
import { spacing } from "../styles/Spacing.stylex";
import { radii } from "../styles/BorderRadius.stylex";
import {
  fontSizes,
  fontWeights,
  lineHeights,
} from "../styles/Typography.stylex";
import { breakpoints } from "../styles/Breakpoints.stylex";
import { shadows } from "../styles/Shadows.stylex";
import { layout } from "../styles/Layout.stylex";

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
    backgroundColor: colors.background,
    color: colors.textPrimary,
  },
  container: {
    marginInline: "auto",
    display: "flex",
    width: "100%",
    maxWidth: layout.pageMax,
    flexDirection: "column",
    paddingInline: {
      default: spacing.space16,
      [breakpoints.sm]: spacing.space32,
    },
    paddingBlock: {
      default: spacing.space24,
      [breakpoints.sm]: spacing.space32,
    },
  },
  backLink: {
    display: "inline-flex",
    width: "fit-content",
    alignItems: "center",
    gap: spacing.space8,
    borderRadius: radii.sm,
    paddingInline: spacing.space8,
    paddingBlock: spacing.space6,
    fontSize: fontSizes.body,
    lineHeight: lineHeights.line20,
    color: {
      default: colors.textMuted,
      ":hover": colors.textStrong,
    },
    transitionProperty: "color",
    outline: {
      ":focus-visible": "none",
    },
    boxShadow: {
      ":focus-visible": shadows.focus,
    },
  },
  icon: {
    width: 16,
    height: 16,
  },
  header: {
    marginTop: spacing.space12,
    marginBottom: {
      default: spacing.space24,
      [breakpoints.sm]: spacing.space32,
    },
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: spacing.space20,
  },
  title: {
    fontSize: {
      default: fontSizes.heading,
      [breakpoints.sm]: fontSizes.displaySmall,
    },
    lineHeight: {
      default: lineHeights.line32,
      [breakpoints.sm]: lineHeights.line36,
    },
    fontWeight: fontWeights.bold,
    color: colors.textPrimary,
  },
  description: {
    marginTop: spacing.space8,
    maxWidth: layout.contentMedium,
    fontSize: {
      default: fontSizes.body,
      [breakpoints.sm]: fontSizes.bodyLarge,
    },
    lineHeight: {
      default: lineHeights.line20,
      [breakpoints.sm]: lineHeights.line24,
    },
    color: colors.textMuted,
  },
});
