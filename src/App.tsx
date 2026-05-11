import { useCallback, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { MobileDrawer } from "@/components/layout/MobileDrawer";
import { Sidebar } from "@/components/layout/Sidebar";
import { ContentArea } from "@/components/layout/ContentArea";

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

  useEffect(() => {
    const hashId = window.location.hash.replace(/^#/, "");
    if (!hashId) return;

    requestAnimationFrame(() => {
      sectionRefs.current[hashId]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [sectionRefs]);

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

      <ContentArea ref={mainRef} sectionRefs={sectionRefs} />

      <Analytics />
      <SpeedInsights />
    </div>
  );
}
