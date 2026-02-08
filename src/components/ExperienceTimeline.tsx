import experiencesData from "@/data/experiences.json";
import { cn } from "@/lib/utils";

type Experience = (typeof experiencesData)[number];

function TimelineIcon({
  type,
  className,
}: {
  type: string;
  className?: string;
}) {
  if (type === "asterisk") {
    return (
      <span className={cn("text-lg font-bold text-white", className)}>*</span>
    );
  }
  if (type === "dog") {
    return (
      <svg
        className={cn("h-5 w-5 text-white", className)}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
      >
        {/* Simple sitting dog silhouette */}
        <path d="M12 4c-1.8 0-3.4 1.2-3.9 2.9-.3-.5-.8-.9-1.4-1.1-1-.4-2-.2-2.7.5C3.5 7.2 3 8.4 3 9.8v6.5c0 1.6 1.3 2.9 2.9 2.9h2.2v2.2h1.8v-2.2h2.2v2.2h1.8v-2.2h2.2c1.6 0 2.9-1.3 2.9-2.9V9.8c0-1.4-.5-2.6-1.4-3.5-.7-.7-1.7-1-2.7-.5-.6.2-1.1.6-1.4 1.1C15.4 5.2 13.8 4 12 4zm-2 9.5c0 .8-.7 1.5-1.5 1.5S7 14.3 7 13.5 7.7 12 8.5 12s1.5.7 1.5 1.5zm5 0c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5.7-1.5 1.5-1.5 1.5.7 1.5 1.5z" />
      </svg>
    );
  }
  return null;
}

export function ExperienceTimeline() {
  return (
    <div className="flex min-h-full flex-1 flex-col px-8 py-12">
      <h2 className="mb-8 text-2xl font-bold text-slate-50">Experience</h2>
      <div className="relative flex flex-col gap-0">
        {/* Vertical line */}
        <div
          className="absolute left-4 top-8 bottom-8 w-px bg-white"
          aria-hidden
        />
        {experiencesData.map((exp: Experience) => (
          <div
            key={exp.id}
            className="relative flex items-start gap-6 pb-10 last:pb-0"
          >
            {/* Circle marker */}
            <div
              className={cn(
                "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-4 ring-[#1A202C]",
                exp.iconColor
              )}
            >
              <TimelineIcon type={exp.iconType} />
            </div>
            {/* Card */}
            <div className="min-w-0 flex-1 rounded-2xl bg-slate-200 px-5 py-4 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {exp.title}
                  </h3>
                  <p className="mt-0.5 text-sm font-normal text-slate-700">
                    {exp.company}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-normal text-slate-700">
                    {exp.dateStart} - {exp.dateEnd}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
