import { forwardRef, type MutableRefObject } from "react";
import { Section } from "@/components/layout/Section";
import { AboutSection } from "@/components/AboutSection";
import { WorkTimeline } from "@/components/work-timeline";
import { PublicationsList } from "@/components/publications";

type ContentAreaProps = {
  sectionRefs: MutableRefObject<Record<string, HTMLElement | null>>;
};

export const ContentArea = forwardRef<HTMLDivElement, ContentAreaProps>(
  ({ sectionRefs }, ref) => {
    return (
      <main
        id="main-content"
        ref={ref}
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
    );
  },
);

ContentArea.displayName = "ContentArea";
