import { useCallback, useEffect, useMemo, useState } from "react";
import type { SelectedStackEntry, StackCategory, StackSelection } from "@/tools/types";

const STORAGE_KEY = "stack-picker-v1";

function readHashSelections(): StackSelection {
  if (typeof window === "undefined") return {};
  const hash = window.location.hash.replace(/^#/, "");
  if (!hash) return {};
  try {
    const params = new URLSearchParams(hash);
    const result: StackSelection = {};
    params.forEach((value, key) => {
      if (value) result[key] = value;
    });
    return result;
  } catch {
    return {};
  }
}

function readStorageSelections(): StackSelection {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StackSelection) : {};
  } catch {
    return {};
  }
}

function validate(
  selections: StackSelection,
  categories: StackCategory[],
): StackSelection {
  const result: StackSelection = {};
  for (const category of categories) {
    const itemId = selections[category.id];
    if (typeof itemId !== "string") continue;
    if (category.items.some((item) => item.id === itemId)) {
      result[category.id] = itemId;
    }
  }
  return result;
}

function serializeToHash(selections: StackSelection): string {
  const cleaned = Object.entries(selections).filter(
    ([, value]) => typeof value === "string" && value.length > 0,
  ) as [string, string][];
  if (cleaned.length === 0) return "";
  return new URLSearchParams(cleaned).toString();
}

export function useStackPicker(categories: StackCategory[]) {
  const [selectionByCategory, setSelectionByCategory] = useState<StackSelection>(
    () => {
      const fromHash = readHashSelections();
      if (Object.keys(fromHash).length > 0) return validate(fromHash, categories);
      return validate(readStorageSelections(), categories);
    },
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(selectionByCategory));
    } catch {
      // ignore quota / privacy mode errors
    }

    const hash = serializeToHash(selectionByCategory);
    const nextUrl = hash
      ? `${window.location.pathname}${window.location.search}#${hash}`
      : `${window.location.pathname}${window.location.search}`;
    if (nextUrl !== window.location.pathname + window.location.search + window.location.hash) {
      window.history.replaceState(null, "", nextUrl);
    }
  }, [selectionByCategory]);

  const select = useCallback((categoryId: string, itemId: string) => {
    setSelectionByCategory((current) => {
      const selectedItemId = current[categoryId];
      const nextItemId = selectedItemId === itemId ? null : itemId;
      const next = { ...current, [categoryId]: nextItemId };
      if (next[categoryId] === null) delete next[categoryId];
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setSelectionByCategory({});
  }, []);

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

  const buildPrompt = useCallback(() => {
    if (!selectedEntries.length) return "No stack selections yet.";

    const layers = selectedEntries
      .map((entry) => `${entry.categoryLabel}: ${entry.itemLabel}`)
      .join("\n- ");

    return `Build a production-ready mobile app with the following stack:\n- ${layers}`;
  }, [selectedEntries]);

  const buildShareUrl = useCallback(() => {
    if (typeof window === "undefined") return "";
    const hash = serializeToHash(selectionByCategory);
    const base = `${window.location.origin}${window.location.pathname}${window.location.search}`;
    return hash ? `${base}#${hash}` : base;
  }, [selectionByCategory]);

  return {
    selectionByCategory,
    selectedEntries,
    select,
    reset,
    buildPrompt,
    buildShareUrl,
  };
}
