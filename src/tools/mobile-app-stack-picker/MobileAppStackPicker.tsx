import { useEffect, useState } from "react";
import categoriesData from "@/tools/mobile-app-stack-picker/data/categories.json";
import { StackPickerHeader } from "@/tools/mobile-app-stack-picker/components/StackPickerHeader";
import { CategoryColumn } from "@/tools/mobile-app-stack-picker/components/CategoryColumn";
import { StackBottomBar } from "@/tools/mobile-app-stack-picker/components/StackBottomBar";
import { useStackPicker } from "@/tools/mobile-app-stack-picker/hooks/useStackPicker";
import type { StackCategory } from "@/tools/types";

const categories = categoriesData as StackCategory[];

export function MobileAppStackPicker() {
  const { selectionByCategory, selectedEntries, select, reset, buildPrompt } =
    useStackPicker(categories);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");

  useEffect(() => {
    if (copyStatus === "idle") return;
    const timeoutId = window.setTimeout(() => setCopyStatus("idle"), 1800);
    return () => window.clearTimeout(timeoutId);
  }, [copyStatus]);

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(buildPrompt());
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
  };

  const handleReset = () => {
    reset();
    setCopyStatus("idle");
  };

  return (
    <div className="pb-28">
      <StackPickerHeader />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {categories.map((category) => (
          <CategoryColumn
            key={category.id}
            category={category}
            selectedItemId={selectionByCategory[category.id] ?? null}
            onSelect={(itemId) => select(category.id, itemId)}
          />
        ))}
      </div>

      <StackBottomBar
        entries={selectedEntries}
        onReset={handleReset}
        onCopyPrompt={handleCopyPrompt}
        copyStatus={copyStatus}
      />
    </div>
  );
}
