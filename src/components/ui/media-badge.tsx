import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { Play, FileText, Image } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { colors } from "../../styles/Colors.stylex";
import { spacing } from "../../styles/Spacing.stylex";
import { radii } from "../../styles/BorderRadius.stylex";
import {
  fontSizes,
  fontWeights,
  lineHeights,
} from "../../styles/Typography.stylex";
import { motion } from "../../styles/Motion.stylex";

type MediaType = "video" | "article" | "image" | "gif";

const badgeStyles = stylex.create({
  video: {
    backgroundColor: colors.videoBadgeSurface,
    color: colors.videoBadgeText,
  },
  article: {
    backgroundColor: colors.articleBadgeSurface,
    color: colors.articleBadgeText,
  },
  image: {
    backgroundColor: colors.imageBadgeSurface,
    color: colors.imageBadgeText,
  },
  gif: {
    backgroundColor: colors.gifBadgeSurface,
    color: colors.gifBadgeText,
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
    borderRadius: radii.pill,
    padding: spacing.xs,
    fontSize: fontSizes.label,
    lineHeight: lineHeights.line16,
    fontWeight: fontWeights.medium,
    transitionProperty: "all",
    transitionDuration: motion.normal,
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
    transitionDuration: motion.normal,
  },
  labelExpanded: {
    marginLeft: spacing.xxs,
    maxWidth: 60,
    opacity: 1,
  },
  labelCollapsed: {
    marginLeft: 0,
    maxWidth: 0,
    opacity: 0,
  },
});
