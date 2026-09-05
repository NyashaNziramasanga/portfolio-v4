import { useEffect, useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import * as stylex from "@stylexjs/stylex";
import { Button } from "@/components/ui/button";
import { colors, constants } from "../../../styles/tokens.stylex";

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
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.brand700,
    backgroundColor: "color-mix(in oklab, #1F2937 60%, transparent)",
    padding: {
      default: 20,
      [constants.sm]: 24,
    },
  },
  header: {
    marginBottom: 16,
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  headingGroup: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  title: {
    fontSize: 18,
    lineHeight: "28px",
    fontWeight: 600,
    color: colors.brand50,
  },
  tabs: {
    display: "inline-flex",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.brand500,
    backgroundColor: "color-mix(in oklab, #1A202C 60%, transparent)",
    padding: 2,
  },
  tab: {
    borderRadius: 4,
    paddingInline: 10,
    paddingBlock: 4,
    fontSize: 12,
    lineHeight: "16px",
    fontWeight: 500,
    transitionProperty: "color, background-color",
    outline: "none",
    boxShadow: {
      ":focus-visible": "0 0 0 2px hsl(207 68% 50%)",
    },
  },
  tabActive: {
    backgroundColor: colors.brand700,
    color: colors.brand50,
  },
  tabInactive: {
    color: {
      default: colors.brand300,
      ":hover": colors.brand100,
    },
  },
  copyButton: {
    borderWidth: 1,
    borderColor: colors.brand500,
    backgroundColor: {
      default: colors.brand800,
      ":hover": colors.brand700,
    },
    color: colors.brand100,
  },
  icon: {
    width: 16,
    height: 16,
  },
  pre: {
    overflowX: "auto",
    borderRadius: 8,
    backgroundColor: "color-mix(in oklab, #1A202C 80%, transparent)",
    padding: 16,
    fontSize: {
      default: 12,
      [constants.sm]: 14,
    },
    lineHeight: 1.625,
    color: colors.brand100,
  },
});
