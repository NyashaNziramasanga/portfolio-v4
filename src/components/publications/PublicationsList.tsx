import { useState } from "react";
import { Archive, ChevronDown } from "lucide-react";
import * as stylex from "@stylexjs/stylex";
import publicationsData from "@/data/publications.json";
import { CollapsiblePanel } from "@/components/ui/collapsible-panel";
import { PublicationCard } from "./PublicationCard";
import type { Publication } from "./types";
import { colors } from "../../styles/Colors.stylex";
import { spacing } from "../../styles/Spacing.stylex";
import { radii } from "../../styles/BorderRadius.stylex";
import {
  fontSizes,
  fontWeights,
  lineHeights,
} from "../../styles/Typography.stylex";
import { breakpoints } from "../../styles/Breakpoints.stylex";
import { shadows } from "../../styles/Shadows.stylex";
import { layout } from "../../styles/Layout.stylex";

const publications = publicationsData as Publication[];
const featured = publications
  .filter((publication) => !publication.archived)
  .sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99));
const archived = publications.filter((publication) => publication.archived);

export function PublicationsList() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const togglePublication = (id: string) =>
    setExpandedId((current) => (current === id ? null : id));

  return (
    <div {...stylex.props(styles.root)}>
      <div {...stylex.props(styles.header)}>
        <h2 {...stylex.props(styles.title)}>Publications</h2>
        <p {...stylex.props(styles.description)}>
          Selected talks, mobile architecture writing and research.
        </p>
      </div>
      <div {...stylex.props(styles.list)}>
        {featured.map((publication) => (
          <PublicationCard
            key={publication.id}
            publication={publication}
            isExpanded={expandedId === publication.id}
            onToggle={() => togglePublication(publication.id)}
          />
        ))}
      </div>

      <div {...stylex.props(styles.archive)}>
        <button
          type="button"
          aria-expanded={archiveOpen}
          aria-controls="older-writing-panel"
          onClick={() => setArchiveOpen((open) => !open)}
          {...stylex.props(styles.archiveButton)}
        >
          <Archive {...stylex.props(styles.icon)} aria-hidden="true" />
          Older writing ({archived.length})
          <ChevronDown
            {...stylex.props(styles.chevron, archiveOpen && styles.chevronOpen)}
            aria-hidden="true"
          />
        </button>
        <CollapsiblePanel open={archiveOpen} id="older-writing-panel" lazyMount>
          <div {...stylex.props(styles.archiveList)}>
            {archived.map((publication) => (
              <PublicationCard
                key={publication.id}
                publication={publication}
                isExpanded={expandedId === publication.id}
                onToggle={() => togglePublication(publication.id)}
              />
            ))}
          </div>
        </CollapsiblePanel>
      </div>
    </div>
  );
}

const styles = stylex.create({
  root: {
    display: "flex",
    width: "100%",
    maxWidth: layout.contentMax,
    flexDirection: "column",
  },
  header: {
    marginBottom: {
      default: spacing.xxl,
      [breakpoints.sm]: spacing.xxxl,
    },
  },
  title: {
    fontSize: {
      default: fontSizes.title,
      [breakpoints.sm]: fontSizes.heading,
    },
    lineHeight: {
      default: lineHeights.line28,
      [breakpoints.sm]: lineHeights.line32,
    },
    fontWeight: fontWeights.bold,
    color: colors.textPrimary,
  },
  description: {
    marginTop: spacing.sm,
    maxWidth: layout.contentMedium,
    fontSize: fontSizes.body,
    lineHeight: lineHeights.relaxed,
    color: colors.textMuted,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.md,
  },
  archive: {
    marginTop: spacing.xl,
  },
  archiveButton: {
    display: "inline-flex",
    minHeight: layout.touchTarget,
    alignItems: "center",
    gap: spacing.xs,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingInline: spacing.sm,
    paddingBlock: spacing.xs,
    fontSize: fontSizes.body,
    lineHeight: lineHeights.line20,
    fontWeight: fontWeights.semibold,
    color: {
      default: colors.textMuted,
      ":hover": colors.textStrong,
    },
    backgroundColor: {
      default: colors.transparent,
      ":hover": colors.surface,
    },
    outline: "none",
    boxShadow: {
      ":focus-visible": shadows.focus,
    },
    transitionProperty: "color, background-color",
  },
  icon: {
    width: 16,
    height: 16,
  },
  chevron: {
    width: 16,
    height: 16,
    transitionProperty: "transform",
  },
  chevronOpen: {
    transform: "rotate(180deg)",
  },
  archiveList: {
    marginTop: spacing.md,
    display: "flex",
    flexDirection: "column",
    gap: spacing.sm,
    borderLeftWidth: 1,
    borderLeftColor: colors.borderAlpha60,
    paddingLeft: {
      default: spacing.sm,
      [breakpoints.sm]: spacing.lg,
    },
  },
});
