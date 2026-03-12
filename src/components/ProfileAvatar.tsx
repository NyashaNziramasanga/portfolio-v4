import { useRef } from "react";
import { cn } from "@/lib/utils";

export function ProfileAvatar({
  size,
  ringSize,
  className,
}: {
  size: string;
  ringSize: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div
      className={cn("relative overflow-hidden rounded-full", size, ringSize, "ring-brand-400", className)}
      onMouseEnter={() => videoRef.current?.play()}
      onMouseLeave={() => {
        const v = videoRef.current;
        if (v) {
          v.pause();
          v.currentTime = 0;
        }
      }}
    >
      <img
        src="/logos/profile-160.webp"
        srcSet="/logos/profile-160.webp 160w, /logos/profile.webp 1048w"
        sizes="80px"
        alt="Nyasha Nziramasanga"
        width={160}
        height={160}
        className="h-full w-full object-cover"
      />
      <video
        ref={videoRef}
        src="/media/nash-beach.webm"
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 hover:opacity-100 peer"
        onPlay={(e) => e.currentTarget.classList.replace("opacity-0", "opacity-100")}
        onPause={(e) => e.currentTarget.classList.replace("opacity-100", "opacity-0")}
      />
    </div>
  );
}
