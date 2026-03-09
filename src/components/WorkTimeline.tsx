import { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Play, Image, ChevronRight, Layers } from "lucide-react";
import experiencesData from "@/data/experiences.json";

type Project = {
  name: string;
  year: number;
  media?: { type: "video" | "gif" | "image"; src: string };
};

type Experience = (typeof experiencesData)[number] & {
  projects?: Project[];
};

function MobileFrame({ project }: { project: Project }) {
  return (
    <div className="flex justify-center py-3">
      <div className="relative w-[180px] rounded-[24px] border-[3px] border-slate-700 bg-black p-1.5 shadow-xl">
        <div className="overflow-hidden rounded-[18px] bg-black">
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

        {/* Home indicator */}
        <div className="mx-auto mt-1 h-1 w-10 rounded-full bg-slate-600" />
      </div>
    </div>
  );
}

function ProjectList({ projects }: { projects: Project[] }) {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <div className="mt-3 border-t border-slate-400/30 pt-3">
      <ul className="flex flex-col">
        {projects.map((project) => {
          const hasMedia = !!project.media;
          const isHovered = hoveredProject === project.name;

          return (
            <li
              key={project.name}
              onMouseEnter={() => hasMedia && setHoveredProject(project.name)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div
                className={cn(
                  "flex items-center justify-between rounded-lg px-3 py-2 transition-all duration-200",
                  hasMedia && "cursor-pointer",
                  isHovered && "bg-slate-300/60",
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-800">
                    {project.name}
                  </span>
                  {project.media && (
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                        project.media.type === "video"
                          ? "bg-sky-100 text-sky-700"
                          : project.media.type === "image"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-violet-100 text-violet-700",
                      )}
                    >
                      {project.media.type === "video" ? (
                        <Play className="h-3 w-3" />
                      ) : (
                        <Image className="h-3 w-3" />
                      )}
                      {project.media.type === "video"
                        ? "Video"
                        : project.media.type === "image"
                          ? "Image"
                          : "GIF"}
                    </span>
                  )}
                </div>
              </div>

              {hasMedia && (
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-out",
                    isHovered
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <MobileFrame project={project} />
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

  return (
    <div className="flex min-h-full flex-1 flex-col px-8 py-12">
      <h2 className="mb-8 text-2xl font-bold text-slate-50">Experience</h2>
      <div className="relative flex flex-col gap-0">
        <div
          className="absolute left-7 top-10 bottom-10 w-px bg-white"
          aria-hidden
        />
        {(experiencesData as Experience[]).map((exp) => {
          const hasProjects = !!exp.projects?.length;
          const isExpanded = expandedId === exp.id;

          return (
            <div
              key={exp.id}
              className="relative flex items-start gap-6 pb-10 last:pb-0"
            >
              <div className="relative z-10 mt-4 flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-4 ring-[#1A202C]">
                <img
                  src={exp.logo}
                  alt={exp.company}
                  className="h-9 w-9 rounded-full object-cover"
                />
              </div>

              <div
                onMouseEnter={() => handleEnter(exp.id, hasProjects)}
                onMouseLeave={handleLeave}
                className={cn(
                  "min-w-0 flex-1 rounded-2xl bg-slate-200 px-5 py-4 shadow-sm transition-all duration-300 ease-out",
                  hasProjects && "cursor-pointer",
                  isExpanded && "bg-white shadow-lg ring-1 ring-slate-300",
                )}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {exp.title}
                    </h3>
                    <p className="mt-0.5 text-sm font-normal text-slate-700">
                      {exp.company}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <p className="text-sm font-normal text-slate-700">
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
