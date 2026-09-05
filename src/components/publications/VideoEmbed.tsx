import * as stylex from "@stylexjs/stylex";
import { constants } from "../../styles/tokens.stylex";

export function VideoEmbed({ src, title }: { src: string; title: string }) {
  return (
    <div {...stylex.props(styles.root)}>
      <div {...stylex.props(styles.frame)}>
        <iframe
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          {...stylex.props(styles.iframe)}
        />
      </div>
    </div>
  );
}

const styles = stylex.create({
  root: {
    paddingBlock: {
      default: 12,
      [constants.sm]: 16,
    },
  },
  frame: {
    overflow: "hidden",
    borderRadius: {
      default: 8,
      [constants.sm]: 12,
    },
  },
  iframe: {
    aspectRatio: "16 / 9",
    width: "100%",
  },
});
