import { useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { MediaBadge } from "@/components/ui/media-badge";
import { MediaPreview } from "./MediaPreview";
import type { Project } from "./types";
import { colors, constants } from "../../styles/tokens.stylex";

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
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: "color-mix(in oklab, #4A5568 50%, transparent)",
    paddingTop: 16,
  },
  layout: {
    display: "flex",
    flexDirection: {
      default: "column",
      [constants.lg]: "row",
    },
    gap: {
      default: 16,
      [constants.lg]: 20,
    },
  },
  nav: {
    width: {
      [constants.lg]: 240,
    },
    flexShrink: {
      [constants.lg]: 0,
    },
  },
  list: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: {
      [constants.lg]: "column",
    },
    gap: {
      default: 8,
      [constants.lg]: 0,
    },
  },
  button: {
    minHeight: 44,
    borderRadius: {
      default: 9999,
      [constants.lg]: 8,
    },
    paddingInline: 12,
    paddingBlock: {
      default: 6,
      [constants.lg]: 10,
    },
    fontSize: {
      default: 12,
      [constants.lg]: 14,
    },
    fontWeight: 500,
    color: {
      default: colors.brand300,
      [constants.lg]: colors.brand100,
    },
    transitionProperty: "all",
    transitionDuration: constants.durationNormal,
    outline: "none",
    display: {
      [constants.lg]: "flex",
    },
    width: {
      [constants.lg]: "100%",
    },
    alignItems: {
      [constants.lg]: "center",
    },
    justifyContent: {
      [constants.lg]: "space-between",
    },
    textAlign: {
      [constants.lg]: "left",
    },
  },
  enabled: {
    boxShadow: {
      ":focus-visible": "0 0 0 2px hsl(207 68% 50%)",
    },
  },
  disabled: {
    cursor: "default",
    backgroundColor: {
      default: "color-mix(in oklab, #252F3F 50%, transparent)",
      [constants.lg]: "transparent",
    },
    opacity: 0.6,
  },
  active: {
    backgroundColor: {
      default: "color-mix(in oklab, #2A4365 40%, transparent)",
      [constants.lg]: "color-mix(in oklab, #4A5568 30%, transparent)",
    },
    color: {
      default: colors.blue300,
      [constants.lg]: colors.brand100,
    },
    boxShadow: {
      default:
        "0 0 0 1px color-mix(in oklab, hsl(207 68% 50%) 30%, transparent)",
      [constants.lg]: "none",
    },
  },
  inactive: {
    backgroundColor: {
      default: colors.brand700,
      ":hover": colors.brand600,
      [constants.lg]: "transparent",
    },
  },
  badge: {
    display: {
      default: "none",
      [constants.lg]: "block",
    },
  },
  preview: {
    display: "flex",
    justifyContent: "center",
    paddingBlock: {
      default: 8,
      [constants.lg]: 24,
    },
    flex: {
      [constants.lg]: 1,
    },
    alignItems: {
      [constants.lg]: "center",
    },
    borderRadius: {
      [constants.lg]: 12,
    },
    backgroundColor: {
      [constants.lg]: "color-mix(in oklab, #1F2937 60%, transparent)",
    },
    paddingInline: {
      [constants.lg]: 24,
    },
  },
  empty: {
    fontSize: 14,
    color: colors.brand300,
  },
});
