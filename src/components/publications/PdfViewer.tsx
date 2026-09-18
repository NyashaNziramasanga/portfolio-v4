import * as stylex from "@stylexjs/stylex";
import { colors } from "../../styles/Colors.stylex";
import { fonts } from "../../styles/Fonts.stylex";
import { spacing } from "../../styles/Spacing.stylex";
import { radii } from "../../styles/BorderRadius.stylex";
import { layout } from "../../styles/Layout.stylex";
import { shadows } from "../../styles/Shadows.stylex";

type Props = { src: string; title: string; sourceUrl: string };

export default function PdfViewer({ src, title, sourceUrl }: Props) {
  const viewerUrl = `/vendor/pdfjs/web/viewer.html?file=${encodeURIComponent(src)}#zoom=page-fit&pagemode=none`;

  return (
    <div>
      <iframe
        src={viewerUrl}
        title={`${title} PDF viewer`}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-downloads allow-popups allow-popups-to-escape-sandbox allow-modals"
        allowFullScreen
        {...stylex.props(styles.frame)}
      />
      <div {...stylex.props(fonts.caption, styles.links)}>
        <a
          href={viewerUrl}
          target="_blank"
          rel="noopener noreferrer"
          {...stylex.props(styles.link)}
        >
          Open full viewer
        </a>
        <a href={src} download {...stylex.props(styles.link)}>
          Download PDF
        </a>
        {sourceUrl !== src && (
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            {...stylex.props(styles.link)}
          >
            University source
          </a>
        )}
      </div>
    </div>
  );
}

const styles = stylex.create({
  frame: {
    display: "block",
    width: "100%",
    height: "65dvh",
    minHeight: 360,
    maxHeight: 640,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.sm,
    backgroundColor: colors.surfaceSubtle,
  },
  links: {
    display: "flex",
    flexWrap: "wrap",
    gap: spacing.md,
    marginTop: spacing.xxs,
  },
  link: {
    display: "inline-flex",
    alignItems: "center",
    minHeight: layout.touchTarget,
    color: colors.textMuted,
    textDecoration: "underline",
    borderRadius: radii.sm,
    outline: "none",
    boxShadow: {
      ":focus-visible": shadows.focus,
    },
  },
});
