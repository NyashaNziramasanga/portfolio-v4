import { useMemo } from "react";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../../../styles/Colors.stylex";
import { radii } from "../../../styles/BorderRadius.stylex";

type RadiusIllustrationProps = {
  outerRadius: number;
  innerRadius: number;
  padding: number;
};

const VIEW_W = 800;
const VIEW_H = 520;
const OUTER_X = 40;
const OUTER_Y = 40;
const OUTER_W = VIEW_W - OUTER_X * 2;
const OUTER_H = VIEW_H - OUTER_Y * 2;

const HIGHLIGHT_EXTENSION = 80;

function topLeftHighlight(x: number, y: number, r: number, ext: number) {
  const startX = x + r + ext;
  const endY = y + r + ext;
  return `M ${startX} ${y} L ${x + r} ${y} A ${r} ${r} 0 0 0 ${x} ${y + r} L ${x} ${endY}`;
}

function topRightHighlight(
  x: number,
  y: number,
  w: number,
  r: number,
  ext: number,
) {
  const startX = x + w - r - ext;
  const endY = y + r + ext;
  return `M ${startX} ${y} L ${x + w - r} ${y} A ${r} ${r} 0 0 1 ${x + w} ${y + r} L ${x + w} ${endY}`;
}

export function RadiusIllustration({
  outerRadius,
  innerRadius,
  padding,
}: RadiusIllustrationProps) {
  const geometry = useMemo(() => {
    const innerW = Math.max(0, OUTER_W - padding * 2);
    const innerH = Math.max(0, OUTER_H - padding * 2);
    const outerR = Math.min(outerRadius, OUTER_W / 2, OUTER_H / 2);
    const visualInnerR = Math.min(
      innerRadius,
      Math.max(0, innerW / 2),
      Math.max(0, innerH / 2),
    );

    const outerHighlightExt = Math.min(
      HIGHLIGHT_EXTENSION,
      Math.max(0, OUTER_W / 2 - outerR),
      Math.max(0, OUTER_H / 2 - outerR),
    );
    const innerHighlightExt = Math.min(
      HIGHLIGHT_EXTENSION,
      Math.max(0, innerW / 2 - visualInnerR),
      Math.max(0, innerH / 2 - visualInnerR),
    );

    return {
      innerX: OUTER_X + padding,
      innerY: OUTER_Y + padding,
      innerW,
      innerH,
      outerR,
      visualInnerR,
      outerHighlightExt,
      innerHighlightExt,
    };
  }, [outerRadius, innerRadius, padding]);

  return (
    <div {...stylex.props(styles.root)}>
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        xmlns="http://www.w3.org/2000/svg"
        {...stylex.props(styles.svg)}
        role="img"
        aria-label={`Outer radius ${outerRadius}px, inner radius ${innerRadius}px, padding ${padding}px`}
      >
        <rect
          width={VIEW_W}
          height={VIEW_H}
          {...stylex.props(styles.background)}
        />

        <rect
          x={OUTER_X}
          y={OUTER_Y}
          width={OUTER_W}
          height={OUTER_H}
          rx={geometry.outerR}
          ry={geometry.outerR}
          {...stylex.props(styles.guide)}
          strokeWidth={4}
        />

        {geometry.innerW > 0 && geometry.innerH > 0 ? (
          <rect
            x={geometry.innerX}
            y={geometry.innerY}
            width={geometry.innerW}
            height={geometry.innerH}
            rx={geometry.visualInnerR}
            ry={geometry.visualInnerR}
            {...stylex.props(styles.guide)}
            strokeWidth={4}
          />
        ) : null}

        {geometry.outerHighlightExt > 0 ? (
          <path
            d={topLeftHighlight(
              OUTER_X,
              OUTER_Y,
              geometry.outerR,
              geometry.outerHighlightExt,
            )}
            {...stylex.props(styles.outerHighlight)}
            strokeWidth={6}
            strokeLinecap="round"
          />
        ) : null}

        {geometry.innerW > 0 &&
        geometry.innerH > 0 &&
        geometry.innerHighlightExt > 0 ? (
          <path
            d={topRightHighlight(
              geometry.innerX,
              geometry.innerY,
              geometry.innerW,
              geometry.visualInnerR,
              geometry.innerHighlightExt,
            )}
            {...stylex.props(styles.innerHighlight)}
            strokeWidth={6}
            strokeLinecap="round"
          />
        ) : null}
      </svg>
    </div>
  );
}

const styles = stylex.create({
  root: {
    position: "relative",
    aspectRatio: "800 / 520",
    width: "100%",
    overflow: "hidden",
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.surface,
    backgroundColor: colors.surfaceSubtleAlpha60,
  },
  svg: {
    display: "block",
    height: "100%",
    width: "100%",
  },
  background: {
    fill: colors.surfaceSubtle,
  },
  guide: {
    fill: "none",
    stroke: colors.border,
  },
  outerHighlight: {
    fill: "none",
    stroke: colors.accent,
  },
  innerHighlight: {
    fill: "none",
    stroke: colors.accentSoft,
  },
});
