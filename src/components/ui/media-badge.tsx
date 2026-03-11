import { cn } from "@/lib/utils";
import { Play, FileText, Image } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type MediaType = "video" | "article" | "image" | "gif";

const MEDIA_CONFIG: Record<MediaType, { icon: LucideIcon; label: string; classes: string }> = {
  video:   { icon: Play,     label: "Video",   classes: "bg-blue-800/40 text-blue-300" },
  article: { icon: FileText, label: "Article", classes: "bg-amber-900/40 text-amber-400" },
  image:   { icon: Image,    label: "Image",   classes: "bg-emerald-900/40 text-emerald-400" },
  gif:     { icon: Image,    label: "GIF",     classes: "bg-violet-900/40 text-violet-400" },
};

export function MediaBadge({
  type,
  expanded,
  className,
}: {
  type: MediaType;
  expanded: boolean;
  className?: string;
}) {
  const config = MEDIA_CONFIG[type];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full p-1.5 text-xs font-medium transition-all duration-200",
        config.classes,
        className,
      )}
    >
      <Icon className="h-3 w-3 shrink-0" />
      <span
        className={cn(
          "overflow-hidden whitespace-nowrap transition-all duration-200",
          expanded ? "ml-1 max-w-[60px] opacity-100" : "ml-0 max-w-0 opacity-0",
        )}
      >
        {config.label}
      </span>
    </span>
  );
}
