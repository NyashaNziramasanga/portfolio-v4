import { useState, useRef, useEffect } from "react";

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>("about");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio);
        }

        let best: string | null = null;
        let bestRatio = -1;
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }
        if (best) setActiveSection(best);
      },
      { root: main, threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return { activeSection, sectionRefs, mainRef };
}
