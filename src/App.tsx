import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { PublicationsList } from "@/components/PublicationsList";
import { cn } from "@/lib/utils";
import sectionsData from "@/data/sections.json";
import { Github, Youtube, Mail, Linkedin } from "lucide-react";

export default function App() {
  const [activeSection, setActiveSection] = useState<string>("about");

  const selectSection = useCallback((id: string) => {
    setActiveSection(id);
  }, []);

  const activeContent = sectionsData.find((s) => s.id === activeSection);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#1A202C]">
      {/* Left panel - navigation */}
      <aside className="flex w-72 shrink-0 flex-col border-r border-slate-600 bg-[#1A202C] p-6">
        <img
          src="/logos/profile.webp"
          alt="Nyasha Nziramasanga"
          className="mb-4 h-28 w-28 rounded-full object-cover ring-4 ring-slate-500"
        />
        <h1 className="mb-6 text-lg font-semibold text-slate-50">
          Nyasha (Nash) Nziramasanga
        </h1>
        <h2 className="mb-6 text-lg font-semibold text-slate-50">
          Senior software Engineer
        </h2>
        <hr className="mb-6 border-slate-600" />
        <nav className="flex flex-col gap-2">
          {sectionsData.map(({ id, label }) => (
            <Button
              key={id}
              variant="ghost"
              className={cn(
                "justify-start text-lg font-medium text-slate-400 transition-[transform,color,background-color,font-weight] duration-300 ease-in-out hover:scale-[1.02] hover:bg-white/10 hover:text-slate-200",
                activeSection === id && "font-bold text-white"
              )}
              onClick={() => selectSection(id)}
            >
              {label}
            </Button>
          ))}
        </nav>

        <div className="mt-auto flex justify-center gap-3 pt-6">
          <a
            href="https://github.com/NyashaNziramasanga"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 transition-colors hover:text-white"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://www.youtube.com/@Nyasha_Nziboi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 transition-colors hover:text-white"
          >
            <Youtube className="h-5 w-5" />
          </a>
          <a
            href="mailto:nyashanziramasanga1@gmail.com"
            className="text-slate-400 transition-colors hover:text-white"
          >
            <Mail className="h-5 w-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/nyasha-nash-nziramasanga-446380116/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 transition-colors hover:text-white"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
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
        ) : activeContent && activeSection === "about" ? (
          <section
            id={activeContent.id}
            className="flex min-h-full flex-1 flex-col px-8 py-12"
          >
            <div className="flex max-w-2xl flex-1 flex-col">
              <p className="mb-4 text-2xl text-slate-300">Hello 👋🏿</p>
              <p className="italic leading-relaxed text-slate-300">
                I'm a Software Engineer based in Melbourne, Australia and
                currently working at{" "}
                <a
                  href="https://linktr.ee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 underline hover:text-sky-300"
                >
                  Linktree
                </a>
                . My specialty front-end development currently building mobile
                app experience with{" "}
                <a
                  href="https://reactnative.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 underline hover:text-sky-300"
                >
                  React Native
                </a>
                , but I'm also skilled in front-end development with React.
              </p>
            </div>
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
