import { cn } from "@/lib/utils";
import { StackItem } from "@/tools/mobile-app-stack-picker/components/StackItem";
import type { StackCategory, StackItem as StackItemType } from "@/tools/types";

type CategoryColumnProps = {
  category: StackCategory;
  selectedItemId: string | null;
  onSelect: (itemId: string) => void;
};

const tierContainerClass: Record<number, string> = {
  1: "border-brand-500 bg-brand-800/70",
  2: "border-brand-500/75 bg-brand-800/50",
  3: "border-brand-500/55 bg-brand-800/35",
  4: "border-brand-500/35 bg-brand-800/20",
};

const tierDividerClass: Record<number, string> = {
  1: "border-brand-500",
  2: "border-brand-500/70",
  3: "border-brand-500/50",
  4: "border-brand-500/30",
};

const isPick = (item: StackItemType) => "pick" in item && item.pick === true;

export function CategoryColumn({
  category,
  selectedItemId,
  onSelect,
}: CategoryColumnProps) {
  const tier = category.tier ?? 1;
  const containerClass = tierContainerClass[tier] ?? tierContainerClass[1];
  const dividerClass = tierDividerClass[tier] ?? tierDividerClass[1];

  const sortedItems = [...category.items].sort((a, b) => {
    const aPick = isPick(a) ? 1 : 0;
    const bPick = isPick(b) ? 1 : 0;
    return bPick - aPick;
  });
  const pickCount = category.items.reduce(
    (sum, item) => sum + (isPick(item) ? 1 : 0),
    0,
  );

  return (
    <section
      className={cn("rounded-xl border p-4 sm:p-5 transition-colors", containerClass)}
      data-tier={tier}
    >
      <div className={cn("mb-3 border-b pb-2.5", dividerClass)}>
        <h3 className="text-base font-semibold text-brand-50">{category.title}</h3>
        <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-400">
          {category.subtitle}
          {pickCount > 0 && (
            <span className="ml-1 normal-case tracking-normal text-primary">
              · {pickCount} {pickCount === 1 ? "pick" : "picks"}
            </span>
          )}
        </p>
      </div>

      <div className="space-y-2">
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
