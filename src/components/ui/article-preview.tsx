import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export function ArticlePreview({
  href,
  imageSrc,
  imageAlt,
  onClick,
  className,
  cardClassName,
}: {
  href: string;
  imageSrc: string;
  imageAlt: string;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  cardClassName?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("group/article block py-4", className)}
      onClick={onClick}
    >
      <div className={cn("overflow-hidden rounded-xl border border-brand-500 bg-brand-700 shadow-sm transition-shadow group-hover/article:shadow-md", cardClassName)}>
        <img
          src={imageSrc}
          alt={imageAlt}
          loading="lazy"
          decoding="async"
          width={640}
          height={360}
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
