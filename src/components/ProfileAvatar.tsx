import { useRef, useState } from "react";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { radii } from "../styles/BorderRadius.stylex";
import { motion } from "../styles/Motion.stylex";
import { shadows } from "../styles/Shadows.stylex";

export function ProfileAvatar({
  size,
  style,
}: {
  size: "mobile" | "desktop";
  style?: StyleXStyles;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div
      {...stylex.props(styles.root, sizeStyles[size], style)}
      onMouseEnter={() => {
        if (!prefersReducedMotion) void videoRef.current?.play();
      }}
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
        {...stylex.props(styles.media)}
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
        {...stylex.props(styles.video, isPlaying && styles.videoPlaying)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  );
}

const styles = stylex.create({
  root: {
    position: "relative",
    overflow: "hidden",
    borderRadius: radii.circle,
    boxShadow: shadows.avatarRing,
  },
  media: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  video: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: 0,
    transitionProperty: "opacity",
    transitionDuration: motion.slow,
    display: {
      default: "block",
      [motion.reduce]: "none",
    },
  },
  videoPlaying: {
    opacity: 1,
  },
});

const sizeStyles = stylex.create({
  mobile: {
    width: 80,
    height: 80,
  },
  desktop: {
    width: 112,
    height: 112,
  },
});
