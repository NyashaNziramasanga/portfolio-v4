import { useState, useEffect, useRef, useCallback } from "react";
import { Analytics } from "@vercel/analytics/react";
import { Button } from "@/components/ui/button";
import { WorkTimeline } from "@/components/WorkTimeline";
import { PublicationsList } from "@/components/PublicationsList";
import { cn } from "@/lib/utils";
import sectionsData from "@/data/sections.json";
import techStackData from "@/data/techStack.json";
import {
  siGithub,
  siYoutube,
  siGmail,
  siLinktree,
  siTypescript,
  siReact,
  siNodedotjs,
  siNextdotjs,
  siGooglecloud,
  siGit,
  siBun,
  siClaude,
  siPostgresql,
  siTailwindcss,
  siGraphql,
  siFigma,
  siCursor,
  siIos,
  siAndroid,
} from "simple-icons";
import { Bot, Cloud, Linkedin, Menu, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const simpleIconsMap: Record<string, { path: string; hex: string }> = {
  siTypescript, siReact, siNodedotjs, siNextdotjs, siGooglecloud,
  siGit, siBun, siClaude, siPostgresql, siTailwindcss,
  siGraphql, siFigma, siCursor, siIos, siAndroid,
};

const lucideIconsMap: Record<string, LucideIcon> = { Bot, Cloud };

function SimpleIconSvg({
  icon,
  className,
  style,
  "aria-label": ariaLabel,
}: {
  icon: { path: string };
  className?: string;
  style?: React.CSSProperties;
  "aria-label"?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      style={style}
      fill="currentColor"
      aria-hidden={!ariaLabel}
      aria-label={ariaLabel}
    >
      <path d={icon.path} />
    </svg>
  );
}

const YEARS_OF_EXPERIENCE = new Date().getFullYear() - 2019;

const socialLinks = [
  { href: "https://github.com/NyashaNziramasanga", icon: siGithub, label: "GitHub" },
  { href: "https://www.youtube.com/@Nyasha_Nziboi", icon: siYoutube, label: "YouTube" },
  { href: "mailto:nyashanziramasanga1@gmail.com", icon: siGmail, label: "Email" },
  { href: "https://linktr.ee/nyasha_nziboi", icon: siLinktree, label: "Linktree" },
  { href: "https://www.linkedin.com/in/nyasha-nash-nziramasanga-446380116/", lucide: Linkedin, label: "LinkedIn" },
] as const;

function SocialLinks() {
  return (
    <div className="flex justify-center gap-4">
      {socialLinks.map(({ href, label, ...rest }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("mailto:") ? undefined : "_blank"}
          rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
          className="text-brand-300 transition-colors hover:text-brand-50"
          aria-label={label}
        >
          {"icon" in rest ? (
            <SimpleIconSvg icon={rest.icon} className="h-5 w-5" />
          ) : (
            <rest.lucide className="h-5 w-5" />
          )}
        </a>
      ))}
    </div>
  );
}

function SidebarNav({
  activeSection,
  onSelect,
}: {
  activeSection: string;
  onSelect: (id: string) => void;
}) {
  return (
    <nav aria-label="Page sections" className="flex flex-col gap-0.5">
      {sectionsData.map(({ id, label }) => (
        <Button
          key={id}
          variant="ghost"
          aria-current={activeSection === id ? "true" : undefined}
          className={cn(
            "justify-start text-lg font-medium text-brand-300 transition-[transform,color,background-color,font-weight] duration-300 ease-in-out hover:scale-[1.01] hover:bg-brand-600/60 hover:text-brand-100",
            activeSection === id && "font-semibold text-brand-50",
          )}
          onClick={() => onSelect(id)}
        >
          {label}
        </Button>
      ))}
    </nav>
  );
}

