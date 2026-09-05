import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { Play, FileText, Image } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type MediaType = "video" | "article" | "image" | "gif";

const badgeStyles = stylex.create({
  video: {
    backgroundColor: "color-mix(in oklab, #2A4365 40%, transparent)",
    color: "#63B3ED",
  },
  article: {
    backgroundColor: "color-mix(in oklab, #78350F 40%, transparent)",
    color: "#FBBF24",
  },
  image: {
    backgroundColor: "color-mix(in oklab, #064E3B 40%, transparent)",
    color: "#34D399",
  },
  gif: {
    backgroundColor: "color-mix(in oklab, #4C1D95 40%, transparent)",
    color: "#A78BFA",
  },
});

const MEDIA_CONFIG: Record<
  MediaType,
  { icon: LucideIcon; label: string; style: StyleXStyles }
> = {
  video: { icon: Play, label: "Video", style: badgeStyles.video },
  article: { icon: FileText, label: "Article", style: badgeStyles.article },
  image: { icon: Image, label: "Image", style: badgeStyles.image },
  gif: { icon: Image, label: "GIF", style: badgeStyles.gif },
};

export function MediaBadge({
  type,
  expanded,
  style,
}: {
  type: MediaType;
  expanded: boolean;
  style?: StyleXStyles;
}) {
  const config = MEDIA_CONFIG[type];
  const Icon = config.icon;

  return (
    <span {...stylex.props(styles.root, config.style, style)}>
      <Icon {...stylex.props(styles.icon)} />
      <span
        {...stylex.props(
          styles.label,
          expanded ? styles.labelExpanded : styles.labelCollapsed,
        )}
      >
        {config.label}
      </span>
    </span>
  );
}

const styles = stylex.create({
  root: {
    display: "inline-flex",
    alignItems: "center",
    borderRadius: 9999,
    padding: 6,
    fontSize: 12,
    lineHeight: "16px",
    fontWeight: 500,
    transitionProperty: "all",
    transitionDuration: "200ms",
  },
  icon: {
    width: 12,
    height: 12,
    flexShrink: 0,
  },
  label: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    transitionProperty: "all",
    transitionDuration: "200ms",
  },
  labelExpanded: {
    marginLeft: 4,
    maxWidth: 60,
    opacity: 1,
  },
  labelCollapsed: {
    marginLeft: 0,
    maxWidth: 0,
    opacity: 0,
  },
});
