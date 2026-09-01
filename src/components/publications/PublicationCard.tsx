import { ChevronDown } from "lucide-react";
import { track } from "@vercel/analytics/react";
import { cn } from "@/lib/utils";
import { CollapsiblePanel } from "@/components/ui/collapsible-panel";
import { MediaBadge } from "@/components/ui/media-badge";
import { ArticlePreview } from "@/components/ui/article-preview";
import { PlatformIcon } from "./PlatformIcon";
import { VideoEmbed } from "./VideoEmbed";
import type { Publication } from "./types";

export function PublicationCard({ publication, isExpanded, onToggle }: { publication: Publication; isExpanded: boolean; onToggle: () => void }) {
  const hasMedia = Boolean(publication.media?.type);
  const panelId = `publication-panel-${publication.id}`;

  return (
    <article className={cn("rounded-xl bg-brand-700 text-brand-50 shadow-sm transition-all duration-300 motion-reduce:transition-none sm:rounded-2xl", isExpanded && "bg-brand-600 shadow-lg ring-1 ring-primary/30")}>
      <button type="button" aria-expanded={hasMedia ? isExpanded : undefined} aria-controls={hasMedia ? panelId : undefined} onClick={onToggle} className="flex w-full items-center gap-3 rounded-xl px-4 py-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900 sm:gap-4 sm:rounded-2xl sm:px-6 sm:py-5">
        <PlatformIcon platform={publication.platform} />
        <span className="min-w-0 flex-1 text-[13px] font-semibold leading-snug sm:text-base">{publication.title}</span>
        {hasMedia ? <MediaBadge type={publication.media!.type} expanded={isExpanded} className="shrink-0" /> : null}
        <ChevronDown className={cn("h-4 w-4 shrink-0 text-brand-300 transition-transform", isExpanded && "rotate-180")} aria-hidden="true" />
      </button>

      {hasMedia ? (
        <CollapsiblePanel open={isExpanded} id={panelId}>
          <div className="px-4 pb-4 sm:px-6 sm:pb-5">
            {publication.media?.type === "video" ? <VideoEmbed src={publication.media.src} title={publication.title} /> : (
              <ArticlePreview href={publication.url} imageSrc={publication.media!.src} imageAlt={publication.title} onClick={() => track("Publication Evidence Clicked", { publication: publication.id })} />
            )}
          </div>
        </CollapsiblePanel>
      ) : null}
    </article>
  );
}
