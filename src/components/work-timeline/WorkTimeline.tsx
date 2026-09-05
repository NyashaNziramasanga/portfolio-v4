import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import * as stylex from "@stylexjs/stylex";
import experiencesData from "@/data/experiences.json";
import educationData from "@/data/education.json";
import { ExperienceCard } from "./ExperienceCard";
import type { Education, Experience } from "./types";
import { colors } from "../../styles/Colors.stylex";
import { spacing } from "../../styles/Spacing.stylex";
import { radii } from "../../styles/BorderRadius.stylex";
import {
  fontSizes,
  fontWeights,
  lineHeights,
} from "../../styles/Typography.stylex";
import { breakpoints } from "../../styles/Breakpoints.stylex";
import { shadows } from "../../styles/Shadows.stylex";
import { layout } from "../../styles/Layout.stylex";

export function WorkTimeline() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div {...stylex.props(styles.root)}>
      <h2 {...stylex.props(styles.heading)}>Experience</h2>
      <div {...stylex.props(styles.list)}>
        {(experiencesData as Experience[]).map((experience) => (
          <ExperienceCard
            key={experience.id}
            experience={experience}
            isExpanded={expandedId === experience.id}
            onToggle={() =>
              setExpandedId((current) =>
                current === experience.id ? null : experience.id,
              )
            }
          />
        ))}
      </div>

      <div {...stylex.props(styles.education)}>
        <h3 {...stylex.props(styles.heading)}>Education</h3>
        <div {...stylex.props(styles.educationGrid)}>
          {(educationData as Education[]).map((education) => (
            <article key={education.id} {...stylex.props(styles.educationCard)}>
              <div {...stylex.props(styles.logoBox)}>
                <img
                  src={education.logo}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  width={48}
                  height={48}
                  {...stylex.props(styles.logo)}
                />
              </div>
              <div {...stylex.props(styles.educationCopy)}>
                <h4 {...stylex.props(styles.educationTitle)}>
                  {education.title}
                </h4>
                <a
                  href={education.institutionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...stylex.props(styles.institution, stylex.defaultMarker())}
                >
                  {education.institution}
                  <ArrowUpRight
                    {...stylex.props(styles.externalIcon)}
                    aria-hidden="true"
                  />
                </a>
                <p {...stylex.props(styles.date)}>
                  {education.dateStart} – {education.dateEnd}
                </p>
              </div>
            </article>
          ))}
        </div>
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
  heading: {
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
  education: {
    marginTop: spacing.space40,
    borderTopWidth: 1,
    borderTopColor: colors.borderAlpha60,
    paddingTop: spacing.space32,
  },
  educationGrid: {
    display: "grid",
    gap: spacing.space12,
    gridTemplateColumns: {
      [breakpoints.lg]: "repeat(2, minmax(0, 1fr))",
    },
  },
  educationCard: {
    display: "flex",
    alignItems: "flex-start",
    gap: {
      default: spacing.space12,
      [breakpoints.sm]: spacing.space16,
    },
    borderRadius: {
      default: radii.lg,
      [breakpoints.sm]: radii.xl,
    },
    backgroundColor: colors.surface,
    paddingInline: {
      default: spacing.space16,
      [breakpoints.sm]: spacing.space24,
    },
    paddingBlock: {
      default: spacing.space16,
      [breakpoints.sm]: spacing.space20,
    },
    boxShadow: shadows.elevationXs,
  },
  logoBox: {
    display: "flex",
    height: {
      default: 40,
      [breakpoints.sm]: 56,
    },
    width: {
      default: 40,
      [breakpoints.sm]: 56,
    },
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: radii.circle,
  },
  logo: {
    height: {
      default: 24,
      [breakpoints.sm]: 36,
    },
    width: {
      default: 24,
      [breakpoints.sm]: 36,
    },
    borderRadius: radii.circle,
    objectFit: "cover",
  },
  educationCopy: {
    minWidth: 0,
    flex: "1",
  },
  educationTitle: {
    fontSize: {
      default: fontSizes.bodyLarge,
      [breakpoints.sm]: fontSizes.titleSmall,
    },
    lineHeight: {
      default: lineHeights.line24,
      [breakpoints.sm]: lineHeights.line28,
    },
    fontWeight: fontWeights.bold,
    color: colors.textPrimary,
  },
  institution: {
    marginTop: spacing.space2,
    display: "inline-flex",
    alignItems: "center",
    gap: spacing.space2,
    fontSize: {
      default: fontSizes.label,
      [breakpoints.sm]: fontSizes.body,
    },
    lineHeight: {
      default: lineHeights.line16,
      [breakpoints.sm]: lineHeights.line20,
    },
    color: {
      default: colors.textMuted,
      ":hover": colors.textStrong,
    },
    transitionProperty: "color",
  },
  externalIcon: {
    width: 12,
    height: 12,
    opacity: {
      default: 0,
      [stylex.when.ancestor(":hover")]: 1,
    },
    transitionProperty: "opacity",
  },
  date: {
    marginTop: spacing.space8,
    fontSize: {
      default: fontSizes.captionSmall,
      [breakpoints.sm]: fontSizes.body,
    },
    lineHeight: {
      default: lineHeights.normal,
      [breakpoints.sm]: lineHeights.line20,
    },
    color: colors.textMuted,
  },
});
