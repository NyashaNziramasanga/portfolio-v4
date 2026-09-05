import { useMemo } from "react";
import * as stylex from "@stylexjs/stylex";
import { StackItem } from "@/tools/mobile-app-stack-picker/components/StackItem";
import type { StackCategory, StackItem as StackItemType } from "@/tools/types";
import { colors, constants } from "../../../styles/tokens.stylex";

type CategoryColumnProps = {
  category: StackCategory;
  selectedItemId: string | null;
  onSelect: (itemId: string) => void;
};

const isPick = (item: StackItemType) => "pick" in item && item.pick === true;

export function CategoryColumn({
  category,
  selectedItemId,
  onSelect,
}: CategoryColumnProps) {
  const tier = category.tier ?? 1;
  const tierIndex = Math.max(1, Math.min(4, tier)) - 1;
  const containerStyle = [
    tierStyles.container1,
    tierStyles.container2,
    tierStyles.container3,
    tierStyles.container4,
  ][tierIndex];
  const dividerStyle = [
    tierStyles.divider1,
    tierStyles.divider2,
    tierStyles.divider3,
    tierStyles.divider4,
  ][tierIndex];

  const sortedItems = useMemo(() => {
    const weight = (item: StackItemType) => {
      if (item.id === selectedItemId) return 2;
      if (isPick(item)) return 1;
      return 0;
    };
    return [...category.items].sort((a, b) => weight(b) - weight(a));
  }, [category.items, selectedItemId]);

  return (
    <section {...stylex.props(styles.root, containerStyle)} data-tier={tier}>
      <div {...stylex.props(styles.header, dividerStyle)}>
        <h3 {...stylex.props(styles.title)}>{category.title}</h3>
        <p {...stylex.props(styles.subtitle)}>{category.subtitle}</p>
      </div>

      <div {...stylex.props(styles.items)}>
        {sortedItems.map((item) => (
          <StackItem
            key={item.id}
            item={item}
            selected={selectedItemId === item.id}
            onSelect={() => onSelect(item.id)}
          />
        ))}
      </div>
    </section>
  );
}

const styles = stylex.create({
  root: {
    borderRadius: 12,
    borderWidth: 1,
    padding: {
      default: 16,
      [constants.sm]: 20,
    },
    transitionProperty: "color, background-color, border-color",
  },
  header: {
    marginBottom: 12,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  title: {
    fontSize: 16,
    lineHeight: "24px",
    fontWeight: 600,
    color: colors.brand50,
  },
  subtitle: {
    marginTop: 2,
    fontSize: 10,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.14em",
    color: colors.brand400,
  },
  items: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
});

const tierStyles = stylex.create({
  container1: {
    borderColor: colors.brand500,
    backgroundColor: "color-mix(in oklab, #1F2937 70%, transparent)",
  },
  container2: {
    borderColor: "color-mix(in oklab, #4A5568 75%, transparent)",
    backgroundColor: "color-mix(in oklab, #1F2937 50%, transparent)",
  },
  container3: {
    borderColor: "color-mix(in oklab, #4A5568 55%, transparent)",
    backgroundColor: "color-mix(in oklab, #1F2937 35%, transparent)",
  },
  container4: {
    borderColor: "color-mix(in oklab, #4A5568 35%, transparent)",
    backgroundColor: "color-mix(in oklab, #1F2937 20%, transparent)",
  },
  divider1: {
    borderColor: colors.brand500,
  },
  divider2: {
    borderColor: "color-mix(in oklab, #4A5568 70%, transparent)",
  },
  divider3: {
    borderColor: "color-mix(in oklab, #4A5568 50%, transparent)",
  },
  divider4: {
    borderColor: "color-mix(in oklab, #4A5568 30%, transparent)",
  },
});
