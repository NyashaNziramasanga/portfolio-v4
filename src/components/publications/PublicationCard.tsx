import { ChevronDown } from "lucide-react";
import { track } from "@vercel/analytics/react";
import * as stylex from "@stylexjs/stylex";
import { CollapsiblePanel } from "@/components/ui/collapsible-panel";
import { MediaBadge } from "@/components/ui/media-badge";
import { ArticlePreview } from "@/components/ui/article-preview";
import { PlatformIcon } from "./PlatformIcon";
import { VideoEmbed } from "./VideoEmbed";
import type { Publication } from "./types";
import { colors, constants } from "../../styles/tokens.stylex";

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
      default: 12,
      [constants.sm]: 16,
    },
    backgroundColor: colors.brand700,
    color: colors.brand50,
    boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    transitionProperty: {
      default: "all",
      [constants.reduceMotion]: "none",
    },
    transitionDuration: "300ms",
  },
  expanded: {
    backgroundColor: colors.brand600,
    boxShadow:
      "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 0 0 1px color-mix(in oklab, hsl(207 68% 50%) 30%, transparent)",
  },
  button: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    gap: {
      default: 12,
      [constants.sm]: 16,
    },
    borderRadius: {
      default: 12,
      [constants.sm]: 16,
    },
    paddingInline: {
      default: 16,
      [constants.sm]: 24,
    },
    paddingBlock: {
      default: 16,
      [constants.sm]: 20,
    },
    textAlign: "left",
    outline: "none",
    boxShadow: {
      ":focus-visible": "0 0 0 2px #1A202C, 0 0 0 4px hsl(207 68% 50%)",
    },
  },
  title: {
    minWidth: 0,
    flex: "1",
    fontSize: {
      default: 13,
      [constants.sm]: 16,
    },
    fontWeight: 600,
    lineHeight: 1.375,
  },
  noShrink: {
    flexShrink: 0,
  },
  chevron: {
    width: 16,
    height: 16,
    flexShrink: 0,
    color: colors.brand300,
    transitionProperty: "transform",
  },
  chevronOpen: {
    transform: "rotate(180deg)",
  },
  panel: {
    paddingInline: {
      default: 16,
      [constants.sm]: 24,
    },
    paddingBottom: {
      default: 16,
      [constants.sm]: 20,
    },
  },
});
