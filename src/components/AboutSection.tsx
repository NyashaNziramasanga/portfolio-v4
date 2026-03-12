import techStackData from "@/data/techStack.json";
import { TechBadge } from "@/components/TechBadge";

const YEARS_OF_EXPERIENCE = new Date().getFullYear() - 2019;

export function AboutSection() {
  return (
    <div className="flex w-full max-w-5xl flex-col">
      <p className="mb-4 text-xl font-medium text-brand-200 sm:text-2xl">Hello 👋🏿</p>
      <p className="text-sm leading-relaxed text-brand-200 sm:text-base sm:leading-7">
        I'm a Software Engineer based in Melbourne, Australia with over{" "}
        {YEARS_OF_EXPERIENCE} years of experience. I currently
        work at{" "}
        <a
          href="https://linktr.ee"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
        >
          Linktree
        </a>{" "}
        where I help build products used by millions of creators
        worldwide. I'm passionate about crafting high-quality and world
        class mobile app experiences that are simple, scalable, and
        delightful to use.
      </p>

      <div className="mt-10 sm:mt-12">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-400">
          Current Tech Stack
        </h3>
        <div className="flex flex-wrap gap-2 sm:gap-2.5">
          {techStackData.map(({ iconKey, label, colorOverride }) => (
            <TechBadge
              key={label}
              iconKey={iconKey}
              label={label}
              colorOverride={colorOverride}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
