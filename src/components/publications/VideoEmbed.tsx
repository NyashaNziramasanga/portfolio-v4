import * as stylex from "@stylexjs/stylex";
import { spacing } from "../../styles/Spacing.stylex";
import { radii } from "../../styles/BorderRadius.stylex";
import { breakpoints } from "../../styles/Breakpoints.stylex";

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
      default: spacing.space12,
      [breakpoints.sm]: spacing.space16,
    },
  },
  frame: {
    overflow: "hidden",
    borderRadius: {
      default: radii.md,
      [breakpoints.sm]: radii.lg,
    },
  },
  iframe: {
    aspectRatio: "16 / 9",
    width: "100%",
  },
});
