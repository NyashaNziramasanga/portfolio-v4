import { useExpandCollapse } from "@/hooks/useExpandCollapse";
import experiencesData from "@/data/experiences.json";
import { ExperienceCard } from "./ExperienceCard";
import type { Experience } from "./types";

export function WorkTimeline() {
  const { expandedId, toggle, handleEnter, handleLeave, handleFocus, handleBlur } =
    useExpandCollapse();

  return (
    <div className="flex w-full max-w-5xl flex-col">
      <h2 className="mb-8 text-xl font-bold text-brand-50 sm:mb-10 sm:text-2xl">
        Experience
      </h2>
      <div className="flex flex-col gap-4">
        {(experiencesData as Experience[]).map((exp) => (
          <ExperienceCard
            key={exp.id}
            experience={exp}
            isExpanded={expandedId === exp.id}
            onToggle={() => toggle(exp.id)}
            onEnter={() => handleEnter(exp.id)}
            onLeave={handleLeave}
            onFocus={() => handleFocus(exp.id)}
            onBlur={handleBlur}
          />
        ))}
      </div>
    </div>
  );
}
