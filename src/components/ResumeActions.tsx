import * as stylex from "@stylexjs/stylex";
import { ExternalLink } from "lucide-react";
import { track } from "@vercel/analytics/react";
import { colors } from "../styles/Colors.stylex";
import { spacing } from "../styles/Spacing.stylex";
import { radii } from "../styles/BorderRadius.stylex";
import {
  fontSizes,
  fontWeights,
  lineHeights,
} from "../styles/Typography.stylex";
import { shadows } from "../styles/Shadows.stylex";
import { layout } from "../styles/Layout.stylex";

const RESUME_URL = "/files/nyasha-nziramasanga-resume.pdf";

export function ResumeActions() {
  return (
    <a
      href={RESUME_URL}
      target="_blank"
      rel="noopener noreferrer"
      {...stylex.props(styles.action)}
      onClick={() => track("Resume Viewed")}
    >
      <ExternalLink {...stylex.props(styles.icon)} aria-hidden="true" />
      View résumé
    </a>
  );
}

const styles = stylex.create({
  action: {
    display: "inline-flex",
    minHeight: layout.touchTarget,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: {
      default: colors.border,
      ":hover": colors.accentSurfaceAlpha60,
    },
    paddingInline: spacing.md,
    paddingBlock: spacing.sm,
    fontSize: fontSizes.body,
    lineHeight: lineHeights.line20,
    fontWeight: fontWeights.semibold,
    color: {
      default: colors.textStrong,
      ":hover": colors.textPrimary,
    },
    backgroundColor: {
      default: colors.transparent,
      ":hover": colors.surface,
    },
    transitionProperty: "color, background-color, border-color",
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
});
