import techStackData from "@/data/techStack.json";
import { ResumeActions } from "@/components/ResumeActions";

const YEARS_OF_EXPERIENCE = new Date().getFullYear() - 2018;

export function AboutSection() {
  return (
    <div className="flex w-full max-w-5xl flex-col">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">Hello, I'm Nash 👋🏿</p>
      <h1 className="mt-3 max-w-4xl text-3xl font-bold leading-tight text-brand-50 sm:text-4xl lg:text-5xl">
        Senior Mobile Engineer
        <span className="mt-2 block text-xl font-semibold text-brand-300 sm:text-2xl lg:text-3xl">React Native, iOS, Android &amp; Agentic Tooling</span>
      </h1>
      <p className="mt-6 max-w-4xl text-sm leading-relaxed text-brand-200 sm:text-base sm:leading-7">
        I build and scale mobile products used by millions of people. Based in Melbourne with over {YEARS_OF_EXPERIENCE} years of experience, I work at{" "}
        <a href="https://linktr.ee" target="_blank" rel="noopener noreferrer" className="text-blue-300 underline underline-offset-2 hover:text-blue-200">Linktree</a>{" "}
        across React Native architecture, reliable delivery and creator experiences on iOS and Android.
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-3">
        <ResumeActions />
      </div>

      <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-3">
        {techStackData.map((group) => (
            <div
              className="group rounded-2xl border border-brand-500/50 bg-brand-800/50 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:bg-brand-700/70 hover:shadow-lg motion-reduce:transform-none motion-reduce:transition-none"
              key={group.id}
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-400/10 text-xl ring-1 ring-inset ring-blue-400/20 transition-colors group-hover:bg-blue-400/15" aria-hidden="true">
                {group.emoji}
              </div>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-brand-300">{group.label}</h2>
              <p className="mt-2 text-sm leading-6 text-brand-100">{group.summary}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
