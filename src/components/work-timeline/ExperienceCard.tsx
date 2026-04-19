import { cn, handleToggleKeyDown } from "@/lib/utils";
import { ArrowUpRight, ChevronRight, Layers } from "lucide-react";
import { CollapsiblePanel } from "@/components/ui/collapsible-panel";
import { ProjectsPanel } from "./ProjectsPanel";
import type { Experience } from "./types";

type ExperienceCardProps = {
  experience: Experience;
  isExpanded: boolean;
  onToggle: () => void;
  onEnter: () => void;
  onLeave: () => void;
  onFocus: () => void;
  onBlur: () => void;
};

export function ExperienceCard({
  experience,
  isExpanded,
  onToggle,
  onEnter,
  onLeave,
  onFocus,
  onBlur,
}: ExperienceCardProps) {
  const hasProjects = !!experience.projects?.length;

  return (
    <div
      {...(hasProjects
        ? {
            role: "button" as const,
            tabIndex: 0,
            "aria-expanded": isExpanded,
            "aria-label": `${experience.title} at ${experience.company}, ${experience.projects!.length} projects`,
            onClick: onToggle,
            onKeyDown: (e: React.KeyboardEvent) => handleToggleKeyDown(e, onToggle),
            onMouseEnter: onEnter,
            onMouseLeave: onLeave,
            onFocus: onFocus,
            onBlur: onBlur,
          }
        : {})}
      className={cn(
        "w-full rounded-xl bg-brand-700 px-4 py-4 shadow-sm outline-none transition-all duration-300 ease-out sm:rounded-2xl sm:px-6 sm:py-5",
        hasProjects &&
          "cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900",
        isExpanded && "bg-brand-600 shadow-lg ring-1 ring-primary/30",
      )}
    >
      <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-3">
        <div className="flex min-w-0 items-start gap-3 sm:gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-transparent sm:h-14 sm:w-14">
            <img
              src={experience.logo}
              alt={experience.company}
              loading="lazy"
              className="h-6 w-6 rounded-full object-cover sm:h-9 sm:w-9"
            />
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-bold text-brand-50 sm:text-lg">
              {experience.title}
            </h3>
            {experience.companyUrl ? (
              <a
                href={experience.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="group/company mt-0.5 inline-flex items-center gap-0.5 text-xs font-normal text-brand-300 transition-colors hover:text-brand-100 sm:text-sm"
              >
                {experience.company}
                <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover/company:opacity-100" />
              </a>
            ) : (
              <p className="mt-0.5 text-xs font-normal text-brand-300 sm:text-sm">
                {experience.company}
              </p>
            )}
          </div>
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-2 sm:mt-0 sm:flex-col sm:items-end sm:gap-1.5">
          <p className="text-[11px] font-normal text-brand-300 sm:text-sm">
            {experience.dateStart} - {experience.dateEnd}
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
              {experience.projects!.length} projects
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
        {hasProjects && isExpanded && <ProjectsPanel projects={experience.projects!} />}
      </CollapsiblePanel>
    </div>
  );
}
