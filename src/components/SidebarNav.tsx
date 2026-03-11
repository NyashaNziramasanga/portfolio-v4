import { User, Briefcase, BookOpen } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import sectionsData from "@/data/sections.json";

const SECTION_ICONS: Record<string, LucideIcon> = {
  about: User,
  experience: Briefcase,
  publications: BookOpen,
};

export function SidebarNav({
  activeSection,
  onSelect,
}: {
  activeSection: string;
  onSelect: (id: string) => void;
}) {
  return (
    <nav aria-label="Page sections" className="flex flex-col gap-0.5">
      {sectionsData.map(({ id, label }) => {
        const Icon = SECTION_ICONS[id];
        return (
          <Button
            key={id}
            variant="ghost"
            aria-current={activeSection === id ? "true" : undefined}
            className={cn(
              "justify-start gap-2.5 text-lg font-medium text-brand-300 transition-[transform,color,background-color,font-weight] duration-300 ease-in-out hover:scale-[1.01] hover:bg-brand-600/60 hover:text-brand-100",
              activeSection === id && "font-semibold text-brand-50",
            )}
            onClick={() => onSelect(id)}
          >
            {Icon && <Icon className="h-4.5 w-4.5 shrink-0" />}
            {label}
          </Button>
        );
      })}
    </nav>
  );
}
