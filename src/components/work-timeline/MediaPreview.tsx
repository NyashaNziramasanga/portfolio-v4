import { useState } from "react";
import { Play } from "lucide-react";
import { ArticlePreview } from "@/components/ui/article-preview";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { Project } from "./types";

export function MediaPreview({ project }: { project: Project }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isPlaying, setIsPlaying] = useState(false);
  if (!project.media) return null;

  if (project.media.type === "article") {
    return (
      <ArticlePreview
        href={project.media.link!}
        imageSrc={project.media.src}
        imageAlt={project.name}
        className="w-full max-w-sm py-0"
        cardClassName="shadow-lg shadow-black/25 motion-safe:animate-float group-hover/article:shadow-xl group-hover/article:shadow-black/30"
      />
    );
  }

  if (project.media.type === "video") {
    const poster = project.media.src.replace(".webm", "-poster.webp");

    if (!isPlaying) {
      return (
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          className="group/video relative aspect-[9/19.5] max-h-[280px] overflow-hidden rounded-2xl shadow-lg shadow-black/30 outline-none focus-visible:ring-2 focus-visible:ring-primary sm:max-h-[400px]"
          aria-label={`Play ${project.name} demo`}
        >
          <img
            src={poster}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            width={320}
            height={694}
            className="h-full w-full object-cover transition-transform duration-300 group-hover/video:scale-[1.02] motion-reduce:transition-none"
          />
          <span className="absolute inset-0 grid place-items-center bg-black/20 transition-colors group-hover/video:bg-black/30">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-50/95 text-brand-900 shadow-lg transition-transform group-hover/video:scale-105 motion-reduce:transition-none">
              <Play className="ml-0.5 h-5 w-5 fill-current" aria-hidden="true" />
            </span>
          </span>
        </button>
      );
    }

    return (
      <video
        key={project.media.src}
        autoPlay
        loop={!prefersReducedMotion}
        muted
        playsInline
        preload="metadata"
        controls
        poster={poster}
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
      decoding="async"
      width={590}
      height={1280}
      className="aspect-[9/19.5] max-h-[280px] rounded-2xl object-cover shadow-lg shadow-black/30 motion-safe:animate-float sm:max-h-[400px]"
    />
  );
}
