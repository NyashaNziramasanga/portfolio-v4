import { useState, useRef, useCallback, useEffect, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";
import { Play, FileText, ExternalLink } from "lucide-react";
import publicationsData from "@/data/publications.json";

type Publication = (typeof publicationsData)[number] & {
  media?: {
    type: "video" | "article";
    src: string;
    link?: string;
  };
};

type Platform = Publication["platform"];

function handleToggleKeyDown(e: KeyboardEvent, toggle: () => void) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    toggle();
  }
}

function PlatformIcon({ platform }: { platform: Platform }) {
  if (platform === "youtube") {
    return (
      <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#FF0000] sm:h-10 sm:w-10">
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-white sm:h-5 sm:w-5" aria-hidden>
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
    <div className="py-3">
      <div className="overflow-hidden rounded-xl">
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

function ArticlePreview({ pub }: { pub: Publication }) {
  return (
    <a
      href={pub.media?.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group/article block py-3"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="overflow-hidden rounded-xl border border-brand-500 bg-brand-700 shadow-sm transition-shadow group-hover/article:shadow-md">
        <img
          src={pub.media?.src}
          alt={pub.title}
          loading="lazy"
          className="aspect-video w-full object-cover"
        />
        <div className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-blue-300">
          <ExternalLink className="h-3 w-3" />
          Read article
        </div>
      </div>
    </a>
  );
}

export function PublicationsList() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const collapseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (collapseTimerRef.current) clearTimeout(collapseTimerRef.current);
    };
  }, []);

  const toggleCard = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  const handleEnter = useCallback((id: string) => {
    if (collapseTimerRef.current) {
      clearTimeout(collapseTimerRef.current);
      collapseTimerRef.current = null;
    }
    setExpandedId(id);
  }, []);

  const handleLeave = useCallback(() => {
    collapseTimerRef.current = setTimeout(() => {
      setExpandedId(null);
    }, 300);
  }, []);

  const handleFocus = useCallback((id: string) => {
    if (collapseTimerRef.current) {
      clearTimeout(collapseTimerRef.current);
      collapseTimerRef.current = null;
    }
    setExpandedId(id);
  }, []);

  const handleBlur = useCallback(() => {
    collapseTimerRef.current = setTimeout(() => {
      setExpandedId(null);
    }, 200);
  }, []);

  return (
    <div className="flex min-h-full flex-1 flex-col px-4 py-8 sm:px-8 sm:py-12">
      <h2 className="mb-6 text-xl font-bold text-brand-50 sm:mb-8 sm:text-2xl">Publications</h2>
      <div className="flex flex-col gap-3">
        {(publicationsData as Publication[]).map((pub) => {
          const hasMedia = !!pub.media;
          const isExpanded = expandedId === pub.id;

          return (
            <div
              key={pub.id}
              role="button"
              tabIndex={0}
              aria-expanded={hasMedia ? isExpanded : undefined}
              onClick={() => toggleCard(pub.id)}
              onKeyDown={(e) => handleToggleKeyDown(e, () => toggleCard(pub.id))}
              onMouseEnter={() => handleEnter(pub.id)}
              onMouseLeave={handleLeave}
              onFocus={() => handleFocus(pub.id)}
              onBlur={handleBlur}
              className={cn(
                "cursor-pointer rounded-2xl bg-brand-700 px-3 py-2.5 text-brand-50 shadow-sm outline-none transition-all duration-300 ease-out sm:rounded-2xl sm:px-4 sm:py-3",
                "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900",
                isExpanded && "bg-brand-600 shadow-lg ring-1 ring-blue-500/30",
              )}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <PlatformIcon platform={pub.platform} />
                <span className="min-w-0 flex-1 text-sm font-medium sm:text-base">{pub.title}</span>
                {hasMedia && (
                  <span
                    className={cn(
                      "inline-flex shrink-0 items-center rounded-full p-1.5 text-xs font-medium transition-all duration-200",
                      pub.media!.type === "video"
                        ? "bg-blue-800/40 text-blue-300"
                        : "bg-amber-900/40 text-amber-400",
                    )}
                  >
                    {pub.media!.type === "video" ? (
                      <Play className="h-3 w-3 shrink-0" />
                    ) : (
                      <FileText className="h-3 w-3 shrink-0" />
                    )}
                    <span
                      className={cn(
                        "overflow-hidden whitespace-nowrap transition-all duration-200",
                        isExpanded ? "ml-1 max-w-[60px] opacity-100" : "ml-0 max-w-0 opacity-0",
                      )}
                    >
                      {pub.media!.type === "video" ? "Video" : "Article"}
                    </span>
                  </span>
                )}
              </div>

              {hasMedia && (
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-out",
                    isExpanded
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    {isExpanded && (
                      pub.media?.type === "video" ? (
                        <VideoEmbed src={pub.media.src} title={pub.title} />
                      ) : (
                        <ArticlePreview pub={pub} />
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
