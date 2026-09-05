import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import * as stylex from "@stylexjs/stylex";
import experiencesData from "@/data/experiences.json";
import educationData from "@/data/education.json";
import { ExperienceCard } from "./ExperienceCard";
import type { Education, Experience } from "./types";
import { colors, constants } from "../../styles/tokens.stylex";

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
    maxWidth: 1024,
    flexDirection: "column",
  },
  heading: {
    marginBottom: {
      default: 32,
      [constants.sm]: 40,
    },
    fontSize: {
      default: 20,
      [constants.sm]: 24,
    },
    lineHeight: {
      default: "28px",
      [constants.sm]: "32px",
    },
    fontWeight: 700,
    color: colors.brand50,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  education: {
    marginTop: 40,
    borderTopWidth: 1,
    borderTopColor: "color-mix(in oklab, #4A5568 60%, transparent)",
    paddingTop: 32,
  },
  educationGrid: {
    display: "grid",
    gap: 12,
    gridTemplateColumns: {
      [constants.lg]: "repeat(2, minmax(0, 1fr))",
    },
  },
  educationCard: {
    display: "flex",
    alignItems: "flex-start",
    gap: {
      default: 12,
      [constants.sm]: 16,
    },
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
  educationCopy: {
    minWidth: 0,
    flex: "1",
  },
  educationTitle: {
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
  institution: {
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
  date: {
    marginTop: 8,
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
});
