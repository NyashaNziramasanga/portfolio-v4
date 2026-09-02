import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import experiencesData from "@/data/experiences.json";
import educationData from "@/data/education.json";
import { ExperienceCard } from "./ExperienceCard";
import type { Education, Experience } from "./types";

export function WorkTimeline() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="flex w-full max-w-5xl flex-col">
      <h2 className="mb-8 text-xl font-bold text-brand-50 sm:mb-10 sm:text-2xl">Experience</h2>
      <div className="flex flex-col gap-4">
        {(experiencesData as Experience[]).map((experience) => (
          <ExperienceCard key={experience.id} experience={experience} isExpanded={expandedId === experience.id} onToggle={() => setExpandedId((current) => current === experience.id ? null : experience.id)} />
        ))}
      </div>

      <div className="mt-10 border-t border-brand-500/60 pt-8">
        <h3 className="mb-8 text-xl font-bold text-brand-50 sm:mb-10 sm:text-2xl">Education</h3>
        <div className="grid gap-3 lg:grid-cols-2">
          {(educationData as Education[]).map((education) => (
            <article key={education.id} className="flex items-start gap-3 rounded-xl bg-brand-700 px-4 py-4 shadow-sm sm:gap-4 sm:rounded-2xl sm:px-6 sm:py-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full sm:h-14 sm:w-14">
                <img src={education.logo} alt="" loading="lazy" decoding="async" width={48} height={48} className="h-6 w-6 rounded-full object-cover sm:h-9 sm:w-9" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-base font-bold text-brand-50 sm:text-lg">{education.title}</h4>
                <a href={education.institutionUrl} target="_blank" rel="noopener noreferrer" className="group/institution mt-0.5 inline-flex items-center gap-0.5 text-xs text-brand-300 transition-colors hover:text-brand-100 sm:text-sm">
                  {education.institution}
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover/institution:opacity-100" aria-hidden="true" />
                </a>
                <p className="mt-2 text-[11px] text-brand-300 sm:text-sm">{education.dateStart} – {education.dateEnd}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
