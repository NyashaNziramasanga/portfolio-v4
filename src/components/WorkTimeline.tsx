import { useState, useRef, useCallback, useEffect, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";
import { Play, Image, ChevronRight, Layers, FileText, ExternalLink } from "lucide-react";
import experiencesData from "@/data/experiences.json";

type Project = {
  name: string;
  media?: { type: "video" | "gif" | "image" | "article"; src: string; link?: string };
};

type Experience = (typeof experiencesData)[number] & {
  projects?: Project[];
};

function handleToggleKeyDown(
  e: KeyboardEvent,
  toggle: () => void,
) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    toggle();
  }
}

function MobileFrame({ project }: { project: Project }) {
  return (
    <div className="flex justify-center py-3">
      <div className="relative w-[140px] rounded-[20px] border-[3px] border-slate-700 bg-black p-1 shadow-xl sm:w-[180px] sm:rounded-[24px] sm:p-1.5">
        <div className="overflow-hidden rounded-[14px] bg-black sm:rounded-[18px]">
          {project.media?.type === "video" ? (
            <video
              src={project.media.src}
              autoPlay
              loop
              muted
              playsInline
              className="aspect-[9/19.5] w-full object-cover"
            />
          ) : (
            <img
              src={project.media?.src}
              alt={project.name}
              className="aspect-[9/19.5] w-full object-cover"
            />
          )}
        </div>
        <div className="mx-auto mt-1 h-1 w-8 rounded-full bg-slate-600 sm:w-10" />
      </div>
    </div>
  );
}

