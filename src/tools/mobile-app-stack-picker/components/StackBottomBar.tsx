import { useEffect, useState } from "react";
import { Boxes } from "lucide-react";
import * as stylex from "@stylexjs/stylex";
import { Button } from "@/components/ui/button";
import { SimpleIconSvg } from "@/components/SimpleIconSvg";
import { getSimpleIcon } from "@/tools/mobile-app-stack-picker/simpleIcons";
import type { SelectedStackEntry } from "@/tools/types";
import { colors } from "../../../styles/Colors.stylex";
import { spacing } from "../../../styles/Spacing.stylex";
import { radii } from "../../../styles/BorderRadius.stylex";
import {
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacing,
} from "../../../styles/Typography.stylex";
import { breakpoints } from "../../../styles/Breakpoints.stylex";
import { shadows } from "../../../styles/Shadows.stylex";
import { layout } from "../../../styles/Layout.stylex";

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
    zIndex: layout.zSticky,
    marginTop: {
      default: spacing.space24,
      [breakpoints.sm]: spacing.space32,
    },
    borderTopLeftRadius: radii.lg,
    borderTopRightRadius: radii.lg,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: colors.border,
    backgroundColor: colors.backgroundOpaque95,
    padding: {
      default: spacing.space12,
      [breakpoints.sm]: spacing.space16,
    },
    boxShadow: shadows.elevationLg,
    backdropFilter: "blur(8px)",
  },
  layout: {
    display: "flex",
    flexDirection: {
      default: "column",
      [breakpoints.sm]: "row",
    },
    alignItems: {
      [breakpoints.sm]: "center",
    },
    justifyContent: {
      [breakpoints.sm]: "space-between",
    },
    gap: spacing.space12,
  },
  summary: {
    minWidth: 0,
  },
  title: {
    fontSize: fontSizes.label,
    lineHeight: lineHeights.line16,
    fontWeight: fontWeights.semibold,
    textTransform: "uppercase",
    letterSpacing: letterSpacing.wide,
    color: colors.textMuted,
  },
  entries: {
    marginTop: spacing.space8,
    display: "flex",
    maxHeight: {
      default: 160,
      [breakpoints.sm]: 128,
    },
    flexWrap: "wrap",
    gap: spacing.space8,
    overflowY: "auto",
    paddingRight: spacing.space4,
  },
  entry: {
    display: "inline-flex",
    alignItems: "center",
    gap: spacing.space8,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingInline: spacing.space12,
    paddingBlock: spacing.space6,
    fontSize: fontSizes.body,
    lineHeight: lineHeights.line20,
    color: colors.textStrong,
  },
  iconBox: {
    display: "flex",
    height: 16,
    width: 16,
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.xxs,
    backgroundColor: colors.backgroundAlpha60,
  },
  icon: {
    width: 12,
    height: 12,
  },
  iconColor: (color: string) => ({
    color,
  }),
  fallbackIcon: {
    color: colors.textMuted,
  },
  entryLabel: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  empty: {
    marginTop: spacing.space4,
    fontSize: {
      default: fontSizes.body,
      [breakpoints.sm]: fontSizes.bodyLarge,
    },
    lineHeight: {
      default: lineHeights.line20,
      [breakpoints.sm]: lineHeights.line24,
    },
    color: colors.textSubtle,
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: spacing.space8,
    alignSelf: {
      default: "flex-end",
      [breakpoints.sm]: "auto",
    },
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: {
      default: colors.surfaceSubtle,
      ":hover": colors.surface,
    },
    color: colors.textStrong,
  },
});
