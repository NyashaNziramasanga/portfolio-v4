import { Boxes } from "lucide-react";
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

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex w-full items-center gap-2.5 rounded-lg border border-brand-500 bg-brand-700 px-3 py-2 text-left text-sm text-brand-100 transition-all hover:bg-brand-600",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900",
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
    </button>
  );
}
