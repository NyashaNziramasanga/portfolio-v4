import { useEffect, useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import * as stylex from "@stylexjs/stylex";
import { Button } from "@/components/ui/button";
import { colors } from "../../../styles/Colors.stylex";
import { spacing } from "../../../styles/Spacing.stylex";
import { radii } from "../../../styles/BorderRadius.stylex";
import {
  fontSizes,
  fontWeights,
  lineHeights,
} from "../../../styles/Typography.stylex";
import { breakpoints } from "../../../styles/Breakpoints.stylex";
import { shadows } from "../../../styles/Shadows.stylex";

type SnippetOutputProps = {
  outerRadius: number;
  innerRadius: number;
  padding: number;
};

type Format = "css" | "react-native";

const FORMATS: { id: Format; label: string }[] = [
  { id: "css", label: "CSS" },
  { id: "react-native", label: "React Native" },
];

function buildCss({ outerRadius, innerRadius, padding }: SnippetOutputProps) {
  return `.outer-box {
  padding: ${padding}px;
  border-radius: ${outerRadius}px;
}

.inner-box {
  border-radius: ${innerRadius}px;
}`;
}

function buildReactNative({
  outerRadius,
  innerRadius,
  padding,
}: SnippetOutputProps) {
  return `import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  outerBox: {
    padding: ${padding},
    borderRadius: ${outerRadius},
  },
  innerBox: {
    borderRadius: ${innerRadius},
  },
});`;
}

export function SnippetOutput(props: SnippetOutputProps) {
  const [format, setFormat] = useState<Format>("css");
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">(
    "idle",
  );

  const snippets = useMemo(
    () => ({
      css: buildCss(props),
      "react-native": buildReactNative(props),
    }),
    [props],
  );

  const activeSnippet = snippets[format];

  useEffect(() => {
    if (copyStatus === "idle") return;
    const timeoutId = window.setTimeout(() => setCopyStatus("idle"), 1800);
    return () => window.clearTimeout(timeoutId);
  }, [copyStatus]);

  useEffect(() => {
    setCopyStatus("idle");
  }, [format]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeSnippet);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
  };

  return (
    <section
      aria-labelledby="snippet-output-heading"
      {...stylex.props(styles.root)}
    >
      <header {...stylex.props(styles.header)}>
        <div {...stylex.props(styles.headingGroup)}>
          <h3 id="snippet-output-heading" {...stylex.props(styles.title)}>
            Snippet
          </h3>
          <div
            role="tablist"
            aria-label="Snippet format"
            {...stylex.props(styles.tabs)}
          >
            {FORMATS.map((option) => {
              const isActive = format === option.id;
              return (
                <button
                  key={option.id}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => setFormat(option.id)}
                  {...stylex.props(
                    styles.tab,
                    isActive ? styles.tabActive : styles.tabInactive,
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          style={styles.copyButton}
          onClick={handleCopy}
          aria-live="polite"
        >
          {copyStatus === "copied" ? (
            <>
              <Check {...stylex.props(styles.icon)} />
              Copied
            </>
          ) : copyStatus === "error" ? (
            "Copy failed"
          ) : (
            <>
              <Copy {...stylex.props(styles.icon)} />
              Copy
            </>
          )}
        </Button>
      </header>

      <pre {...stylex.props(styles.pre)}>
        <code>{activeSnippet}</code>
      </pre>
    </section>
  );
}

const styles = stylex.create({
  root: {
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.surface,
    backgroundColor: colors.surfaceSubtleAlpha60,
    padding: {
      default: spacing.space20,
      [breakpoints.sm]: spacing.space24,
    },
  },
  header: {
    marginBottom: spacing.space16,
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.space12,
  },
  headingGroup: {
    display: "flex",
    alignItems: "center",
    gap: spacing.space12,
  },
  title: {
    fontSize: fontSizes.titleSmall,
    lineHeight: lineHeights.line28,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary,
  },
  tabs: {
    display: "inline-flex",
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.backgroundAlpha60,
    padding: spacing.space2,
  },
  tab: {
    borderRadius: radii.xs,
    paddingInline: spacing.space10,
    paddingBlock: spacing.space4,
    fontSize: fontSizes.label,
    lineHeight: lineHeights.line16,
    fontWeight: fontWeights.medium,
    transitionProperty: "color, background-color",
    outline: "none",
    boxShadow: {
      ":focus-visible": shadows.focus,
    },
  },
  tabActive: {
    backgroundColor: colors.surface,
    color: colors.textPrimary,
  },
  tabInactive: {
    color: {
      default: colors.textMuted,
      ":hover": colors.textStrong,
    },
  },
  copyButton: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: {
      default: colors.surfaceSubtle,
      ":hover": colors.surface,
    },
    color: colors.textStrong,
  },
  icon: {
    width: 16,
    height: 16,
  },
  pre: {
    overflowX: "auto",
    borderRadius: radii.md,
    backgroundColor: colors.backgroundAlpha80,
    padding: spacing.space16,
    fontSize: {
      default: fontSizes.label,
      [breakpoints.sm]: fontSizes.body,
    },
    lineHeight: lineHeights.relaxed,
    color: colors.textStrong,
  },
});
