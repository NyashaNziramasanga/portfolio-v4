import { ExternalLink } from "lucide-react";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { colors } from "../../styles/Colors.stylex";
import { spacing } from "../../styles/Spacing.stylex";
import { radii } from "../../styles/BorderRadius.stylex";
import {
  fontSizes,
  fontWeights,
  lineHeights,
} from "../../styles/Typography.stylex";
import { shadows } from "../../styles/Shadows.stylex";

export function ArticlePreview({
  href,
  imageSrc,
  imageAlt,
  onClick,
  style,
  cardStyle,
}: {
  href: string;
  imageSrc: string;
  imageAlt: string;
  onClick?: (e: React.MouseEvent) => void;
  style?: StyleXStyles;
  cardStyle?: StyleXStyles;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...stylex.props(styles.root, style, stylex.defaultMarker())}
      onClick={onClick}
    >
      <div {...stylex.props(styles.card, cardStyle)}>
        <img
          src={imageSrc}
          alt={imageAlt}
          loading="lazy"
          decoding="async"
          width={640}
          height={360}
          {...stylex.props(styles.image)}
        />
        <div {...stylex.props(styles.footer)}>
          <ExternalLink {...stylex.props(styles.icon)} />
          Read article
        </div>
      </div>
    </a>
  );
}

const styles = stylex.create({
  root: {
    display: "block",
    paddingBlock: spacing.md,
  },
  card: {
    overflow: "hidden",
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    boxShadow: {
      default: shadows.elevationXs,
      [stylex.when.ancestor(":hover")]: shadows.elevationSm,
    },
    transitionProperty: "box-shadow",
  },
  image: {
    aspectRatio: "16 / 9",
    width: "100%",
    objectFit: "cover",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    gap: spacing.xs,
    paddingInline: spacing.sm,
    paddingBlock: spacing.sm,
    fontSize: fontSizes.label,
    lineHeight: lineHeights.line16,
    fontWeight: fontWeights.medium,
    color: colors.accentText,
  },
  icon: {
    width: 12,
    height: 12,
  },
});
