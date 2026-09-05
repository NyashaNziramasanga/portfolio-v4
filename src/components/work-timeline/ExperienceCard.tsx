import { ArrowUpRight, ChevronDown, Layers } from "lucide-react";
import * as stylex from "@stylexjs/stylex";
import { CollapsiblePanel } from "@/components/ui/collapsible-panel";
import { ProjectsPanel } from "./ProjectsPanel";
import type { Experience } from "./types";
import { colors } from "../../styles/Colors.stylex";
import { spacing } from "../../styles/Spacing.stylex";
import { radii } from "../../styles/BorderRadius.stylex";
import {
  fontSizes,
  fontWeights,
  lineHeights,
} from "../../styles/Typography.stylex";
import { motion } from "../../styles/Motion.stylex";
import { breakpoints } from "../../styles/Breakpoints.stylex";
import { shadows } from "../../styles/Shadows.stylex";
import { layout } from "../../styles/Layout.stylex";

function formatDuration(startDate: string, endDate?: string) {
  const [startYear, startMonth] = startDate.split("-").map(Number);
  const now = new Date();
  const [endYear, endMonth] = endDate
    ? endDate.split("-").map(Number)
    : [now.getFullYear(), now.getMonth() + 1];
  const totalMonths = Math.max(
    1,
    (endYear - startYear) * 12 + endMonth - startMonth + 1,
  );
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  return [
    years ? `${years} ${years === 1 ? "yr" : "yrs"}` : null,
    months ? `${months} ${months === 1 ? "mo" : "mos"}` : null,
  ]
    .filter(Boolean)
    .join(" ");
}

export function ExperienceCard({
  experience,
  isExpanded,
  onToggle,
}: {
  experience: Experience;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const projects = experience.projects ?? [];
  const hasProjects = projects.length > 0;
  const panelId = `experience-panel-${experience.id}`;
  const duration = formatDuration(experience.startDate, experience.endDate);

  return (
    <article {...stylex.props(styles.card, isExpanded && styles.expanded)}>
      <div {...stylex.props(styles.topRow)}>
        <div {...stylex.props(styles.identity)}>
          <div {...stylex.props(styles.logoBox)}>
            <img
              src={experience.logo}
              alt=""
              loading="lazy"
              decoding="async"
              width={48}
              height={48}
              {...stylex.props(styles.logo)}
            />
          </div>
          <div {...stylex.props(styles.identityCopy)}>
            <h3 {...stylex.props(styles.title)}>{experience.title}</h3>
            {experience.companyUrl ? (
              <a
                href={experience.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                {...stylex.props(styles.company, stylex.defaultMarker())}
              >
                {experience.company}
                <ArrowUpRight
                  {...stylex.props(styles.externalIcon)}
                  aria-hidden="true"
                />
              </a>
            ) : (
              <p {...stylex.props(styles.company)}>{experience.company}</p>
            )}
          </div>
        </div>

        <div {...stylex.props(styles.meta)}>
          <p {...stylex.props(styles.date)}>
            {experience.dateStart} – {experience.dateEnd}{" "}
            <span {...stylex.props(styles.duration)}>· {duration}</span>
          </p>
          {hasProjects ? (
            <button
              type="button"
              aria-expanded={isExpanded}
              aria-controls={panelId}
              onClick={onToggle}
              {...stylex.props(styles.projectsButton)}
            >
              <Layers {...stylex.props(styles.smallIcon)} aria-hidden="true" />
              {projects.length} projects
              <ChevronDown
                {...stylex.props(
                  styles.smallIcon,
                  styles.chevron,
                  isExpanded && styles.chevronOpen,
                )}
                aria-hidden="true"
              />
            </button>
          ) : null}
        </div>
      </div>

      {hasProjects ? (
        <CollapsiblePanel open={isExpanded} id={panelId} lazyMount>
          <ProjectsPanel projects={projects} />
        </CollapsiblePanel>
      ) : null}
    </article>
  );
}

const styles = stylex.create({
  card: {
    width: "100%",
    borderRadius: {
      default: radii.lg,
      [breakpoints.sm]: radii.xl,
    },
    backgroundColor: colors.surface,
    paddingInline: {
      default: spacing.md,
      [breakpoints.sm]: spacing.xl,
    },
    paddingBlock: {
      default: spacing.md,
      [breakpoints.sm]: spacing.lg,
    },
    boxShadow: shadows.elevationXs,
    transitionProperty: {
      default: "all",
      [motion.reduce]: "none",
    },
    transitionDuration: motion.slow,
    transitionTimingFunction: motion.easeOut,
  },
  expanded: {
    backgroundColor: colors.surfaceHover,
    boxShadow: shadows.raisedAccent,
  },
  topRow: {
    display: "flex",
    flexDirection: {
      default: "column",
      [breakpoints.sm]: "row",
    },
    gap: spacing.sm,
    alignItems: {
      [breakpoints.sm]: "flex-start",
    },
    justifyContent: {
      [breakpoints.sm]: "space-between",
    },
  },
  identity: {
    display: "flex",
    minWidth: 0,
    alignItems: "flex-start",
    gap: {
      default: spacing.sm,
      [breakpoints.sm]: spacing.md,
    },
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
  identityCopy: {
    minWidth: 0,
  },
  title: {
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
  company: {
    marginTop: spacing.xxs,
    display: "inline-flex",
    alignItems: "center",
    gap: spacing.xxs,
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
  meta: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: {
      default: "center",
      [breakpoints.sm]: "flex-end",
    },
    flexDirection: {
      [breakpoints.sm]: "column",
    },
    gap: spacing.xs,
  },
  date: {
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
  duration: {
    color: colors.textSubtle,
  },
  projectsButton: {
    display: "inline-flex",
    minHeight: {
      default: layout.touchTarget,
      [breakpoints.sm]: 0,
    },
    alignItems: "center",
    gap: spacing.xs,
    borderRadius: radii.pill,
    backgroundColor: {
      default: colors.borderAlpha40,
      ":hover": colors.borderAlpha70,
    },
    paddingInline: {
      default: spacing.sm,
      [breakpoints.sm]: spacing.sm,
    },
    paddingBlock: spacing.xxs,
    fontSize: fontSizes.label,
    lineHeight: lineHeights.line16,
    fontWeight: fontWeights.medium,
    color: colors.textSecondary,
    outline: "none",
    boxShadow: {
      ":focus-visible": shadows.focus,
    },
    transitionProperty: "background-color",
  },
  smallIcon: {
    width: 12,
    height: 12,
  },
  chevron: {
    transitionProperty: "transform",
  },
  chevronOpen: {
    transform: "rotate(180deg)",
  },
});
