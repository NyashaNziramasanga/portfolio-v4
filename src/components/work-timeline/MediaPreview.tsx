import { ExternalLink } from "lucide-react";
import type { Project } from "./types";

export function MediaPreview({ project }: { project: Project }) {
  if (!project.media) return null;

  if (project.media.type === "article") {
    return (
      <a
        href={project.media.link!}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="group/article block w-full max-w-sm"
      >
        <div className="animate-float overflow-hidden rounded-xl border border-brand-500 bg-brand-700 shadow-lg shadow-black/25 transition-shadow group-hover/article:shadow-xl group-hover/article:shadow-black/30">
          <img
            src={project.media.src}
            alt={project.name}
            loading="lazy"
            className="aspect-video w-full object-cover"
          />
          <div className="flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium text-blue-300">
            <ExternalLink className="h-3 w-3" />
            Read article
          </div>
        </div>
      </a>
    );
  }

  if (project.media.type === "video") {
    return (
      <video
        key={project.media.src}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        className="aspect-[9/19.5] max-h-[280px] rounded-2xl object-cover shadow-lg shadow-black/30 sm:max-h-[400px]"
      >
        <source src={project.media.src} type="video/webm" />
        <source src={project.media.src.replace(".webm", ".mp4")} type="video/mp4" />
      </video>
    );
  }

  return (
    <img
      src={project.media.src}
      alt={project.name}
      loading="lazy"
      className="animate-float aspect-[9/19.5] max-h-[280px] rounded-2xl object-cover shadow-lg shadow-black/30 sm:max-h-[400px]"
    />
  );
}
