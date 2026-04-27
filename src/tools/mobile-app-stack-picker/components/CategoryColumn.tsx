import { StackItem } from "@/tools/mobile-app-stack-picker/components/StackItem";
import type { StackCategory } from "@/tools/types";

type CategoryColumnProps = {
  category: StackCategory;
  selectedItemId: string | null;
  onSelect: (itemId: string) => void;
};

export function CategoryColumn({
  category,
  selectedItemId,
  onSelect,
}: CategoryColumnProps) {
  return (
    <section className="rounded-xl border border-brand-500 bg-brand-800/70 p-4 sm:p-5">
      <div className="mb-3 border-b border-brand-500 pb-2.5">
        <h3 className="text-base font-semibold text-brand-50">{category.title}</h3>
        <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-400">
          {category.subtitle}
        </p>
      </div>

      <div className="space-y-2">
        {category.items.map((item) => (
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
