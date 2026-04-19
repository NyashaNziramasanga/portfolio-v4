export function VideoEmbed({ src, title }: { src: string; title: string }) {
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
