import { useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "publications", label: "Publications" },
] as const;

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
    <div className="flex h-screen w-full overflow-hidden bg-slate-50">
      {/* Left panel - navigation */}
      <aside className="flex w-56 shrink-0 flex-col border-r border-slate-200 bg-white p-6">
        <h1 className="mb-8 text-lg font-semibold text-slate-900">Portfolio</h1>
        <nav className="flex flex-col gap-2">
          {SECTIONS.map(({ id, label }) => (
            <Button
              key={id}
              variant="ghost"
              className={cn(
                "justify-start font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900"
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
          <section
            ref={setSectionRef("about")}
            id="about"
            className="min-h-[60vh] scroll-mt-6"
          >
            <h2 className="mb-4 text-2xl font-bold text-slate-900">About</h2>
            <p className="text-slate-600">
              Welcome to my portfolio. I'm a developer focused on building
              clean, accessible applications with modern tools like React,
              TypeScript, and thoughtful design.
            </p>
          </section>

          <section
            ref={setSectionRef("experience")}
            id="experience"
            className="min-h-[60vh] scroll-mt-6"
          >
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              Experience
            </h2>
            <p className="text-slate-600">
              Here you'll find my professional experience, roles, and
              responsibilities across different teams and projects.
            </p>
          </section>

          <section
            ref={setSectionRef("projects")}
            id="projects"
            className="min-h-[60vh] scroll-mt-6"
          >
            <h2 className="mb-4 text-2xl font-bold text-slate-900">Projects</h2>
            <p className="text-slate-600">
              A selection of projects I've worked on—from side projects to
              production applications.
            </p>
          </section>

          <section
            ref={setSectionRef("publications")}
            id="publications"
            className="min-h-[60vh] scroll-mt-6"
          >
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              Publications
            </h2>
            <p className="text-slate-600">
              Articles, talks, and other publications I've contributed to.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