function ArticlePreview({ project }: { project: Project }) {
  return (
    <a
      href={project.media?.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group/article block py-3"
    >
      <div className="overflow-hidden rounded-xl border border-slate-300 bg-white shadow-sm transition-shadow group-hover/article:shadow-md">
        <img
          src={project.media?.src}
          alt={project.name}
          className="aspect-video w-full object-cover"
        />
        <div className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-sky-700">
          <ExternalLink className="h-3 w-3" />
          Read article
        </div>
      </div>
    </a>
  );
}

function ProjectList({ projects }: { projects: Project[] }) {
  const [activeProject, setActiveProject] = useState<string | null>(null);

  const toggleProject = useCallback((name: string, hasMedia: boolean) => {
    if (!hasMedia) return;
    setActiveProject((prev) => (prev === name ? null : name));
  }, []);

  return (
    <div className="mt-3 border-t border-slate-400/30 pt-3">
      <ul className="flex flex-col" role="list">
        {projects.map((project) => {
          const hasMedia = !!project.media;
          const isActive = activeProject === project.name;

          return (
            <li key={project.name}>
              <div
                role={hasMedia ? "button" : undefined}
                tabIndex={hasMedia ? 0 : undefined}
                aria-expanded={hasMedia ? isActive : undefined}
                onClick={() => toggleProject(project.name, hasMedia)}
                onKeyDown={hasMedia ? (e) => handleToggleKeyDown(e, () => toggleProject(project.name, true)) : undefined}
                onMouseEnter={() => hasMedia && setActiveProject(project.name)}
                onMouseLeave={() => setActiveProject(null)}
                className={cn(
                  "flex items-center justify-between rounded-lg px-3 py-2 transition-all duration-200 outline-none",
                  hasMedia && "cursor-pointer focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-1",
                  isActive && "bg-slate-300/60",
                )}
              >
                <span className="text-sm font-medium text-slate-800">
                  {project.name}
                </span>
                {project.media && (
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full p-1.5 text-xs font-medium transition-all duration-200",
                      project.media.type === "video"
                        ? "bg-sky-100 text-sky-700"
                        : project.media.type === "article"
                          ? "bg-amber-100 text-amber-700"
                          : project.media.type === "image"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-violet-100 text-violet-700",
                    )}
                  >
                    {project.media.type === "video" ? (
                      <Play className="h-3 w-3 shrink-0" />
                    ) : project.media.type === "article" ? (
                      <FileText className="h-3 w-3 shrink-0" />
                    ) : (
                      <Image className="h-3 w-3 shrink-0" />
                    )}
                    <span
                      className={cn(
                        "overflow-hidden whitespace-nowrap transition-all duration-200",
                        isActive ? "ml-1 max-w-[60px] opacity-100" : "ml-0 max-w-0 opacity-0",
                      )}
                    >
                      {project.media.type === "video"
                        ? "Video"
                        : project.media.type === "article"
                          ? "Article"
                          : project.media.type === "image"
                            ? "Image"
                            : "GIF"}
                    </span>
                  </span>
                )}
              </div>

              {hasMedia && (
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-out",
                    isActive
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    {project.media?.type === "article" ? (
                      <ArticlePreview project={project} />
                    ) : (
                      <MobileFrame project={project} />
                    )}
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function WorkTimeline() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const collapseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (collapseTimerRef.current) clearTimeout(collapseTimerRef.current);
    };
  }, []);

  const toggleCard = useCallback((id: string, hasProjects: boolean) => {
    if (!hasProjects) return;
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  const handleEnter = useCallback((id: string, hasProjects: boolean) => {
    if (!hasProjects) return;
    if (collapseTimerRef.current) {
      clearTimeout(collapseTimerRef.current);
      collapseTimerRef.current = null;
    }
    setExpandedId(id);
  }, []);

  const handleLeave = useCallback(() => {
    collapseTimerRef.current = setTimeout(() => {
      setExpandedId(null);
    }, 300);
  }, []);

  const handleFocus = useCallback((id: string, hasProjects: boolean) => {
    if (!hasProjects) return;
    if (collapseTimerRef.current) {
      clearTimeout(collapseTimerRef.current);
      collapseTimerRef.current = null;
    }
    setExpandedId(id);
  }, []);

  const handleBlur = useCallback(() => {
    collapseTimerRef.current = setTimeout(() => {
      setExpandedId(null);
    }, 200);
  }, []);

  return (
    <div className="flex min-h-full flex-1 flex-col px-4 py-8 sm:px-8 sm:py-12">
      <h2 className="mb-6 text-xl font-bold text-slate-50 sm:mb-8 sm:text-2xl">Experience</h2>
      <div className="relative flex flex-col gap-0">
        <div
          className="absolute bottom-10 left-5 top-10 w-px bg-white sm:left-7"
          aria-hidden
        />
        {(experiencesData as Experience[]).map((exp) => {
          const hasProjects = !!exp.projects?.length;
          const isExpanded = expandedId === exp.id;

          return (
            <div
              key={exp.id}
              className="relative flex items-start gap-3 pb-8 last:pb-0 sm:gap-6 sm:pb-10"
            >
              <div className="relative z-10 mt-4 flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-4 ring-[#1A202C] sm:h-14 sm:w-14">
                <img
                  src={exp.logo}
                  alt={exp.company}
                  className="h-6 w-6 rounded-full object-cover sm:h-9 sm:w-9"
                />
              </div>

              <div
                role={hasProjects ? "button" : undefined}
                tabIndex={hasProjects ? 0 : undefined}
                aria-expanded={hasProjects ? isExpanded : undefined}
                aria-label={hasProjects ? `${exp.title} at ${exp.company}, ${exp.projects!.length} projects` : undefined}
                onClick={() => toggleCard(exp.id, hasProjects)}
                onKeyDown={hasProjects ? (e) => handleToggleKeyDown(e, () => toggleCard(exp.id, true)) : undefined}
                onMouseEnter={() => handleEnter(exp.id, hasProjects)}
                onMouseLeave={handleLeave}
                onFocus={() => handleFocus(exp.id, hasProjects)}
                onBlur={handleBlur}
                className={cn(
                  "min-w-0 flex-1 rounded-xl bg-slate-200 px-3 py-3 shadow-sm outline-none transition-all duration-300 ease-out sm:rounded-2xl sm:px-5 sm:py-4",
                  hasProjects && "cursor-pointer focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2",
                  isExpanded && "bg-white shadow-lg ring-1 ring-slate-300",
                )}
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-3">
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                      {exp.title}
                    </h3>
                    <p className="mt-0.5 text-xs font-normal text-slate-700 sm:text-sm">
                      {exp.company}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 sm:flex-col sm:items-end sm:gap-1.5">
                    <p className="text-xs font-normal text-slate-700 sm:text-sm">
                      {exp.dateStart} - {exp.dateEnd}
                    </p>
                    {hasProjects && (
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium transition-colors duration-300",
                          isExpanded
                            ? "bg-sky-100 text-sky-700"
                            : "bg-slate-300/80 text-slate-600",
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

                <div
                  className={cn(
                    "grid transition-all duration-300 ease-out",
                    isExpanded
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    {hasProjects && (
                      <ProjectList projects={exp.projects!} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
