import { ArrowUpRight, ChevronDown, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { CollapsiblePanel } from "@/components/ui/collapsible-panel";
import { ProjectsPanel } from "./ProjectsPanel";
import type { Experience } from "./types";

function formatDuration(startDate: string, endDate?: string) {
  const [startYear, startMonth] = startDate.split("-").map(Number);
  const now = new Date();
  const [endYear, endMonth] = endDate
    ? endDate.split("-").map(Number)
    : [now.getFullYear(), now.getMonth() + 1];
  const totalMonths = Math.max(1, (endYear - startYear) * 12 + endMonth - startMonth + 1);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  return [years ? `${years} ${years === 1 ? "yr" : "yrs"}` : null, months ? `${months} ${months === 1 ? "mo" : "mos"}` : null]
    .filter(Boolean)
    .join(" ");
}

export function ExperienceCard({ experience, isExpanded, onToggle }: { experience: Experience; isExpanded: boolean; onToggle: () => void }) {
  const projects = experience.projects ?? [];
  const hasProjects = projects.length > 0;
  const panelId = `experience-panel-${experience.id}`;
  const duration = formatDuration(experience.startDate, experience.endDate);

  return (
    <article className={cn("w-full rounded-xl bg-brand-700 px-4 py-4 shadow-sm transition-all duration-300 ease-out motion-reduce:transition-none sm:rounded-2xl sm:px-6 sm:py-5", isExpanded && "bg-brand-600 shadow-lg ring-1 ring-primary/30")}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-start gap-3 sm:gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full sm:h-14 sm:w-14">
            <img src={experience.logo} alt="" loading="lazy" className="h-6 w-6 rounded-full object-cover sm:h-9 sm:w-9" />
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-bold text-brand-50 sm:text-lg">{experience.title}</h3>
            {experience.companyUrl ? (
              <a href={experience.companyUrl} target="_blank" rel="noopener noreferrer" className="group/company mt-0.5 inline-flex items-center gap-0.5 text-xs text-brand-300 transition-colors hover:text-brand-100 sm:text-sm">
                {experience.company}
                <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover/company:opacity-100" aria-hidden="true" />
              </a>
            ) : <p className="mt-0.5 text-xs text-brand-300 sm:text-sm">{experience.company}</p>}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:flex-col sm:items-end">
          <p className="text-[11px] text-brand-300 sm:text-sm">{experience.dateStart} – {experience.dateEnd} <span className="text-brand-400">· {duration}</span></p>
          {hasProjects ? (
            <button type="button" aria-expanded={isExpanded} aria-controls={panelId} onClick={onToggle} className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/40 px-2.5 py-1 text-xs font-medium text-brand-200 outline-none transition-colors hover:bg-brand-500/70 focus-visible:ring-2 focus-visible:ring-primary">
              <Layers className="h-3 w-3" aria-hidden="true" />
              {projects.length} projects
              <ChevronDown className={cn("h-3 w-3 transition-transform", isExpanded && "rotate-180")} aria-hidden="true" />
            </button>
          ) : null}
        </div>
      </div>

      {hasProjects ? (
        <CollapsiblePanel open={isExpanded} id={panelId}>
          <ProjectsPanel projects={projects} />
        </CollapsiblePanel>
      ) : null}
    </article>
  );
}
