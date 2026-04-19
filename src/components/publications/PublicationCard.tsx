import { cn, handleToggleKeyDown } from "@/lib/utils";
import { CollapsiblePanel } from "@/components/ui/collapsible-panel";
import { MediaBadge } from "@/components/ui/media-badge";
import { ArticlePreview } from "@/components/ui/article-preview";
import { PlatformIcon } from "./PlatformIcon";
import { VideoEmbed } from "./VideoEmbed";
import type { Publication } from "./types";

type PublicationCardProps = {
  publication: Publication;
  isExpanded: boolean;
  onToggle: () => void;
  onEnter: () => void;
  onLeave: () => void;
  onFocus: () => void;
  onBlur: () => void;
};

export function PublicationCard({
  publication,
  isExpanded,
  onToggle,
  onEnter,
  onLeave,
  onFocus,
  onBlur,
}: PublicationCardProps) {
  const hasMedia = !!publication.media?.type;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={hasMedia ? isExpanded : undefined}
      onClick={onToggle}
      onKeyDown={(e) => handleToggleKeyDown(e, onToggle)}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      className={cn(
        "cursor-pointer rounded-xl bg-brand-700 px-4 py-4 text-brand-50 shadow-sm outline-none transition-all duration-300 ease-out sm:rounded-2xl sm:px-6 sm:py-5",
        "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900",
        isExpanded && "bg-brand-600 shadow-lg ring-1 ring-primary/30",
      )}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <PlatformIcon platform={publication.platform} />
        <span className="min-w-0 flex-1 text-[13px] font-semibold leading-snug sm:text-base">
          {publication.title}
        </span>
        {hasMedia && (
          <MediaBadge
            type={publication.media!.type}
            expanded={isExpanded}
            className="shrink-0"
          />
        )}
      </div>

      {hasMedia && (
        <CollapsiblePanel open={isExpanded}>
          {isExpanded &&
            (publication.media?.type === "video" ? (
              <VideoEmbed src={publication.media.src} title={publication.title} />
            ) : (
              <ArticlePreview
                href={publication.media!.link!}
                imageSrc={publication.media!.src}
                imageAlt={publication.title}
                onClick={(e) => e.stopPropagation()}
              />
            ))}
        </CollapsiblePanel>
      )}
    </div>
  );
}
