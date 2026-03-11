import { useState, useCallback } from "react";
import { cn, handleToggleKeyDown } from "@/lib/utils";
import { ChevronRight, Layers, ExternalLink } from "lucide-react";
import { useExpandCollapse } from "@/hooks/useExpandCollapse";
import { CollapsiblePanel } from "@/components/ui/collapsible-panel";
import { MediaBadge } from "@/components/ui/media-badge";
import experiencesData from "@/data/experiences.json";

type Project = {
  name: string;
  media?: { type: "video" | "gif" | "image" | "article"; src: string; link?: string };
};

type Experience = (typeof experiencesData)[number] & {
  projects?: Project[];
};

function MediaPreview({ project }: { project: Project }) {
  if (!project.media) return null;

  if (project.media.type === "article") {
    return (
      <a
        href={project.media.link!}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="group/article block max-w-sm"
      >
        <div className="animate-float overflow-hidden rounded-xl border border-brand-500 bg-brand-700 shadow-lg shadow-black/25 transition-shadow group-hover/article:shadow-xl group-hover/article:shadow-black/30">
          <img
            src={project.media.src}
            alt={project.name}
            loading="lazy"
            className="aspect-video w-full object-cover"
          />
          <div className="flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium text-blue-300">
            <ExternalLink className="h-3 w-3" />
            Read article
          </div>
        </div>
      </a>
    );
  }

  if (project.media.type === "video") {
    return (
      <video
        key={project.media.src}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        className="aspect-[9/19.5] max-h-[400px] rounded-2xl object-cover shadow-lg shadow-black/30"
      >
        <source src={project.media.src} type="video/webm" />
        <source src={project.media.src.replace(".webm", ".mp4")} type="video/mp4" />
      </video>
    );
  }

  return (
    <img
      src={project.media.src}
      alt={project.name}
      loading="lazy"
      className="animate-float aspect-[9/19.5] max-h-[400px] rounded-2xl object-cover shadow-lg shadow-black/30"
    />
  );
}

function ProjectsPanel({ projects }: { projects: Project[] }) {
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
            <p className="text-sm text-brand-400">Select a project to preview</p>
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
                      : "bg-brand-700/50 text-brand-400",
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

export function WorkTimeline() {
  const { expandedId, toggle, handleEnter, handleLeave, handleFocus, handleBlur } =
    useExpandCollapse();

  return (
    <div className="flex w-full max-w-5xl flex-col">
      <h2 className="mb-8 text-xl font-bold text-brand-50 sm:mb-10 sm:text-2xl">Experience</h2>
      <div className="flex flex-col gap-4">
        {(experiencesData as Experience[]).map((exp) => {
          const hasProjects = !!exp.projects?.length;
          const isExpanded = expandedId === exp.id;

          return (
            <div
              key={exp.id}
              role={hasProjects ? "button" : undefined}
              tabIndex={hasProjects ? 0 : undefined}
              aria-expanded={hasProjects ? isExpanded : undefined}
              aria-label={hasProjects ? `${exp.title} at ${exp.company}, ${exp.projects!.length} projects` : undefined}
              onClick={() => hasProjects && toggle(exp.id)}
              onKeyDown={hasProjects ? (e) => handleToggleKeyDown(e, () => toggle(exp.id)) : undefined}
              onMouseEnter={() => handleEnter(exp.id)}
              onMouseLeave={handleLeave}
              onFocus={() => handleFocus(exp.id)}
              onBlur={handleBlur}
              className={cn(
                "w-full rounded-xl bg-brand-700 px-4 py-4 shadow-sm outline-none transition-all duration-300 ease-out sm:rounded-2xl sm:px-6 sm:py-5",
                hasProjects && "cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900",
                isExpanded && "bg-brand-600 shadow-lg ring-1 ring-primary/30",
              )}
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-3">
                <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-transparent sm:h-14 sm:w-14">
                    <img
                      src={exp.logo}
                      alt={exp.company}
                      loading="lazy"
                      className="h-6 w-6 rounded-full object-cover sm:h-9 sm:w-9"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-brand-50 sm:text-lg">
                      {exp.title}
                    </h3>
                    <p className="mt-0.5 text-xs font-normal text-brand-300 sm:text-sm">
                      {exp.company}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:flex-col sm:items-end sm:gap-1.5">
                  <p className="text-xs font-normal text-brand-300 sm:text-sm">
                    {exp.dateStart} - {exp.dateEnd}
                  </p>
                  {hasProjects && (
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium transition-colors duration-300",
                        isExpanded
                          ? "bg-blue-800/40 text-blue-300"
                          : "bg-brand-500/40 text-brand-300",
                      )}
                    >
                      <Layers className="h-3 w-3" />
                      {exp.projects!.length} projects
                      <ChevronRight
                        className={cn(
                          "h-3 w-3 transition-transform duration-300",
                          isExpanded && "rotate-90",
                        )}
                      />
                    </span>
                  )}
                </div>
              </div>

              <CollapsiblePanel open={isExpanded}>
                {hasProjects && isExpanded && (
                  <ProjectsPanel projects={exp.projects!} />
                )}
              </CollapsiblePanel>
            </div>
          );
        })}
      </div>
    </div>
  );
}
