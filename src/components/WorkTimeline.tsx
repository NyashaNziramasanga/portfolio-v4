import { useState, useCallback } from "react";
import { cn, handleToggleKeyDown } from "@/lib/utils";
import { ChevronRight, Layers } from "lucide-react";
import { useExpandCollapse } from "@/hooks/useExpandCollapse";
import { CollapsiblePanel } from "@/components/ui/collapsible-panel";
import { MediaBadge } from "@/components/ui/media-badge";
import { ArticlePreview } from "@/components/ui/article-preview";
import experiencesData from "@/data/experiences.json";

type Project = {
  name: string;
  media?: { type: "video" | "gif" | "image" | "article"; src: string; link?: string };
};

type Experience = (typeof experiencesData)[number] & {
  projects?: Project[];
};

function MobileFrame({ project }: { project: Project }) {
  return (
    <div className="flex justify-center py-4">
      {project.media?.type === "video" ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="aspect-[9/19.5] w-[140px] rounded-xl object-cover sm:w-[180px]"
        >
          <source src={project.media.src} type="video/webm" />
          <source src={project.media.src.replace(".webm", ".mp4")} type="video/mp4" />
        </video>
      ) : (
        <img
          src={project.media?.src}
          alt={project.name}
          loading="lazy"
          className="aspect-[9/19.5] w-[140px] rounded-xl object-cover sm:w-[180px]"
        />
      )}
    </div>
  );
}

function ProjectList({ projects }: { projects: Project[] }) {
  const [activeProject, setActiveProject] = useState<string | null>(null);

  const toggleProject = useCallback((name: string, hasMedia: boolean) => {
    if (!hasMedia) return;
    setActiveProject((prev) => (prev === name ? null : name));
  }, []);

  return (
    <div className="mt-4 border-t border-brand-500/50 pt-4">
      <ul className="flex flex-col" role="list">
        {projects.map((project) => {
          const hasMedia = !!project.media;
          const isActive = activeProject === project.name;

          return (
            <li
              key={project.name}
              onMouseEnter={() => hasMedia && setActiveProject(project.name)}
              onMouseLeave={() => hasMedia && setActiveProject(null)}
            >
              <div
                role={hasMedia ? "button" : undefined}
                tabIndex={hasMedia ? 0 : undefined}
                aria-expanded={hasMedia ? isActive : undefined}
                onClick={() => toggleProject(project.name, hasMedia)}
                onKeyDown={hasMedia ? (e) => handleToggleKeyDown(e, () => toggleProject(project.name, true)) : undefined}
                className={cn(
                  "flex items-center justify-between rounded-lg px-3 py-2.5 transition-all duration-200 outline-none",
                  hasMedia && "cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1",
                  isActive && "bg-brand-500/30",
                )}
              >
                <span className="text-sm font-medium text-brand-100">
                  {project.name}
                </span>
                {project.media && (
                  <MediaBadge type={project.media.type} expanded={isActive} />
                )}
              </div>

              {hasMedia && (
                <CollapsiblePanel open={isActive}>
                  {isActive && (
                    project.media?.type === "article" ? (
                      <ArticlePreview
                        href={project.media.link!}
                        imageSrc={project.media.src}
                        imageAlt={project.name}
                      />
                    ) : (
                      <MobileFrame project={project} />
                    )
                  )}
                </CollapsiblePanel>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function WorkTimeline() {
  const { expandedId, toggle, handleEnter, handleLeave, handleFocus, handleBlur } =
    useExpandCollapse();

  return (
    <div className="flex w-full max-w-3xl flex-col">
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
                hasProjects && "cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900",
                isExpanded && "bg-brand-600 shadow-lg ring-1 ring-blue-500/30",
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
                {hasProjects && <ProjectList projects={exp.projects!} />}
              </CollapsiblePanel>
            </div>
          );
        })}
      </div>
    </div>
  );
}