function ProfileAvatar({
  size,
  ringSize,
  className,
}: {
  size: string;
  ringSize: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div
      className={cn("relative overflow-hidden rounded-full", size, ringSize, "ring-brand-400", className)}
      onMouseEnter={() => videoRef.current?.play()}
      onMouseLeave={() => {
        const v = videoRef.current;
        if (v) {
          v.pause();
          v.currentTime = 0;
        }
      }}
    >
      <img
        src="/logos/profile.webp"
        alt="Nyasha Nziramasanga"
        className="h-full w-full object-cover"
      />
      <video
        ref={videoRef}
        src="/media/nash-beach.webm"
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 hover:opacity-100 peer"
        onPlay={(e) => e.currentTarget.classList.replace("opacity-0", "opacity-100")}
        onPause={(e) => e.currentTarget.classList.replace("opacity-100", "opacity-0")}
      />
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState<string>("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const mainRef = useRef<HTMLDivElement>(null);

  const selectSection = useCallback((id: string) => {
    setMobileMenuOpen(false);
    sectionRefs.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
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
      { root: main, rootMargin: "0px 0px -60% 0px", threshold: 0 },
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-brand-900 md:flex-row">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-blue-500 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:outline-none"
      >
        Skip to content
      </a>
      {/* Mobile top bar */}
      <header className="flex items-center justify-between border-b border-brand-500 bg-brand-900 px-5 py-3.5 md:hidden">
        <div className="flex items-center gap-3">
          <ProfileAvatar size="h-9 w-9" ringSize="ring-2" />
          <div>
            <p className="text-sm font-bold text-brand-50">Nash Nziramasanga</p>
            <p className="text-xs text-brand-300">Senior Software Engineer</p>
          </div>
        </div>
        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="rounded-lg p-2 text-brand-200 transition-colors hover:bg-brand-600/60 hover:text-brand-50"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      {/* Mobile drawer overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-brand-500 bg-brand-900 px-6 py-6 transition-transform duration-300 ease-in-out md:hidden",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="mb-5 flex items-center justify-between">
          <ProfileAvatar size="h-20 w-20" ringSize="ring-4" />
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-lg p-2 text-brand-200 transition-colors hover:bg-brand-600/60 hover:text-brand-50"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <h1 className="mb-0.5 text-lg font-bold leading-tight text-brand-50">
          Nyasha (Nash) Nziramasanga
        </h1>
        <h2 className="mb-5 text-sm font-medium text-brand-300">
          Senior Software Engineer
        </h2>
        <hr className="mb-5 border-brand-500" />
        <SidebarNav activeSection={activeSection} onSelect={selectSection} />
        <div className="mt-auto pt-5">
          <SocialLinks />
        </div>
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden w-72 shrink-0 flex-col border-r border-brand-500 bg-brand-900 px-6 py-8 md:flex">
        <ProfileAvatar size="h-28 w-28" ringSize="ring-4" className="mb-5" />
        <h1 className="mb-0.5 text-xl font-bold leading-tight text-brand-50">
          Nyasha (Nash) Nziramasanga
        </h1>
        <h2 className="mb-5 text-base font-medium text-brand-300">
          Senior Software Engineer
        </h2>
        <hr className="mb-5 border-brand-500" />
        <SidebarNav activeSection={activeSection} onSelect={selectSection} />
        <div className="mt-auto pt-5">
          <SocialLinks />
        </div>
      </aside>

      {/* Scrollable content */}
      <main
        id="main-content"
        ref={mainRef}
        className="flex-1 snap-y snap-mandatory overflow-y-auto"
      >
        <section
          id="about"
          ref={(el) => {
            sectionRefs.current.about = el;
          }}
          className="flex min-h-screen snap-start items-center justify-center px-6 py-12 sm:px-10 sm:py-16"
        >
          <div className="flex max-w-3xl flex-col">
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
                {techStackData.map(({ iconKey, label, colorOverride }) => {
                  const isLucide = iconKey.startsWith("lucide:");
                  const key = isLucide ? iconKey.split(":")[1] : iconKey;
                  const siIcon = !isLucide ? simpleIconsMap[key] : undefined;
                  const LucideIcon = isLucide ? lucideIconsMap[key] : undefined;
                  const color = colorOverride ?? (siIcon ? `#${siIcon.hex}` : undefined);

                  return (
                    <span
                      key={label}
                      className="inline-flex items-center gap-1.5 rounded-full border border-brand-500 bg-brand-800/60 px-3 py-1.5 text-xs text-brand-100 sm:gap-2 sm:px-3.5 sm:py-2 sm:text-sm"
                    >
                      {siIcon ? (
                        <SimpleIconSvg
                          icon={siIcon}
                          className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                          aria-label={label}
                          style={{ color }}
                        />
                      ) : LucideIcon ? (
                        <LucideIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" style={{ color }} />
                      ) : null}
                      {label}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section
          id="experience"
          ref={(el) => {
            sectionRefs.current.experience = el;
          }}
          className="flex min-h-screen snap-start items-center justify-center px-6 py-12 sm:px-10 sm:py-16"
        >
          <WorkTimeline />
        </section>

        <section
          id="publications"
          ref={(el) => {
            sectionRefs.current.publications = el;
          }}
          className="flex min-h-screen snap-start items-center justify-center px-6 py-12 sm:px-10 sm:py-16"
        >
          <PublicationsList />
        </section>
      </main>
      <Analytics />
    </div>
  );
}
