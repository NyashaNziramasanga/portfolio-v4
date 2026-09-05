import { useState } from "react";
import { Archive, ChevronDown } from "lucide-react";
import * as stylex from "@stylexjs/stylex";
import publicationsData from "@/data/publications.json";
import { CollapsiblePanel } from "@/components/ui/collapsible-panel";
import { PublicationCard } from "./PublicationCard";
import type { Publication } from "./types";
import { colors, constants } from "../../styles/tokens.stylex";

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
    maxWidth: 1024,
    flexDirection: "column",
  },
  header: {
    marginBottom: {
      default: 32,
      [constants.sm]: 40,
    },
  },
  title: {
    fontSize: {
      default: 20,
      [constants.sm]: 24,
    },
    lineHeight: {
      default: "28px",
      [constants.sm]: "32px",
    },
    fontWeight: 700,
    color: colors.brand50,
  },
  description: {
    marginTop: 12,
    maxWidth: 768,
    fontSize: 14,
    lineHeight: 1.625,
    color: colors.brand300,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  archive: {
    marginTop: 24,
  },
  archiveButton: {
    display: "inline-flex",
    minHeight: 44,
    alignItems: "center",
    gap: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.brand500,
    paddingInline: 12,
    paddingBlock: 8,
    fontSize: 14,
    lineHeight: "20px",
    fontWeight: 600,
    color: {
      default: colors.brand300,
      ":hover": colors.brand100,
    },
    backgroundColor: {
      default: "transparent",
      ":hover": colors.brand700,
    },
    outline: "none",
    boxShadow: {
      ":focus-visible": "0 0 0 2px hsl(207 68% 50%)",
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
    marginTop: 16,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    borderLeftWidth: 1,
    borderLeftColor: "color-mix(in oklab, #4A5568 60%, transparent)",
    paddingLeft: {
      default: 12,
      [constants.sm]: 20,
    },
  },
});
