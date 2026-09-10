import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../../styles/Colors.stylex";
import { spacing } from "../../styles/Spacing.stylex";
import { fonts } from "../../styles/Fonts.stylex";
import { radii } from "../../styles/BorderRadius.stylex";
import { shadows } from "../../styles/Shadows.stylex";
import { layout } from "../../styles/Layout.stylex";

export function CopyValue({
  name,
  value,
}: {
  name: string;
  value: string | number;
}) {
  const [feedback, setFeedback] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const request = useRef(0);
  useEffect(
    () => () => {
      clearTimeout(timer.current);
      request.current += 1;
    },
    [],
  );

  async function copy() {
    const current = ++request.current;
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(String(value));
      if (current !== request.current) return;
      setFeedback("Copied.");
      timer.current = setTimeout(() => setFeedback(""), 1600);
    } catch {
      if (current !== request.current) return;
      setFeedback("Copy unavailable. Select the value to copy manually.");
    }
  }

  const copied = feedback === "Copied.";
  const Icon = copied ? Check : Copy;
  return (
    <>
      <button
        type="button"
        aria-label={`Copy value ${value} for ${name}`}
        title="Copy value"
        onClick={() => void copy()}
        {...stylex.props(styles.button, stylex.defaultMarker())}
      >
        <code {...stylex.props(fonts.bodySmall, styles.value)}>{value}</code>
        <Icon
          aria-hidden="true"
          {...stylex.props(styles.icon, copied && styles.copied)}
        />
      </button>
      <span role="status" {...stylex.props(fonts.bodySmall, styles.feedback)}>
        {feedback}
      </span>
    </>
  );
}

const styles = stylex.create({
  button: {
    display: "inline-flex",
    alignItems: "center",
    gap: spacing.xs,
    maxWidth: "100%",
    minHeight: layout.touchTarget,
    paddingBlock: spacing.xs,
    paddingInline: 0,
    textAlign: "left",
    cursor: "pointer",
    backgroundColor: colors.transparent,
    color: {
 default: colors.textMuted,
 ":hover": colors.textPrimary 
},
    borderRadius: radii.xs,
    outline: {
 ":focus-visible": "none" 
},
    boxShadow: {
 ":focus-visible": shadows.focus 
},
  },
  value: {
    minWidth: 0,
    overflowWrap: "anywhere",
    userSelect: "text",
  },
  icon: {
    width: 14,
    height: 14,
    flexShrink: 0,
    opacity: {
      default: 0,
      [stylex.when.ancestor(":hover")]: 1,
      [stylex.when.ancestor(":focus-visible")]: 1,
    },
  },
  copied: {
    opacity: 1,
    color: colors.accentText,
  },
  feedback: {
    color: colors.accentText,
    position: {
 default: "absolute",
 ":not(:empty)": "static" 
},
  },
});
