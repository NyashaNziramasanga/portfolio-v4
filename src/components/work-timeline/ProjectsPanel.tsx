import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { MediaBadge } from "@/components/ui/media-badge";
import { MediaPreview } from "./MediaPreview";
import type { Project } from "./types";

export function ProjectsPanel({ projects }: { projects: Project[] }) {
  const mediaProjects = projects.filter((p) => !!p.media);
  const [activeProject, setActiveProject] = useState<string | null>(
    mediaProjects[0]?.name ?? null,
  );

  const selectProject = useCallback(
    (name: string, e: React.MouseEvent | React.KeyboardEvent) => {
      e.stopPropagation();
      setActiveProject(name);
    },
    [],
  );

  const activeItem = mediaProjects.find((p) => p.name === activeProject);

  return (
    <div
      role="presentation"
      className="mt-4 border-t border-brand-500/50 pt-4"
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      {/* Desktop: side-by-side list + preview */}
      <div className="hidden gap-5 lg:flex">
        <div className="w-[240px] shrink-0">
          <ul className="flex flex-col" role="list">
            {projects.map((project) => {
              const hasMedia = !!project.media;
              const isActive = activeProject === project.name;

              return (
                <li key={project.name}>
                  <button
                    type="button"
                    disabled={!hasMedia}
                    onClick={(e) => hasMedia && selectProject(project.name, e)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition-all duration-200 outline-none",
                      hasMedia
                        ? "cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
                        : "cursor-default opacity-60",
                      isActive && hasMedia && "bg-brand-500/30",
                      !isActive && hasMedia && "hover:bg-brand-500/15",
                    )}
                  >
                    <span className="text-sm font-medium text-brand-100">
                      {project.name}
                    </span>
                    {project.media && (
                      <MediaBadge type={project.media.type} expanded={isActive} />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex flex-1 items-center justify-center rounded-xl bg-brand-800/60 p-6">
          {activeItem ? (
            <MediaPreview project={activeItem} />
          ) : (
            <p className="text-sm text-brand-300">Select a project to preview</p>
          )}
        </div>
      </div>

      {/* Mobile: chip selector + stacked preview */}
      <div className="flex flex-col gap-4 lg:hidden">
        <div className="flex flex-wrap gap-2">
          {projects.map((project) => {
            const hasMedia = !!project.media;
            const isActive = activeProject === project.name;
            return (
              <button
                key={project.name}
                type="button"
                disabled={!hasMedia}
                onClick={(e) => hasMedia && selectProject(project.name, e)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 outline-none",
                  hasMedia
                    ? "focus-visible:ring-2 focus-visible:ring-primary"
                    : "cursor-default opacity-60",
                  isActive && hasMedia
                    ? "bg-blue-800/40 text-blue-300 ring-1 ring-primary/30"
                    : hasMedia
                      ? "bg-brand-700 text-brand-300 hover:bg-brand-600"
                      : "bg-brand-700/50 text-brand-300",
                )}
              >
                {project.name}
              </button>
            );
          })}
        </div>
        {activeItem && (
          <div className="flex justify-center py-2">
            <MediaPreview project={activeItem} />
          </div>
        )}
      </div>
    </div>
  );
}
