import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";

export function SimpleIconSvg({
  icon,
  style,
  "aria-label": ariaLabel,
}: {
  icon: { path: string };
  style?: StyleXStyles;
  "aria-label"?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      {...stylex.props(styles.root, style)}
      aria-hidden={!ariaLabel}
      aria-label={ariaLabel}
    >
      <path d={icon.path} />
    </svg>
  );
}

const styles = stylex.create({
  root: {
    fill: "currentColor",
  },
});
