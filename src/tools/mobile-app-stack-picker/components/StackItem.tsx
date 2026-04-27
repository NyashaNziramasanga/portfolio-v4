import { Boxes, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { SimpleIconSvg } from "@/components/SimpleIconSvg";
import { getSimpleIcon } from "@/tools/mobile-app-stack-picker/simpleIcons";
import type { StackItem as StackItemType } from "@/tools/types";

type StackItemProps = {
  item: StackItemType;
  selected: boolean;
  onSelect: () => void;
};

export function StackItem({ item, selected, onSelect }: StackItemProps) {
  const icon = getSimpleIcon(item.iconKey);
  const iconColor = icon ? `#${icon.hex}` : undefined;
  const isPick = "pick" in item && item.pick === true;
  const pickReason =
    "pickReason" in item && typeof item.pickReason === "string"
      ? item.pickReason
      : undefined;
  const tooltipText = pickReason ?? "My pick";
  const hasReason = Boolean(pickReason);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex w-full items-center gap-2.5 rounded-lg border border-brand-500 bg-brand-700 px-3 py-2 text-left text-sm text-brand-100 motion-safe:transition-all hover:bg-brand-600",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900",
        isPick && !selected && "border-l-2 border-l-primary",
        selected && "border-primary bg-brand-600 ring-1 ring-primary/70",
      )}
      aria-pressed={selected}
    >
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-brand-900/60">
        {icon ? (
          <SimpleIconSvg
            icon={icon}
            className="h-3.5 w-3.5"
            aria-label={item.label}
            style={{ color: iconColor }}
          />
        ) : (
          <Boxes className="h-3.5 w-3.5 text-brand-300" />
        )}
      </span>
      <span className="truncate">{item.label}</span>
      {isPick && (
        <span
          className="group/pick relative ml-auto flex shrink-0 items-center"
          aria-label={tooltipText}
        >
          <Star
            className={cn(
              "h-3.5 w-3.5 text-primary",
              selected ? "fill-primary/80" : "fill-primary",
            )}
            aria-hidden
          />
          <span
            className={cn(
              "pointer-events-none absolute bottom-full right-0 z-10 mb-1.5 rounded-md border border-brand-500 bg-brand-900 px-2 py-1 text-[10px] font-medium text-brand-50 shadow-lg",
              "opacity-0 motion-safe:transition-opacity motion-safe:duration-150",
              "group-hover/pick:opacity-100",
              hasReason ? "w-56 text-left leading-snug" : "whitespace-nowrap",
            )}
          >
            {hasReason && (
              <span className="mb-1 block text-[9px] font-semibold uppercase tracking-wider text-primary">
                Why I pick it
              </span>
            )}
            {tooltipText}
          </span>
        </span>
      )}
    </button>
  );
}
