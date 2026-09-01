import { ArticlePreview } from "@/components/ui/article-preview";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { Project } from "./types";

export function MediaPreview({ project }: { project: Project }) {
  const prefersReducedMotion = usePrefersReducedMotion();
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
    return (
      <video
        key={project.media.src}
        autoPlay={!prefersReducedMotion}
        loop
        muted
        playsInline
        preload="none"
        controls={prefersReducedMotion}
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
      className="aspect-[9/19.5] max-h-[280px] rounded-2xl object-cover shadow-lg shadow-black/30 motion-safe:animate-float sm:max-h-[400px]"
    />
  );
}
