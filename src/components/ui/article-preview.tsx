import { ExternalLink } from "lucide-react";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { colors } from "../../styles/tokens.stylex";

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
    paddingBlock: 16,
  },
  card: {
    overflow: "hidden",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.brand500,
    backgroundColor: colors.brand700,
    boxShadow: {
      default: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      [stylex.when.ancestor(":hover")]:
        "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
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
    gap: 6,
    paddingInline: 12,
    paddingBlock: 10,
    fontSize: 12,
    lineHeight: "16px",
    fontWeight: 500,
    color: colors.blue300,
  },
  icon: {
    width: 12,
    height: 12,
  },
});
