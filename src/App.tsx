import { useCallback } from "react";
import { Analytics } from "@vercel/analytics/react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { MobileDrawer } from "@/components/layout/MobileDrawer";
import { Sidebar } from "@/components/layout/Sidebar";
import { Section } from "@/components/layout/Section";
import { AboutSection } from "@/components/AboutSection";
import { WorkTimeline } from "@/components/WorkTimeline";
import { PublicationsList } from "@/components/PublicationsList";

export default function App() {
  const { activeSection, sectionRefs, mainRef } = useActiveSection();
  const { isOpen, toggle, close } = useMobileMenu();

  const selectSection = useCallback(
    (id: string) => {
      close();
      sectionRefs.current[id]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    },
    [close, sectionRefs],
  );

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-brand-900 md:flex-row">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground focus:outline-none"
      >
        Skip to content
      </a>

      <MobileHeader isOpen={isOpen} onToggle={toggle} />
      <MobileDrawer
        isOpen={isOpen}
        onClose={close}
        activeSection={activeSection}
        onSelect={selectSection}
      />
      <Sidebar activeSection={activeSection} onSelect={selectSection} />

      <main
        id="main-content"
        ref={mainRef}
        className="flex-1 overflow-y-auto md:snap-y md:snap-mandatory"
      >
        <Section
          id="about"
          ref={(el) => {
            sectionRefs.current.about = el;
          }}
        >
          <AboutSection />
        </Section>

        <Section
          id="experience"
          ref={(el) => {
            sectionRefs.current.experience = el;
          }}
        >
          <WorkTimeline />
        </Section>

        <Section
          id="publications"
          ref={(el) => {
            sectionRefs.current.publications = el;
          }}
        >
          <PublicationsList />
        </Section>
      </main>

      <Analytics />
    </div>
  );
}
