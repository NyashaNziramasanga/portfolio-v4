import { useRef, useState, type KeyboardEvent } from "react";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../../styles/Colors.stylex";
import { spacing } from "../../styles/Spacing.stylex";
import { fonts } from "../../styles/Fonts.stylex";
import { radii } from "../../styles/BorderRadius.stylex";
import { layout } from "../../styles/Layout.stylex";
import { shadows } from "../../styles/Shadows.stylex";
import content from "./data/content.json";
import {
  ColorsPanel,
  SpacingPanel,
  TypographyPanel,
  ShapePanel,
  MotionPanel,
  ComponentsPanel,
} from "./Panels";

const panels = [
  ColorsPanel,
  SpacingPanel,
  TypographyPanel,
  ShapePanel,
  MotionPanel,
  ComponentsPanel,
];
export function DesignSystem() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const category = content.categories[active];
  const Panel = panels[active];
  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    let next = active;
    if (event.key === "ArrowRight") next = (active + 1) % panels.length;
    else if (event.key === "ArrowLeft")
      next = (active + panels.length - 1) % panels.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = panels.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
    tabs.current[next]?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }
  return (
    <div {...stylex.props(styles.root)}>
      <div
        role="tablist"
        aria-label="Design system categories"
        {...stylex.props(styles.tabs)}
      >
        {content.categories.map((item, index) => (
          <button
            key={item.id}
            ref={(element) => {
              tabs.current[index] = element;
            }}
            id={`tab-${item.id}`}
            role="tab"
            aria-selected={active === index}
            aria-controls={`panel-${item.id}`}
            tabIndex={active === index ? 0 : -1}
            onKeyDown={onKeyDown}
            onClick={() => setActive(index)}
            {...stylex.props(
              fonts.body,
              styles.tab,
              active === index && styles.selected,
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      <section
        key={category.id}
        id={`panel-${category.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${category.id}`}
        tabIndex={0}
        {...stylex.props(styles.panel)}
      >
        <header {...stylex.props(styles.heading)}>
          <p {...stylex.props(fonts.sectionDescription, styles.description)}>
            {category.description}
          </p>
        </header>
        <Panel />
      </section>
    </div>
  );
}
const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.md,
  },
  tabs: {
    display: "flex",
    gap: spacing.xs,
    overflowX: "auto",
    padding: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderAlpha40,
  },
  tab: {
    flexShrink: 0,
    minHeight: layout.touchTarget,
    paddingInline: spacing.md,
    borderRadius: radii.md,
    color: colors.textMuted,
    backgroundColor: {
      default: colors.transparent,
      ":hover": colors.surface,
    },
    cursor: "pointer",
    outline: {
      ":focus-visible": "none",
    },
    boxShadow: {
      ":focus-visible": shadows.focus,
    },
  },
  selected: {
    color: colors.textPrimary,
    backgroundColor: colors.surface,
  },
  panel: {
    outlineColor: colors.accentText,
  },
  heading: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  description: {
    color: colors.textMuted,
    maxWidth: layout.contentMedium,
  },
});
