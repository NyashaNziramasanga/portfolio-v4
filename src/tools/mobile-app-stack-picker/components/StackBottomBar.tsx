import { Button } from "@/components/ui/button";
import { Boxes } from "lucide-react";
import { SimpleIconSvg } from "@/components/SimpleIconSvg";
import { getSimpleIcon } from "@/tools/mobile-app-stack-picker/simpleIcons";
import type { SelectedStackEntry } from "@/tools/types";

type StackBottomBarProps = {
  entries: SelectedStackEntry[];
  onReset: () => void;
  onCopyPrompt: () => void;
  copyStatus: "idle" | "copied" | "error";
};

export function StackBottomBar({
  entries,
  onReset,
  onCopyPrompt,
  copyStatus,
}: StackBottomBarProps) {
  const hasSelections = entries.length > 0;

  return (
    <aside className="sticky bottom-0 z-10 mt-6 rounded-t-xl border border-b-0 border-brand-500 bg-brand-900/95 p-3 shadow-2xl backdrop-blur sm:mt-8 sm:p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-300">Your stack</p>
          {hasSelections ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {entries.map((entry) => {
                const icon = getSimpleIcon(entry.iconKey);
                const iconColor = icon ? `#${icon.hex}` : undefined;

                return (
                  <span
                    key={entry.categoryId}
                    className="inline-flex items-center gap-2 rounded-lg border border-brand-500 bg-brand-700 px-3 py-1.5 text-sm text-brand-100"
                    title={`${entry.categoryLabel}: ${entry.itemLabel}`}
                  >
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-sm bg-brand-900/60">
                      {icon ? (
                        <SimpleIconSvg
                          icon={icon}
                          className="h-3 w-3"
                          aria-label={entry.itemLabel}
                          style={{ color: iconColor }}
                        />
                      ) : (
                        <Boxes className="h-3 w-3 text-brand-300" aria-hidden />
                      )}
                    </span>
                    <span className="truncate">{entry.itemLabel}</span>
                  </span>
                );
              })}
            </div>
          ) : (
            <p className="mt-1 text-sm text-brand-400 sm:text-base">
              Nothing picked yet - start clicking.
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button
            type="button"
            variant="ghost"
            className="border border-brand-500 bg-brand-800 text-brand-100 hover:bg-brand-700"
            onClick={onReset}
            disabled={!hasSelections}
          >
            Reset
          </Button>
          <Button type="button" onClick={onCopyPrompt} disabled={!hasSelections}>
            {copyStatus === "copied"
              ? "Copied"
              : copyStatus === "error"
                ? "Copy failed"
                : "Copy prompt"}
          </Button>
        </div>
      </div>
    </aside>
  );
}
