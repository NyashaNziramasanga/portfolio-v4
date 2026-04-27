import { useEffect, useMemo, useState } from "react";
import categoriesData from "@/tools/mobile-app-stack-picker/data/categories.json";
import { StackPickerHeader } from "@/tools/mobile-app-stack-picker/components/StackPickerHeader";
import { CategoryColumn } from "@/tools/mobile-app-stack-picker/components/CategoryColumn";
import { StackBottomBar } from "@/tools/mobile-app-stack-picker/components/StackBottomBar";
import { useStackPicker } from "@/tools/mobile-app-stack-picker/hooks/useStackPicker";
import type { StackCategory } from "@/tools/types";

const categories = categoriesData as StackCategory[];

const TIER_ORDER = [1, 2, 3, 4] as const;

const tierMeta: Record<number, { label: string; subtitle: string }> = {
  1: { label: "Must-have", subtitle: "the load-bearing layers" },
  2: { label: "Strongly recommended", subtitle: "production-grade essentials" },
  3: { label: "Common", subtitle: "depends on the app" },
  4: { label: "Niche", subtitle: "only if you need them" },
};

export function MobileAppStackPicker() {
  const {
    selectionByCategory,
    selectedEntries,
    select,
    reset,
    buildPrompt,
    buildShareUrl,
  } = useStackPicker(categories);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");
  const [shareStatus, setShareStatus] = useState<"idle" | "copied" | "error">("idle");

  const categoriesByTier = useMemo(() => {
    const groups: Record<number, StackCategory[]> = { 1: [], 2: [], 3: [], 4: [] };
    for (const category of categories) {
      const tier = category.tier ?? 1;
      (groups[tier] ?? (groups[tier] = [])).push(category);
    }
    return groups;
  }, []);

  useEffect(() => {
    if (copyStatus === "idle") return;
    const timeoutId = window.setTimeout(() => setCopyStatus("idle"), 1800);
    return () => window.clearTimeout(timeoutId);
  }, [copyStatus]);

  useEffect(() => {
    if (shareStatus === "idle") return;
    const timeoutId = window.setTimeout(() => setShareStatus("idle"), 1800);
    return () => window.clearTimeout(timeoutId);
  }, [shareStatus]);

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(buildPrompt());
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(buildShareUrl());
      setShareStatus("copied");
    } catch {
      setShareStatus("error");
    }
  };

  const handleReset = () => {
    reset();
    setCopyStatus("idle");
    setShareStatus("idle");
  };

  return (
    <div className="pb-28">
      <StackPickerHeader />

      <div className="space-y-10">
        {TIER_ORDER.map((tier) => {
          const tierCategories = categoriesByTier[tier];
          if (!tierCategories || tierCategories.length === 0) return null;
          const meta = tierMeta[tier];

          return (
            <section key={tier} aria-labelledby={`tier-${tier}-heading`}>
              <header className="mb-4 flex items-baseline justify-between gap-3 border-b border-brand-700 pb-2">
                <div className="flex items-baseline gap-3">
                  <h3
                    id={`tier-${tier}-heading`}
                    className="text-sm font-bold text-brand-50 sm:text-base"
                  >
                    {meta.label}
                  </h3>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-400">
                    {meta.subtitle}
                  </p>
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-500">
                  {tierCategories.length} {tierCategories.length === 1 ? "layer" : "layers"}
                </span>
              </header>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {tierCategories.map((category) => (
                  <CategoryColumn
                    key={category.id}
                    category={category}
                    selectedItemId={selectionByCategory[category.id] ?? null}
                    onSelect={(itemId) => select(category.id, itemId)}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <StackBottomBar
        entries={selectedEntries}
        onReset={handleReset}
        onCopyPrompt={handleCopyPrompt}
        onShare={handleShare}
        copyStatus={copyStatus}
        shareStatus={shareStatus}
      />
    </div>
  );
}
