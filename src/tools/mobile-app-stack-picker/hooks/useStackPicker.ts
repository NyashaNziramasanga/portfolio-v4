import { useMemo, useState } from "react";
import type { SelectedStackEntry, StackCategory, StackSelection } from "@/tools/types";

export function useStackPicker(categories: StackCategory[]) {
  const [selectionByCategory, setSelectionByCategory] = useState<StackSelection>({});

  const select = (categoryId: string, itemId: string) => {
    setSelectionByCategory((current) => {
      const selectedItemId = current[categoryId];
      const nextItemId = selectedItemId === itemId ? null : itemId;

      return { ...current, [categoryId]: nextItemId };
    });
  };

  const reset = () => {
    setSelectionByCategory({});
  };

  const selectedEntries = useMemo<SelectedStackEntry[]>(() => {
    return categories.flatMap((category) => {
      const selectedItemId = selectionByCategory[category.id];
      if (!selectedItemId) return [];

      const selectedItem = category.items.find((item) => item.id === selectedItemId);
      if (!selectedItem) return [];

      return [
        {
          categoryId: category.id,
          categoryLabel: category.title,
          itemId: selectedItem.id,
          itemLabel: selectedItem.label,
          iconKey: selectedItem.iconKey,
        },
      ];
    });
  }, [categories, selectionByCategory]);

  const buildPrompt = () => {
    if (!selectedEntries.length) return "No stack selections yet.";

    const layers = selectedEntries
      .map((entry) => `${entry.categoryLabel}: ${entry.itemLabel}`)
      .join("\n- ");

    return [
      "Build a production-ready mobile app with the following stack:",
      `- ${layers}`,
      "",
      "Please provide an initial architecture, folder structure, and implementation milestones.",
    ].join("\n");
  };

  return {
    selectionByCategory,
    selectedEntries,
    select,
    reset,
    buildPrompt,
  };
}
