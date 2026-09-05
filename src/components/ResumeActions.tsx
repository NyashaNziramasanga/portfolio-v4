import * as stylex from "@stylexjs/stylex";
import { ExternalLink } from "lucide-react";
import { track } from "@vercel/analytics/react";
import { colors } from "../styles/tokens.stylex";

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
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: {
      default: colors.brand500,
      ":hover": "color-mix(in oklab, #4299E1 60%, transparent)",
    },
    paddingInline: 16,
    paddingBlock: 10,
    fontSize: 14,
    lineHeight: "20px",
    fontWeight: 600,
    color: {
      default: colors.brand100,
      ":hover": colors.brand50,
    },
    backgroundColor: {
      default: "transparent",
      ":hover": colors.brand700,
    },
    transitionProperty: "color, background-color, border-color",
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
});
