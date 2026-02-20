import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { WorkTimeline } from "@/components/WorkTimeline";
import { PublicationsList } from "@/components/PublicationsList";
import { cn } from "@/lib/utils";
import sectionsData from "@/data/sections.json";
import { Github, Youtube, Mail, Linkedin } from "lucide-react";

export default function App() {
  const [activeSection, setActiveSection] = useState<string>("about");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const mainRef = useRef<HTMLDivElement>(null);

  const selectSection = useCallback((id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { root: main, rootMargin: "0px 0px -60% 0px", threshold: 0 }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#1A202C]">
      {/* Left panel - navigation */}
      <aside className="flex w-72 shrink-0 flex-col border-r border-slate-600 bg-[#1A202C] p-6">
        <img
          src="/logos/profile.webp"
          alt="Nyasha Nziramasanga"
          className="mb-4 h-28 w-28 rounded-full object-cover ring-4 ring-slate-500"
        />
        <h1 className="mb-1 text-xl font-bold text-slate-50">
          Nyasha (Nash) Nziramasanga
        </h1>
        <h2 className="mb-6 text-base font-medium text-slate-400">
          Senior Software Engineer
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

      {/* Right panel - scrollable single-page sections */}
      <main ref={mainRef} className="flex-1 snap-y snap-mandatory overflow-y-auto">
        <section
          id="about"
          ref={(el) => { sectionRefs.current.about = el; }}
          className="flex min-h-screen snap-start items-center justify-center px-8 py-12"
        >
          <div className="flex max-w-2xl flex-col">
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

        <section
          id="experience"
          ref={(el) => { sectionRefs.current.experience = el; }}
          className="min-h-screen snap-start"
        >
          <WorkTimeline />
        </section>

        <section
          id="publications"
          ref={(el) => { sectionRefs.current.publications = el; }}
          className="min-h-screen snap-start"
        >
          <PublicationsList />
        </section>
      </main>
    </div>
  );
}
