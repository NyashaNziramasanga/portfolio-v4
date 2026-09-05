import { useEffect, useMemo, useState } from "react";
import * as stylex from "@stylexjs/stylex";
import categoriesData from "@/tools/mobile-app-stack-picker/data/categories.json";
import { StackPickerHeader } from "@/tools/mobile-app-stack-picker/components/StackPickerHeader";
import { CategoryColumn } from "@/tools/mobile-app-stack-picker/components/CategoryColumn";
import { StackBottomBar } from "@/tools/mobile-app-stack-picker/components/StackBottomBar";
import { useStackPicker } from "@/tools/mobile-app-stack-picker/hooks/useStackPicker";
import type { StackCategory } from "@/tools/types";
import { colors, constants } from "../../styles/tokens.stylex";

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
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">(
    "idle",
  );
  const [shareStatus, setShareStatus] = useState<"idle" | "copied" | "error">(
    "idle",
  );

  const categoriesByTier = useMemo(() => {
    const groups: Record<number, StackCategory[]> = {
      1: [],
      2: [],
      3: [],
      4: [],
    };
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
    <div {...stylex.props(styles.root)}>
      <StackPickerHeader />

      <div {...stylex.props(styles.tiers)}>
        {TIER_ORDER.map((tier) => {
          const tierCategories = categoriesByTier[tier];
          if (!tierCategories || tierCategories.length === 0) return null;
          const meta = tierMeta[tier];

          return (
            <section key={tier} aria-labelledby={`tier-${tier}-heading`}>
              <header {...stylex.props(styles.tierHeader)}>
                <div {...stylex.props(styles.tierHeadingGroup)}>
                  <h3
                    id={`tier-${tier}-heading`}
                    {...stylex.props(styles.tierTitle)}
                  >
                    {meta.label}
                  </h3>
                  <p {...stylex.props(styles.tierSubtitle)}>{meta.subtitle}</p>
                </div>
                <span {...stylex.props(styles.tierCount)}>
                  {tierCategories.length}{" "}
                  {tierCategories.length === 1 ? "layer" : "layers"}
                </span>
              </header>

              <div {...stylex.props(styles.categoryGrid)}>
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

const styles = stylex.create({
  root: {
    paddingBottom: 112,
  },
  tiers: {
    display: "flex",
    flexDirection: "column",
    gap: 40,
  },
  tierHeader: {
    marginBottom: 16,
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.brand700,
    paddingBottom: 8,
  },
  tierHeadingGroup: {
    display: "flex",
    alignItems: "baseline",
    gap: 12,
  },
  tierTitle: {
    fontSize: {
      default: 14,
      [constants.sm]: 16,
    },
    fontWeight: 700,
    color: colors.brand50,
  },
  tierSubtitle: {
    fontSize: 10,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.14em",
    color: colors.brand400,
  },
  tierCount: {
    fontSize: 10,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.14em",
    color: colors.brand500,
  },
  categoryGrid: {
    display: "grid",
    gap: 16,
    gridTemplateColumns: {
      "@media (min-width: 768px)": "repeat(2, minmax(0, 1fr))",
      [constants.xl]: "repeat(4, minmax(0, 1fr))",
    },
  },
});
