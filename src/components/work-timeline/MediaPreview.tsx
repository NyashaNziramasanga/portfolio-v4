import { useState } from "react";
import { Play } from "lucide-react";
import * as stylex from "@stylexjs/stylex";
import { ArticlePreview } from "@/components/ui/article-preview";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { Project } from "./types";
import { colors, constants } from "../../styles/tokens.stylex";

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
      {...stylex.props(styles.media, styles.floating)}
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
      default:
        "0 10px 15px -3px rgb(0 0 0 / 0.25), 0 4px 6px -4px rgb(0 0 0 / 0.25)",
      [stylex.when.ancestor(":hover")]:
        "0 20px 25px -5px rgb(0 0 0 / 0.3), 0 8px 10px -6px rgb(0 0 0 / 0.3)",
    },
    animationName: {
      default: null,
      [constants.allowMotion]: float,
    },
    animationDuration: "3s",
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "infinite",
  },
  videoButton: {
    position: "relative",
    aspectRatio: "9 / 19.5",
    maxHeight: {
      default: 280,
      [constants.sm]: 400,
    },
    overflow: "hidden",
    borderRadius: 16,
    boxShadow:
      "0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)",
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
      [constants.reduceMotion]: "none",
    },
    transitionDuration: "300ms",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    display: "grid",
    placeItems: "center",
    backgroundColor: {
      default: "rgb(0 0 0 / 0.2)",
      [stylex.when.ancestor(":hover")]: "rgb(0 0 0 / 0.3)",
    },
    transitionProperty: "background-color",
  },
  playCircle: {
    display: "grid",
    height: 48,
    width: 48,
    placeItems: "center",
    borderRadius: "50%",
    backgroundColor: "rgb(237 242 247 / 0.95)",
    color: colors.brand900,
    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
    transform: {
      default: "scale(1)",
      [stylex.when.ancestor(":hover")]: "scale(1.05)",
    },
    transitionProperty: {
      default: "transform",
      [constants.reduceMotion]: "none",
    },
  },
  playIcon: {
    marginLeft: 2,
    width: 20,
    height: 20,
    fill: "currentColor",
  },
  media: {
    aspectRatio: "9 / 19.5",
    maxHeight: {
      default: 280,
      [constants.sm]: 400,
    },
    borderRadius: 16,
    objectFit: "cover",
    boxShadow:
      "0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)",
  },
  floating: {
    animationName: {
      default: null,
      [constants.allowMotion]: float,
    },
    animationDuration: "3s",
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "infinite",
  },
});
