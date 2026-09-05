import { useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { MediaBadge } from "@/components/ui/media-badge";
import { MediaPreview } from "./MediaPreview";
import type { Project } from "./types";
import { colors } from "../../styles/Colors.stylex";
import { spacing } from "../../styles/Spacing.stylex";
import { radii } from "../../styles/BorderRadius.stylex";
import { fontSizes, fontWeights } from "../../styles/Typography.stylex";
import { motion } from "../../styles/Motion.stylex";
import { breakpoints } from "../../styles/Breakpoints.stylex";
import { shadows } from "../../styles/Shadows.stylex";
import { layout } from "../../styles/Layout.stylex";

export function ProjectsPanel({ projects }: { projects: Project[] }) {
  const mediaProjects = projects.filter((project) => project.media);
  const [activeProject, setActiveProject] = useState<string | null>(
    mediaProjects[0]?.name ?? null,
  );
  const activeItem = mediaProjects.find(
    (project) => project.name === activeProject,
  );

  return (
    <div {...stylex.props(styles.root)}>
      <div {...stylex.props(styles.layout)}>
        <div {...stylex.props(styles.nav)}>
          <ul {...stylex.props(styles.list)} role="list">
            {projects.map((project) => {
              const hasMedia = Boolean(project.media);
              const isActive = activeProject === project.name;

              return (
                <li key={project.name}>
                  <button
                    type="button"
                    disabled={!hasMedia}
                    onClick={() => hasMedia && setActiveProject(project.name)}
                    {...stylex.props(
                      styles.button,
                      hasMedia ? styles.enabled : styles.disabled,
                      isActive && hasMedia
                        ? styles.active
                        : hasMedia && styles.inactive,
                    )}
                  >
                    {project.name}
                    {project.media ? (
                      <span {...stylex.props(styles.badge)}>
                        <MediaBadge
                          type={project.media.type}
                          expanded={isActive}
                        />
                      </span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div {...stylex.props(styles.preview)}>
          {activeItem ? (
            <MediaPreview key={activeItem.name} project={activeItem} />
          ) : (
            <p {...stylex.props(styles.empty)}>Select a project to preview</p>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = stylex.create({
  root: {
    marginTop: spacing.space16,
    borderTopWidth: 1,
    borderTopColor: colors.borderAlpha50,
    paddingTop: spacing.space16,
  },
  layout: {
    display: "flex",
    flexDirection: {
      default: "column",
      [breakpoints.lg]: "row",
    },
    gap: {
      default: spacing.space16,
      [breakpoints.lg]: spacing.space20,
    },
  },
  nav: {
    width: {
      [breakpoints.lg]: 240,
    },
    flexShrink: {
      [breakpoints.lg]: 0,
    },
  },
  list: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: {
      [breakpoints.lg]: "column",
    },
    gap: {
      default: spacing.space8,
      [breakpoints.lg]: 0,
    },
  },
  button: {
    minHeight: layout.touchTarget,
    borderRadius: {
      default: radii.pill,
      [breakpoints.lg]: radii.md,
    },
    paddingInline: spacing.space12,
    paddingBlock: {
      default: spacing.space6,
      [breakpoints.lg]: spacing.space10,
    },
    fontSize: {
      default: fontSizes.label,
      [breakpoints.lg]: fontSizes.body,
    },
    fontWeight: fontWeights.medium,
    color: {
      default: colors.textMuted,
      [breakpoints.lg]: colors.textStrong,
    },
    transitionProperty: "all",
    transitionDuration: motion.normal,
    outline: "none",
    display: {
      [breakpoints.lg]: "flex",
    },
    width: {
      [breakpoints.lg]: "100%",
    },
    alignItems: {
      [breakpoints.lg]: "center",
    },
    justifyContent: {
      [breakpoints.lg]: "space-between",
    },
    textAlign: {
      [breakpoints.lg]: "left",
    },
  },
  enabled: {
    boxShadow: {
      ":focus-visible": shadows.focus,
    },
  },
  disabled: {
    cursor: "default",
    backgroundColor: {
      default: colors.surfaceAlpha50,
      [breakpoints.lg]: colors.transparent,
    },
    opacity: 0.6,
  },
  active: {
    backgroundColor: {
      default: colors.videoBadgeSurface,
      [breakpoints.lg]: colors.borderAlpha30,
    },
    color: {
      default: colors.accentText,
      [breakpoints.lg]: colors.textStrong,
    },
    boxShadow: {
      default: shadows.accentSubtleOutline,
      [breakpoints.lg]: shadows.none,
    },
  },
  inactive: {
    backgroundColor: {
      default: colors.surface,
      ":hover": colors.surfaceHover,
      [breakpoints.lg]: colors.transparent,
    },
  },
  badge: {
    display: {
      default: "none",
      [breakpoints.lg]: "block",
    },
  },
  preview: {
    display: "flex",
    justifyContent: "center",
    paddingBlock: {
      default: spacing.space8,
      [breakpoints.lg]: spacing.space24,
    },
    flex: {
      [breakpoints.lg]: 1,
    },
    alignItems: {
      [breakpoints.lg]: "center",
    },
    borderRadius: {
      [breakpoints.lg]: radii.lg,
    },
    backgroundColor: {
      [breakpoints.lg]: colors.surfaceSubtleAlpha60,
    },
    paddingInline: {
      [breakpoints.lg]: spacing.space24,
    },
  },
  empty: {
    fontSize: fontSizes.body,
    color: colors.textMuted,
  },
});
