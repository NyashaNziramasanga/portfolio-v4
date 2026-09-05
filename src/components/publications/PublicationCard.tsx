import { ChevronDown } from "lucide-react";
import { track } from "@vercel/analytics/react";
import * as stylex from "@stylexjs/stylex";
import { CollapsiblePanel } from "@/components/ui/collapsible-panel";
import { MediaBadge } from "@/components/ui/media-badge";
import { ArticlePreview } from "@/components/ui/article-preview";
import { PlatformIcon } from "./PlatformIcon";
import { VideoEmbed } from "./VideoEmbed";
import type { Publication } from "./types";
import { colors } from "../../styles/Colors.stylex";
import { spacing } from "../../styles/Spacing.stylex";
import { radii } from "../../styles/BorderRadius.stylex";
import {
  fontSizes,
  fontWeights,
  lineHeights,
} from "../../styles/Typography.stylex";
import { motion } from "../../styles/Motion.stylex";
import { breakpoints } from "../../styles/Breakpoints.stylex";
import { shadows } from "../../styles/Shadows.stylex";

export function PublicationCard({
  publication,
  isExpanded,
  onToggle,
}: {
  publication: Publication;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const hasMedia = Boolean(publication.media?.type);
  const panelId = `publication-panel-${publication.id}`;

  return (
    <article {...stylex.props(styles.card, isExpanded && styles.expanded)}>
      <button
        type="button"
        aria-expanded={hasMedia ? isExpanded : undefined}
        aria-controls={hasMedia ? panelId : undefined}
        onClick={onToggle}
        {...stylex.props(styles.button)}
      >
        <PlatformIcon platform={publication.platform} />
        <span {...stylex.props(styles.title)}>{publication.title}</span>
        {hasMedia ? (
          <MediaBadge
            type={publication.media!.type}
            expanded={isExpanded}
            style={styles.noShrink}
          />
        ) : null}
        <ChevronDown
          {...stylex.props(styles.chevron, isExpanded && styles.chevronOpen)}
          aria-hidden="true"
        />
      </button>

      {hasMedia ? (
        <CollapsiblePanel open={isExpanded} id={panelId} lazyMount>
          <div {...stylex.props(styles.panel)}>
            {publication.media?.type === "video" ? (
              <VideoEmbed
                src={publication.media.src}
                title={publication.title}
              />
            ) : (
              <ArticlePreview
                href={publication.url}
                imageSrc={publication.media!.src}
                imageAlt={publication.title}
                onClick={() =>
                  track("Publication Evidence Clicked", {
                    publication: publication.id,
                  })
                }
              />
            )}
          </div>
        </CollapsiblePanel>
      ) : null}
    </article>
  );
}

const styles = stylex.create({
  card: {
    borderRadius: {
      default: radii.lg,
      [breakpoints.sm]: radii.xl,
    },
    backgroundColor: colors.surface,
    color: colors.textPrimary,
    boxShadow: shadows.elevationXs,
    transitionProperty: {
      default: "all",
      [motion.reduce]: "none",
    },
    transitionDuration: motion.slow,
  },
  expanded: {
    backgroundColor: colors.surfaceHover,
    boxShadow: shadows.raisedAccent,
  },
  button: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    gap: {
      default: spacing.space12,
      [breakpoints.sm]: spacing.space16,
    },
    borderRadius: {
      default: radii.lg,
      [breakpoints.sm]: radii.xl,
    },
    paddingInline: {
      default: spacing.space16,
      [breakpoints.sm]: spacing.space24,
    },
    paddingBlock: {
      default: spacing.space16,
      [breakpoints.sm]: spacing.space20,
    },
    textAlign: "left",
    outline: "none",
    boxShadow: {
      ":focus-visible": shadows.focusOffsetBackground,
    },
  },
  title: {
    minWidth: 0,
    flex: "1",
    fontSize: {
      default: fontSizes.bodySmall,
      [breakpoints.sm]: fontSizes.bodyLarge,
    },
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.snug,
  },
  noShrink: {
    flexShrink: 0,
  },
  chevron: {
    width: 16,
    height: 16,
    flexShrink: 0,
    color: colors.textMuted,
    transitionProperty: "transform",
  },
  chevronOpen: {
    transform: "rotate(180deg)",
  },
  panel: {
    paddingInline: {
      default: spacing.space16,
      [breakpoints.sm]: spacing.space24,
    },
    paddingBottom: {
      default: spacing.space16,
      [breakpoints.sm]: spacing.space20,
    },
  },
});
