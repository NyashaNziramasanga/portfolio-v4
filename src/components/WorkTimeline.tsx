import experiencesData from "@/data/experiences.json";

type Experience = (typeof experiencesData)[number];

export function WorkTimeline() {
  return (
    <div className="flex min-h-full flex-1 flex-col px-8 py-12">
      <h2 className="mb-8 text-2xl font-bold text-slate-50">Experience</h2>
      <div className="relative flex flex-col gap-0">
        {/* Vertical line */}
        <div
          className="absolute left-7 top-10 bottom-10 w-px bg-white"
          aria-hidden
        />
        {experiencesData.map((exp: Experience) => (
          <div
            key={exp.id}
            className="relative flex items-center gap-6 pb-10 last:pb-0"
          >
            {/* Circle marker - white background, enlarged */}
            <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-4 ring-[#1A202C]">
              <img
                src={exp.logo}
                alt={exp.company}
                className="h-9 w-9 rounded-full object-cover"
              />
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
