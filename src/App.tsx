import { useCallback, useEffect, useRef } from "react";
import * as stylex from "@stylexjs/stylex";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { MobileDrawer } from "@/components/layout/MobileDrawer";
import { Sidebar } from "@/components/layout/Sidebar";
import { ContentArea } from "@/components/layout/ContentArea";
import { colors, constants } from "./styles/tokens.stylex";

export default function App() {
  const { activeSection, sectionRefs, mainRef } = useActiveSection();
  const { isOpen, toggle, close } = useMobileMenu();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => {
    close();
    requestAnimationFrame(() => menuButtonRef.current?.focus());
  }, [close]);

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
    <div {...stylex.props(styles.root)}>
      <a href="#main-content" {...stylex.props(styles.skipLink)}>
        Skip to content
      </a>

      <MobileHeader
        isOpen={isOpen}
        onToggle={toggle}
        buttonRef={menuButtonRef}
      />
      <MobileDrawer
        isOpen={isOpen}
        onClose={closeMenu}
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

const styles = stylex.create({
  root: {
    display: "flex",
    height: "100dvh",
    width: "100%",
    flexDirection: {
      default: "column",
      [constants.lg]: "row",
    },
    overflow: "hidden",
    backgroundColor: colors.brand900,
  },
  skipLink: {
    position: {
      default: "absolute",
      ":focus": "fixed",
    },
    width: {
      default: 1,
      ":focus": "auto",
    },
    height: {
      default: 1,
      ":focus": "auto",
    },
    padding: {
      default: 0,
      ":focus": "8px 16px",
    },
    margin: {
      default: -1,
      ":focus": 0,
    },
    overflow: {
      default: "hidden",
      ":focus": "visible",
    },
    clip: {
      default: "rect(0, 0, 0, 0)",
      ":focus": "auto",
    },
    whiteSpace: {
      default: "nowrap",
      ":focus": "normal",
    },
    borderWidth: 0,
    left: {
      ":focus": 16,
    },
    top: {
      ":focus": 16,
    },
    zIndex: {
      ":focus": constants.zSkipLink,
    },
    borderRadius: {
      ":focus": 6,
    },
    backgroundColor: {
      ":focus": colors.primary,
    },
    fontSize: {
      ":focus": 14,
    },
    fontWeight: {
      ":focus": 500,
    },
    color: {
      ":focus": colors.primaryForeground,
    },
    outline: {
      ":focus": "none",
    },
  },
});
