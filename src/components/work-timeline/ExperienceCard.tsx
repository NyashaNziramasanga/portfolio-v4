import { ArrowUpRight, ChevronDown, Layers } from "lucide-react";
import * as stylex from "@stylexjs/stylex";
import { CollapsiblePanel } from "@/components/ui/collapsible-panel";
import { ProjectsPanel } from "./ProjectsPanel";
import type { Experience } from "./types";
import { colors, constants } from "../../styles/tokens.stylex";

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
      default: 12,
      [constants.sm]: 16,
    },
    backgroundColor: colors.brand700,
    paddingInline: {
      default: 16,
      [constants.sm]: 24,
    },
    paddingBlock: {
      default: 16,
      [constants.sm]: 20,
    },
    boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    transitionProperty: {
      default: "all",
      [constants.reduceMotion]: "none",
    },
    transitionDuration: "300ms",
    transitionTimingFunction: constants.easeOut,
  },
  expanded: {
    backgroundColor: colors.brand600,
    boxShadow:
      "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 0 0 1px color-mix(in oklab, hsl(207 68% 50%) 30%, transparent)",
  },
  topRow: {
    display: "flex",
    flexDirection: {
      default: "column",
      [constants.sm]: "row",
    },
    gap: 12,
    alignItems: {
      [constants.sm]: "flex-start",
    },
    justifyContent: {
      [constants.sm]: "space-between",
    },
  },
  identity: {
    display: "flex",
    minWidth: 0,
    alignItems: "flex-start",
    gap: {
      default: 12,
      [constants.sm]: 16,
    },
  },
  logoBox: {
    display: "flex",
    height: {
      default: 40,
      [constants.sm]: 56,
    },
    width: {
      default: 40,
      [constants.sm]: 56,
    },
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: "50%",
  },
  logo: {
    height: {
      default: 24,
      [constants.sm]: 36,
    },
    width: {
      default: 24,
      [constants.sm]: 36,
    },
    borderRadius: "50%",
    objectFit: "cover",
  },
  identityCopy: {
    minWidth: 0,
  },
  title: {
    fontSize: {
      default: 16,
      [constants.sm]: 18,
    },
    lineHeight: {
      default: "24px",
      [constants.sm]: "28px",
    },
    fontWeight: 700,
    color: colors.brand50,
  },
  company: {
    marginTop: 2,
    display: "inline-flex",
    alignItems: "center",
    gap: 2,
    fontSize: {
      default: 12,
      [constants.sm]: 14,
    },
    lineHeight: {
      default: "16px",
      [constants.sm]: "20px",
    },
    color: {
      default: colors.brand300,
      ":hover": colors.brand100,
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
      [constants.sm]: "flex-end",
    },
    flexDirection: {
      [constants.sm]: "column",
    },
    gap: 8,
  },
  date: {
    fontSize: {
      default: 11,
      [constants.sm]: 14,
    },
    lineHeight: {
      default: 1.5,
      [constants.sm]: "20px",
    },
    color: colors.brand300,
  },
  duration: {
    color: colors.brand400,
  },
  projectsButton: {
    display: "inline-flex",
    minHeight: {
      default: 44,
      [constants.sm]: 0,
    },
    alignItems: "center",
    gap: 6,
    borderRadius: 9999,
    backgroundColor: {
      default: "color-mix(in oklab, #4A5568 40%, transparent)",
      ":hover": "color-mix(in oklab, #4A5568 70%, transparent)",
    },
    paddingInline: {
      default: 12,
      [constants.sm]: 10,
    },
    paddingBlock: 4,
    fontSize: 12,
    lineHeight: "16px",
    fontWeight: 500,
    color: colors.brand200,
    outline: "none",
    boxShadow: {
      ":focus-visible": "0 0 0 2px hsl(207 68% 50%)",
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
