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
import { colors } from "./styles/Colors.stylex";
import { spacing } from "./styles/Spacing.stylex";
import { radii } from "./styles/BorderRadius.stylex";
import { fontSizes, fontWeights } from "./styles/Typography.stylex";
import { breakpoints } from "./styles/Breakpoints.stylex";
import { layout } from "./styles/Layout.stylex";

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
      [breakpoints.lg]: "row",
    },
    overflow: "hidden",
    backgroundColor: colors.background,
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
    paddingBlock: {
      default: 0,
      ":focus": spacing.xs,
    },
    paddingInline: {
      default: 0,
      ":focus": spacing.md,
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
      ":focus": spacing.md,
    },
    top: {
      ":focus": spacing.md,
    },
    zIndex: {
      ":focus": layout.zSkipLink,
    },
    borderRadius: {
      ":focus": radii.sm,
    },
    backgroundColor: {
      ":focus": colors.actionPrimary,
    },
    fontSize: {
      ":focus": fontSizes.body,
    },
    fontWeight: {
      ":focus": fontWeights.medium,
    },
    color: {
      ":focus": colors.actionPrimaryText,
    },
    outline: {
      ":focus": "none",
    },
  },
});
