import { ExternalLink } from "lucide-react";

export function ArticlePreview({
  href,
  imageSrc,
  imageAlt,
  onClick,
}: {
  href: string;
  imageSrc: string;
  imageAlt: string;
  onClick?: (e: React.MouseEvent) => void;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/article block py-4"
      onClick={onClick}
    >
      <div className="overflow-hidden rounded-xl border border-brand-500 bg-brand-700 shadow-sm transition-shadow group-hover/article:shadow-md">
        <img
          src={imageSrc}
          alt={imageAlt}
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
