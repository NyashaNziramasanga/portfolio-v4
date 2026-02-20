import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { PublicationsList } from "@/components/PublicationsList";
import { cn } from "@/lib/utils";
import sectionsData from "@/data/sections.json";

export default function App() {
  const [activeSection, setActiveSection] = useState<string>("about");

  const selectSection = useCallback((id: string) => {
    setActiveSection(id);
  }, []);

  const activeContent = sectionsData.find((s) => s.id === activeSection);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#1A202C]">
      {/* Left panel - navigation */}
      <aside className="flex w-56 shrink-0 flex-col border-r border-slate-600 bg-[#1A202C] p-6">
        <img
          src="/logos/profile.webp"
          alt="Nyasha Nziramasanga"
          className="mb-4 h-20 w-20 rounded-full object-cover"
        />
        <h1 className="mb-6 text-lg font-semibold text-slate-50">
          Nyasha (Nash) Nziramasanga
        </h1>
        <h2 className="mb-6 text-lg font-semibold text-slate-50">
          Sr Software Engineer
        </h2>
        <hr className="mb-6 border-slate-600" />
        <nav className="flex flex-col gap-2">
          {sectionsData.map(({ id, label }) => (
            <Button
              key={id}
              variant="ghost"
              className={cn(
                "justify-start font-medium text-slate-200 transition-[transform,color,background-color,font-weight] duration-300 ease-in-out hover:scale-[1.02] hover:bg-white/10 hover:text-white",
                activeSection === id && "font-bold italic text-white"
              )}
              onClick={() => selectSection(id)}
            >
              {label}
            </Button>
          ))}
        </nav>
      </aside>

      {/* Right panel - active section fills the screen */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {activeContent && activeSection === "experience" ? (
          <section
            id={activeContent.id}
            className="flex min-h-full flex-1 flex-col overflow-y-auto"
          >
            <ExperienceTimeline />
          </section>
        ) : activeContent && activeSection === "publications" ? (
          <section
            id={activeContent.id}
            className="flex min-h-full flex-1 flex-col overflow-y-auto"
          >
            <PublicationsList />
          </section>
        ) : activeContent ? (
          <section
            id={activeContent.id}
            className="flex min-h-full flex-1 flex-col px-8 py-12"
          >
            <div className="flex max-w-2xl flex-1 flex-col">
              <h2 className="mb-4 text-2xl font-bold text-slate-50">
                {activeContent.title}
              </h2>
              <p className="text-slate-300">{activeContent.content}</p>
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}
