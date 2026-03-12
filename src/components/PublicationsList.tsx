import { cn, handleToggleKeyDown } from "@/lib/utils";
import { useExpandCollapse } from "@/hooks/useExpandCollapse";
import { CollapsiblePanel } from "@/components/ui/collapsible-panel";
import { MediaBadge } from "@/components/ui/media-badge";
import { ArticlePreview } from "@/components/ui/article-preview";
import publicationsData from "@/data/publications.json";

type Publication = (typeof publicationsData)[number] & {
  media?: {
    type: "video" | "article";
    src: string;
    link?: string;
  };
};

type Platform = Publication["platform"];

function PlatformIcon({ platform }: { platform: Platform }) {
  if (platform === "youtube") {
    return (
      <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#FF0000] sm:h-10 sm:w-10">
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 text-white sm:h-5 sm:w-5"
          aria-hidden
        >
          <path fill="currentColor" d="M8 5v14l11-7z" />
        </svg>
      </div>
    );
  }
  if (platform === "medium") {
    return (
      <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md bg-black sm:h-10 sm:w-10">
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 text-white sm:h-5 sm:w-5"
          fill="currentColor"
          aria-hidden
        >
          <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
        </svg>
      </div>
    );
  }
  if (platform === "devto") {
    return (
      <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md bg-black sm:h-10 sm:w-10">
        <span
          className="text-center text-[10px] font-bold uppercase leading-none text-white sm:text-xs"
          aria-hidden
        >
          DEV
        </span>
      </div>
    );
  }
  return null;
}

function VideoEmbed({ src, title }: { src: string; title: string }) {
  return (
    <div className="py-3 sm:py-4">
      <div className="overflow-hidden rounded-lg sm:rounded-xl">
        <iframe
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="aspect-video w-full"
        />
      </div>
    </div>
  );
}

export function PublicationsList() {
  const { expandedId, toggle, handleEnter, handleLeave, handleFocus, handleBlur } =
    useExpandCollapse();

  return (
    <div className="flex w-full max-w-3xl flex-col">
      <h2 className="mb-8 text-xl font-bold text-brand-50 sm:mb-10 sm:text-2xl">
        Publications
      </h2>
      <div className="flex flex-col gap-4">
        {(publicationsData as Publication[]).map((pub) => {
          const hasMedia = !!pub.media?.type;
          const isExpanded = expandedId === pub.id;

          return (
            <div
              key={pub.id}
              role="button"
              tabIndex={0}
              aria-expanded={hasMedia ? isExpanded : undefined}
              onClick={() => toggle(pub.id)}
              onKeyDown={(e) => handleToggleKeyDown(e, () => toggle(pub.id))}
              onMouseEnter={() => handleEnter(pub.id)}
              onMouseLeave={handleLeave}
              onFocus={() => handleFocus(pub.id)}
              onBlur={handleBlur}
              className={cn(
                "cursor-pointer rounded-xl bg-brand-700 px-4 py-4 text-brand-50 shadow-sm outline-none transition-all duration-300 ease-out sm:rounded-2xl sm:px-6 sm:py-5",
                "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900",
                isExpanded && "bg-brand-600 shadow-lg ring-1 ring-primary/30",
              )}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <PlatformIcon platform={pub.platform} />
                <span className="min-w-0 flex-1 text-[13px] font-semibold leading-snug sm:text-base">
                  {pub.title}
                </span>
                {hasMedia && (
                  <MediaBadge
                    type={pub.media!.type}
                    expanded={isExpanded}
                    className="shrink-0"
                  />
                )}
              </div>

              {hasMedia && (
                <CollapsiblePanel open={isExpanded}>
                  {isExpanded &&
                    (pub.media?.type === "video" ? (
                      <VideoEmbed src={pub.media.src} title={pub.title} />
                    ) : (
                      <ArticlePreview
                        href={pub.media!.link!}
                        imageSrc={pub.media!.src}
                        imageAlt={pub.title}
                        onClick={(e) => e.stopPropagation()}
                      />
                    ))}
                </CollapsiblePanel>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
