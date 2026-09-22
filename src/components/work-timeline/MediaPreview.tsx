import { useState } from "react";
import { Play } from "lucide-react";
import * as stylex from "@stylexjs/stylex";
import { ArticlePreview } from "@/components/ui/article-preview";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { Project } from "./types";
import { colors } from "../../styles/Colors.stylex";
import { spacing } from "../../styles/Spacing.stylex";
import { radii } from "../../styles/BorderRadius.stylex";
import { motion } from "../../styles/Motion.stylex";
import { breakpoints } from "../../styles/Breakpoints.stylex";
import { shadows } from "../../styles/Shadows.stylex";

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
        style={styles.article}
        cardStyle={styles.articleCard}
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
          {...stylex.props(styles.videoButton, stylex.defaultMarker())}
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
            {...stylex.props(styles.poster)}
          />
          <span {...stylex.props(styles.overlay)}>
            <span {...stylex.props(styles.playCircle)}>
              <Play {...stylex.props(styles.playIcon)} aria-hidden="true" />
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
        {...stylex.props(styles.media)}
      >
        <source src={project.media.src} type="video/webm" />
        <source
          src={project.media.src.replace(".webm", ".mp4")}
          type="video/mp4"
        />
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
      {...stylex.props(styles.media, styles.image, styles.floating)}
    />
  );
}

const float = stylex.keyframes({
  "0%, 100%": {
    transform: "translateY(0)",
  },
  "50%": {
    transform: "translateY(-6px)",
  },
});

const styles = stylex.create({
  article: {
    width: "100%",
    maxWidth: 384,
    paddingBlock: 0,
  },
  articleCard: {
    boxShadow: {
      default: shadows.media,
      [stylex.when.ancestor(":hover")]: shadows.mediaHover,
    },
    animationName: {
      default: null,
      [motion.allow]: float,
    },
    animationDuration: motion.floatDuration,
    animationTimingFunction: motion.easeInOut,
    animationIterationCount: "infinite",
  },
  videoButton: {
    position: "relative",
    aspectRatio: "9 / 19.5",
    maxHeight: {
      default: 280,
      [breakpoints.sm]: 400,
    },
    overflow: "hidden",
    borderRadius: radii.xl,
    boxShadow: shadows.mediaStrong,
    outline: "none",
  },
  poster: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    transform: {
      default: "scale(1)",
      [stylex.when.ancestor(":hover")]: "scale(1.02)",
    },
    transitionProperty: {
      default: "transform",
      [motion.reduce]: "none",
    },
    transitionDuration: motion.slow,
  },
  overlay: {
    position: "absolute",
    inset: 0,
    display: "grid",
    placeItems: "center",
    backgroundColor: {
      default: colors.mediaOverlay20,
      [stylex.when.ancestor(":hover")]: colors.mediaOverlay30,
    },
    transitionProperty: "background-color",
  },
  playCircle: {
    display: "grid",
    height: 48,
    width: 48,
    placeItems: "center",
    borderRadius: radii.circle,
    backgroundColor: colors.mediaControl,
    color: colors.background,
    boxShadow: shadows.tooltip,
    transform: {
      default: "scale(1)",
      [stylex.when.ancestor(":hover")]: "scale(1.05)",
    },
    transitionProperty: {
      default: "transform",
      [motion.reduce]: "none",
    },
  },
  playIcon: {
    marginLeft: spacing.xxs,
    width: 20,
    height: 20,
    fill: "currentColor",
  },
  media: {
    aspectRatio: "9 / 19.5",
    maxHeight: {
      default: 280,
      [breakpoints.sm]: 400,
    },
    borderRadius: radii.xl,
    objectFit: "cover",
    boxShadow: shadows.mediaStrong,
  },
  image: {
    aspectRatio: "auto",
    width: "auto",
    height: "auto",
    maxWidth: "100%",
    objectFit: "contain",
  },
  floating: {
    animationName: {
      default: null,
      [motion.allow]: float,
    },
    animationDuration: motion.floatDuration,
    animationTimingFunction: motion.easeInOut,
    animationIterationCount: "infinite",
  },
});
