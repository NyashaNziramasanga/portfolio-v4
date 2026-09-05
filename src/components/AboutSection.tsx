import * as stylex from "@stylexjs/stylex";
import techStackData from "@/data/techStack.json";
import { ResumeActions } from "@/components/ResumeActions";
import { colors } from "../styles/Colors.stylex";
import { spacing } from "../styles/Spacing.stylex";
import { radii } from "../styles/BorderRadius.stylex";
import {
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacing,
} from "../styles/Typography.stylex";
import { motion } from "../styles/Motion.stylex";
import { breakpoints } from "../styles/Breakpoints.stylex";
import { shadows } from "../styles/Shadows.stylex";
import { layout } from "../styles/Layout.stylex";

const YEARS_OF_EXPERIENCE = new Date().getFullYear() - 2018;

export function AboutSection() {
  return (
    <div {...stylex.props(styles.root)}>
      <p {...stylex.props(styles.eyebrow)}>Hello, I'm Nash 👋🏿</p>
      <h1 {...stylex.props(styles.title)}>
        Senior Mobile Engineer
        <span {...stylex.props(styles.subtitle)}>
          React Native, iOS, Android &amp; Agentic Tooling
        </span>
      </h1>
      <p {...stylex.props(styles.summary)}>
        I build and scale mobile products used by millions of people. Based in
        Melbourne with over {YEARS_OF_EXPERIENCE} years of experience, I work at{" "}
        <a
          href="https://linktr.ee"
          target="_blank"
          rel="noopener noreferrer"
          {...stylex.props(styles.link)}
        >
          Linktree
        </a>{" "}
        across React Native architecture, reliable delivery and creator
        experiences on iOS and Android.
      </p>

      <div {...stylex.props(styles.actions)}>
        <ResumeActions />
      </div>

      <div {...stylex.props(styles.grid)}>
        {techStackData.map((group) => (
          <div
            {...stylex.props(styles.card, stylex.defaultMarker())}
            key={group.id}
          >
            <div {...stylex.props(styles.emoji)} aria-hidden="true">
              {group.emoji}
            </div>
            <h2 {...stylex.props(styles.cardTitle)}>{group.label}</h2>
            <p {...stylex.props(styles.cardSummary)}>{group.summary}</p>
          </div>
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
  eyebrow: {
    fontSize: fontSizes.label,
    lineHeight: lineHeights.line16,
    fontWeight: fontWeights.semibold,
    textTransform: "uppercase",
    letterSpacing: letterSpacing.eyebrow,
    color: colors.accentText,
  },
  title: {
    marginTop: spacing.space12,
    maxWidth: layout.contentWide,
    fontSize: {
      default: fontSizes.displaySmall,
      [breakpoints.sm]: fontSizes.display,
      [breakpoints.lg]: fontSizes.displayLarge,
    },
    lineHeight: lineHeights.tight,
    fontWeight: fontWeights.bold,
    color: colors.textPrimary,
  },
  subtitle: {
    marginTop: spacing.space8,
    display: "block",
    fontSize: {
      default: fontSizes.title,
      [breakpoints.sm]: fontSizes.heading,
      [breakpoints.lg]: fontSizes.displaySmall,
    },
    lineHeight: {
      default: lineHeights.line28,
      [breakpoints.sm]: lineHeights.line32,
      [breakpoints.lg]: lineHeights.line36,
    },
    fontWeight: fontWeights.semibold,
    color: colors.textMuted,
  },
  summary: {
    marginTop: spacing.space24,
    maxWidth: layout.contentWide,
    fontSize: {
      default: fontSizes.body,
      [breakpoints.sm]: fontSizes.bodyLarge,
    },
    lineHeight: {
      default: lineHeights.relaxed,
      [breakpoints.sm]: lineHeights.line28,
    },
    color: colors.textSecondary,
  },
  link: {
    color: {
      default: colors.accentText,
      ":hover": colors.accentSoft,
    },
    textDecorationLine: "underline",
    textUnderlineOffset: 2,
  },
  actions: {
    marginTop: spacing.space28,
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: spacing.space12,
  },
  grid: {
    marginTop: {
      default: spacing.space40,
      [breakpoints.sm]: spacing.space48,
    },
    display: "grid",
    gap: spacing.space16,
    gridTemplateColumns: {
      [breakpoints.sm]: "repeat(2, minmax(0, 1fr))",
      [breakpoints.lg]: "repeat(3, minmax(0, 1fr))",
    },
  },
  card: {
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: {
      default: colors.borderAlpha50,
      ":hover": colors.accentSurfaceAlpha30,
    },
    backgroundColor: {
      default: colors.surfaceSubtleAlpha50,
      ":hover": colors.surfaceAlpha70,
    },
    padding: spacing.space20,
    boxShadow: {
      default: shadows.elevationXs,
      ":hover": shadows.elevationMd,
    },
    transform: {
      default: "translateY(0)",
      ":hover": "translateY(-4px)",
      [motion.reduce]: "none",
    },
    transitionProperty: {
      default: "all",
      [motion.reduce]: "none",
    },
    transitionDuration: motion.slow,
  },
  emoji: {
    marginBottom: spacing.space16,
    display: "flex",
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.lg,
    backgroundColor: {
      default: colors.accentSurfaceAlpha10,
      [stylex.when.ancestor(":hover")]: colors.accentSurfaceAlpha15,
    },
    fontSize: fontSizes.title,
    boxShadow: shadows.accentInset,
    transitionProperty: "background-color",
  },
  cardTitle: {
    fontSize: fontSizes.label,
    lineHeight: lineHeights.line16,
    fontWeight: fontWeights.semibold,
    textTransform: "uppercase",
    letterSpacing: letterSpacing.label,
    color: colors.textMuted,
  },
  cardSummary: {
    marginTop: spacing.space8,
    fontSize: fontSizes.body,
    lineHeight: lineHeights.line24,
    color: colors.textStrong,
  },
});
