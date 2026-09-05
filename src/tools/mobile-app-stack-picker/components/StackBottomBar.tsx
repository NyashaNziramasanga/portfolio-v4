import { useEffect, useState } from "react";
import { Boxes } from "lucide-react";
import * as stylex from "@stylexjs/stylex";
import { Button } from "@/components/ui/button";
import { SimpleIconSvg } from "@/components/SimpleIconSvg";
import { getSimpleIcon } from "@/tools/mobile-app-stack-picker/simpleIcons";
import type { SelectedStackEntry } from "@/tools/types";
import { colors, constants } from "../../../styles/tokens.stylex";

type StackBottomBarProps = {
  entries: SelectedStackEntry[];
  onReset: () => void;
  onCopyPrompt: () => void;
  onShare: () => void;
  copyStatus: "idle" | "copied" | "error";
  shareStatus: "idle" | "copied" | "error";
};

export function StackBottomBar({
  entries,
  onReset,
  onCopyPrompt,
  onShare,
  copyStatus,
  shareStatus,
}: StackBottomBarProps) {
  const hasSelections = entries.length > 0;
  const selectionKey = entries
    .map((entry) => `${entry.categoryId}:${entry.itemId}`)
    .join("|");
  const [resetRequest, setResetRequest] = useState<{
    selectionKey: string;
  } | null>(null);
  const resetConfirm = resetRequest?.selectionKey === selectionKey;

  useEffect(() => {
    if (!resetRequest) return;
    const timeoutId = window.setTimeout(() => setResetRequest(null), 2500);
    return () => window.clearTimeout(timeoutId);
  }, [resetRequest]);

  const handleResetClick = () => {
    if (resetConfirm) {
      onReset();
      setResetRequest(null);
    } else {
      setResetRequest({ selectionKey });
    }
  };

  return (
    <aside aria-label="Your selected stack" {...stylex.props(styles.root)}>
      <div {...stylex.props(styles.layout)}>
        <div {...stylex.props(styles.summary)}>
          <p {...stylex.props(styles.title)}>Your stack</p>
          {hasSelections ? (
            <div data-scrollbar {...stylex.props(styles.entries)}>
              {entries.map((entry) => {
                const icon = getSimpleIcon(entry.iconKey);
                const iconColor = icon ? `#${icon.hex}` : undefined;

                return (
                  <span
                    key={entry.categoryId}
                    {...stylex.props(styles.entry)}
                    title={`${entry.categoryLabel}: ${entry.itemLabel}`}
                  >
                    <span {...stylex.props(styles.iconBox)}>
                      {icon ? (
                        <SimpleIconSvg
                          icon={icon}
                          style={[
                            styles.icon,
                            styles.iconColor(iconColor ?? "currentColor"),
                          ]}
                          aria-label={entry.itemLabel}
                        />
                      ) : (
                        <Boxes
                          {...stylex.props(styles.icon, styles.fallbackIcon)}
                          aria-hidden
                        />
                      )}
                    </span>
                    <span {...stylex.props(styles.entryLabel)}>
                      {entry.itemLabel}
                    </span>
                  </span>
                );
              })}
            </div>
          ) : (
            <p {...stylex.props(styles.empty)}>
              Pick something from any layer above to get started.
            </p>
          )}
        </div>

        <div {...stylex.props(styles.actions)}>
          <Button
            type="button"
            variant="ghost"
            style={styles.secondaryButton}
            onClick={handleResetClick}
            disabled={!hasSelections}
            aria-live="polite"
          >
            {resetConfirm ? "Click again to confirm" : "Reset"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            style={styles.secondaryButton}
            onClick={onShare}
            disabled={!hasSelections}
            aria-live="polite"
          >
            {shareStatus === "copied"
              ? "Link copied"
              : shareStatus === "error"
                ? "Share failed"
                : "Share"}
          </Button>
          <Button
            type="button"
            onClick={onCopyPrompt}
            disabled={!hasSelections}
            aria-live="polite"
          >
            {copyStatus === "copied"
              ? "Copied"
              : copyStatus === "error"
                ? "Copy failed"
                : "Copy prompt"}
          </Button>
        </div>
      </div>
    </aside>
  );
}

const styles = stylex.create({
  root: {
    position: "sticky",
    bottom: 0,
    zIndex: constants.zSticky,
    marginTop: {
      default: 24,
      [constants.sm]: 32,
    },
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: colors.brand500,
    backgroundColor: "rgb(26 32 44 / 0.95)",
    padding: {
      default: 12,
      [constants.sm]: 16,
    },
    boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    backdropFilter: "blur(8px)",
  },
  layout: {
    display: "flex",
    flexDirection: {
      default: "column",
      [constants.sm]: "row",
    },
    alignItems: {
      [constants.sm]: "center",
    },
    justifyContent: {
      [constants.sm]: "space-between",
    },
    gap: 12,
  },
  summary: {
    minWidth: 0,
  },
  title: {
    fontSize: 12,
    lineHeight: "16px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.025em",
    color: colors.brand300,
  },
  entries: {
    marginTop: 8,
    display: "flex",
    maxHeight: {
      default: 160,
      [constants.sm]: 128,
    },
    flexWrap: "wrap",
    gap: 8,
    overflowY: "auto",
    paddingRight: 4,
  },
  entry: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.brand500,
    backgroundColor: colors.brand700,
    paddingInline: 12,
    paddingBlock: 6,
    fontSize: 14,
    lineHeight: "20px",
    color: colors.brand100,
  },
  iconBox: {
    display: "flex",
    height: 16,
    width: 16,
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
    backgroundColor: "color-mix(in oklab, #1A202C 60%, transparent)",
  },
  icon: {
    width: 12,
    height: 12,
  },
  iconColor: (color: string) => ({
    color,
  }),
  fallbackIcon: {
    color: colors.brand300,
  },
  entryLabel: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  empty: {
    marginTop: 4,
    fontSize: {
      default: 14,
      [constants.sm]: 16,
    },
    lineHeight: {
      default: "20px",
      [constants.sm]: "24px",
    },
    color: colors.brand400,
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    alignSelf: {
      default: "flex-end",
      [constants.sm]: "auto",
    },
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: colors.brand500,
    backgroundColor: {
      default: colors.brand800,
      ":hover": colors.brand700,
    },
    color: colors.brand100,
  },
});
