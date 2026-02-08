import { useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import sectionsData from "@/data/sections.json";

type Section = (typeof sectionsData)[number];

export default function App() {
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const scrollToSection = useCallback((id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const setSectionRef = useCallback(
    (id: string) => (el: HTMLElement | null) => {
      sectionRefs.current[id] = el;
    },
    []
  );

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#1A202C]">
      {/* Left panel - navigation */}
      <aside className="flex w-56 shrink-0 flex-col border-r border-slate-600 bg-[#1A202C] p-6">
        <h1 className="mb-8 text-lg font-semibold text-slate-50">Portfolio</h1>
        <nav className="flex flex-col gap-2">
          {sectionsData.map(({ id, label }) => (
            <Button
              key={id}
              variant="ghost"
              className={cn(
                "justify-start font-medium text-slate-200 transition-[transform,color,background-color] duration-200 hover:scale-[1.02] hover:bg-white/10 hover:text-white"
              )}
              onClick={() => scrollToSection(id)}
            >
              {label}
            </Button>
          ))}
        </nav>
      </aside>

      {/* Right panel - scrollable content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-2xl px-8 py-12">
          {sectionsData.map((section: Section) => (
            <section
              key={section.id}
              ref={setSectionRef(section.id)}
              id={section.id}
              className="min-h-[60vh] scroll-mt-6"
            >
              <h2 className="mb-4 text-2xl font-bold text-slate-50">
                {section.title}
              </h2>
              <p className="text-slate-300">{section.content}</p>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
