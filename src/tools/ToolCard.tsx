import { Link } from "@tanstack/react-router";
import { ChevronRight, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ToolListItem } from "@/tools/types";

type ToolCardProps = {
  tool: ToolListItem;
};

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link
      to="/tools/$toolId"
      params={{ toolId: tool.slug }}
      className={cn(
        "group rounded-xl bg-brand-700 px-4 py-4 text-brand-50 shadow-sm transition-all duration-300 ease-out sm:rounded-2xl sm:px-6 sm:py-5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900",
        "hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-lg",
      )}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand-600 text-primary sm:h-10 sm:w-10">
          <Wrench className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold leading-snug text-brand-50 sm:text-base">
            {tool.title}
          </p>
          <p className="mt-1 text-xs text-brand-300 sm:text-sm">{tool.description}</p>
        </div>

        <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-brand-300 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-brand-100 sm:h-5 sm:w-5" />
      </div>
    </Link>
  );
}
