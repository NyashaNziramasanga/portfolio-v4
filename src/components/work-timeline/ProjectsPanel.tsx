import { useState } from "react";
import { cn } from "@/lib/utils";
import { MediaBadge } from "@/components/ui/media-badge";
import { MediaPreview } from "./MediaPreview";
import type { Project } from "./types";

export function ProjectsPanel({ projects }: { projects: Project[] }) {
  const mediaProjects = projects.filter((project) => project.media);
  const [activeProject, setActiveProject] = useState<string | null>(
    mediaProjects[0]?.name ?? null,
  );
  const activeItem = mediaProjects.find((project) => project.name === activeProject);

  return (
    <div className="mt-4 border-t border-brand-500/50 pt-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:gap-5">
        <div className="lg:w-[240px] lg:shrink-0">
          <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-0" role="list">
            {projects.map((project) => {
              const hasMedia = Boolean(project.media);
              const isActive = activeProject === project.name;

              return (
                <li key={project.name}>
                  <button
                    type="button"
                    disabled={!hasMedia}
                    onClick={() => hasMedia && setActiveProject(project.name)}
                    className={cn(
                      "min-h-11 rounded-full px-3 py-1.5 text-xs font-medium text-brand-300 transition-all duration-200 outline-none lg:flex lg:w-full lg:items-center lg:justify-between lg:rounded-lg lg:px-3 lg:py-2.5 lg:text-left lg:text-sm lg:text-brand-100",
                      hasMedia
                        ? "focus-visible:ring-2 focus-visible:ring-primary lg:focus-visible:ring-offset-1"
                        : "cursor-default bg-brand-700/50 opacity-60 lg:bg-transparent",
                      isActive && hasMedia
                        ? "bg-blue-800/40 text-blue-300 ring-1 ring-primary/30 lg:bg-brand-500/30 lg:text-brand-100 lg:ring-0"
                        : hasMedia && "bg-brand-700 hover:bg-brand-600 lg:bg-transparent lg:hover:bg-brand-500/15",
                    )}
                  >
                    {project.name}
                    {project.media ? (
                      <span className="hidden lg:block">
                        <MediaBadge type={project.media.type} expanded={isActive} />
                      </span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex justify-center py-2 lg:flex-1 lg:items-center lg:rounded-xl lg:bg-brand-800/60 lg:p-6">
          {activeItem ? (
            <MediaPreview key={activeItem.name} project={activeItem} />
          ) : (
            <p className="text-sm text-brand-300">Select a project to preview</p>
          )}
        </div>
      </div>
    </div>
  );
}
