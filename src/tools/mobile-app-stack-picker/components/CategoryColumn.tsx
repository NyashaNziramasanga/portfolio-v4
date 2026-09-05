import { useMemo } from "react";
import * as stylex from "@stylexjs/stylex";
import { StackItem } from "@/tools/mobile-app-stack-picker/components/StackItem";
import type { StackCategory, StackItem as StackItemType } from "@/tools/types";
import { colors } from "../../../styles/Colors.stylex";
import { spacing } from "../../../styles/Spacing.stylex";
import { radii } from "../../../styles/BorderRadius.stylex";
import {
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacing,
} from "../../../styles/Typography.stylex";
import { breakpoints } from "../../../styles/Breakpoints.stylex";

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
    borderRadius: radii.lg,
    borderWidth: 1,
    padding: {
      default: spacing.md,
      [breakpoints.sm]: spacing.lg,
    },
    transitionProperty: "color, background-color, border-color",
  },
  header: {
    marginBottom: spacing.sm,
    borderBottomWidth: 1,
    paddingBottom: spacing.sm,
  },
  title: {
    fontSize: fontSizes.bodyLarge,
    lineHeight: lineHeights.line24,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary,
  },
  subtitle: {
    marginTop: spacing.xxs,
    fontSize: fontSizes.caption,
    fontWeight: fontWeights.semibold,
    textTransform: "uppercase",
    letterSpacing: letterSpacing.labelWide,
    color: colors.textMuted,
  },
  items: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.xs,
  },
});

const tierStyles = stylex.create({
  container1: {
    borderColor: colors.border,
    backgroundColor: colors.surfaceSubtleAlpha70,
  },
  container2: {
    borderColor: colors.borderAlpha75,
    backgroundColor: colors.surfaceSubtleAlpha50,
  },
  container3: {
    borderColor: colors.borderAlpha55,
    backgroundColor: colors.surfaceSubtleAlpha35,
  },
  container4: {
    borderColor: colors.borderAlpha35,
    backgroundColor: colors.surfaceSubtleAlpha20,
  },
  divider1: {
    borderColor: colors.border,
  },
  divider2: {
    borderColor: colors.borderAlpha70,
  },
  divider3: {
    borderColor: colors.borderAlpha50,
  },
  divider4: {
    borderColor: colors.borderAlpha30,
  },
});
