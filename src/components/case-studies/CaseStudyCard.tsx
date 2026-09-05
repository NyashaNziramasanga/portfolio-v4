import { ChevronDown, ExternalLink, Newspaper, PlayCircle } from "lucide-react";
import { track } from "@vercel/analytics/react";
import * as stylex from "@stylexjs/stylex";
import { CollapsiblePanel } from "@/components/ui/collapsible-panel";
import type { CaseStudy } from "./types";
import { colors, constants } from "../../styles/tokens.stylex";

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 {...stylex.props(styles.detailHeading)}>{title}</h4>
      <ul {...stylex.props(styles.detailList)}>
        {items.map((item) => (
          <li {...stylex.props(styles.detailItem)} key={item}>
            <span {...stylex.props(styles.bullet)} aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CaseStudyCard({
  study,
  open,
  onToggle,
}: {
  study: CaseStudy;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = `case-study-panel-${study.id}`;
  const responsiveImageBase = study.media.src.replace(/\.webp$/, "");

  return (
    <article
      id={`case-study-${study.id}`}
      {...stylex.props(styles.card, open ? styles.cardOpen : styles.cardClosed)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        {...stylex.props(styles.button)}
        onClick={onToggle}
      >
        <span {...stylex.props(styles.summaryGrid)}>
          <img
            src={study.media.src}
            srcSet={`${responsiveImageBase}-320.webp 320w, ${responsiveImageBase}-640.webp 640w, ${study.media.src} 1536w`}
            sizes="(min-width: 1024px) 192px, (min-width: 640px) 160px, calc(100vw - 4rem)"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            width={1536}
            height={864}
            {...stylex.props(styles.image)}
          />
          <span {...stylex.props(styles.summaryCopy)}>
            <span {...stylex.props(styles.title)}>{study.title}</span>
            <span {...stylex.props(styles.summary)}>{study.summary}</span>
          </span>
        </span>
        <ChevronDown
          {...stylex.props(styles.chevron, open && styles.chevronOpen)}
          aria-hidden="true"
        />
      </button>

      <CollapsiblePanel open={open} id={panelId} lazyMount>
        <div {...stylex.props(styles.panel)}>
          <div {...stylex.props(styles.detailGrid)}>
            <div>
              <h4 {...stylex.props(styles.detailHeading)}>Problem</h4>
              <p {...stylex.props(styles.detailCopy)}>{study.problem}</p>
            </div>
            <div>
              <h4 {...stylex.props(styles.detailHeading)}>My role</h4>
              <p {...stylex.props(styles.detailCopy)}>{study.role}</p>
            </div>
            <DetailList
              title="Technical complexity"
              items={study.technicalComplexity}
            />
            <DetailList title="Engineering decisions" items={study.decisions} />
            <DetailList title="Outcomes" items={study.outcomes} />
            <div>
              <h4 {...stylex.props(styles.detailHeading)}>Public evidence</h4>
              {study.evidence.length > 0 ? (
                <div {...stylex.props(styles.evidenceList)}>
                  {study.evidence.map((item) => {
                    const Icon = item.type === "video" ? PlayCircle : Newspaper;
                    return (
                      <a
                        key={item.url}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        {...stylex.props(styles.evidenceLink)}
                        onClick={() =>
                          track("Case Study Evidence Clicked", {
                            study: study.id,
                            type: item.type,
                          })
                        }
                      >
                        <Icon
                          {...stylex.props(styles.evidenceIcon)}
                          aria-hidden="true"
                        />
                        {item.label}
                        <ExternalLink
                          {...stylex.props(styles.externalIcon)}
                          aria-hidden="true"
                        />
                      </a>
                    );
                  })}
                </div>
              ) : (
                <p {...stylex.props(styles.emptyEvidence)}>
                  Sanitized workflow shown above. Internal implementation
                  details and metrics are intentionally omitted.
                </p>
              )}
            </div>
          </div>
        </div>
      </CollapsiblePanel>
    </article>
  );
}

const styles = stylex.create({
  card: {
    scrollMarginTop: 24,
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: colors.brand700,
    boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    transitionProperty: "color, background-color, border-color",
  },
  cardOpen: {
    borderColor: "color-mix(in oklab, #4299E1 40%, transparent)",
    backgroundColor: colors.brand600,
  },
  cardClosed: {
    borderColor: "color-mix(in oklab, #4A5568 50%, transparent)",
  },
  button: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    borderRadius: 16,
    padding: {
      default: 16,
      [constants.sm]: 20,
    },
    textAlign: "left",
    outline: "none",
    boxShadow: {
      ":focus-visible": "0 0 0 2px hsl(207 68% 50%)",
    },
  },
  summaryGrid: {
    display: "grid",
    minWidth: 0,
    flex: "1",
    gap: 16,
    gridTemplateColumns: {
      [constants.sm]: "10rem minmax(0, 1fr)",
      [constants.lg]: "12rem minmax(0, 1fr)",
    },
    alignItems: {
      [constants.sm]: "center",
    },
  },
  image: {
    aspectRatio: "16 / 9",
    width: "100%",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "color-mix(in oklab, #4A5568 40%, transparent)",
    objectFit: "cover",
  },
  summaryCopy: {
    minWidth: 0,
  },
  title: {
    display: "block",
    fontSize: {
      default: 18,
      [constants.sm]: 20,
    },
    lineHeight: "28px",
    fontWeight: 700,
    color: colors.brand50,
  },
  summary: {
    marginTop: 8,
    display: "block",
    maxWidth: 768,
    fontSize: {
      default: 14,
      [constants.sm]: 16,
    },
    lineHeight: 1.625,
    color: colors.brand300,
  },
  chevron: {
    marginTop: 4,
    width: 20,
    height: 20,
    flexShrink: 0,
    color: colors.brand300,
    transitionProperty: "transform",
  },
  chevronOpen: {
    transform: "rotate(180deg)",
  },
  panel: {
    borderTopWidth: 1,
    borderTopColor: "color-mix(in oklab, #4A5568 50%, transparent)",
    paddingInline: {
      default: 20,
      [constants.sm]: 24,
    },
    paddingBottom: 24,
    paddingTop: 20,
  },
  detailGrid: {
    display: "grid",
    gap: 24,
    gridTemplateColumns: {
      [constants.lg]: "repeat(2, minmax(0, 1fr))",
    },
  },
  detailHeading: {
    fontSize: 12,
    lineHeight: "16px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.14em",
    color: colors.brand300,
  },
  detailCopy: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 1.625,
    color: colors.brand200,
  },
  detailList: {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    fontSize: 14,
    lineHeight: 1.625,
    color: colors.brand200,
  },
  detailItem: {
    display: "flex",
    gap: 8,
  },
  bullet: {
    marginTop: 8,
    width: 6,
    height: 6,
    flexShrink: 0,
    borderRadius: "50%",
    backgroundColor: colors.blue400,
  },
  evidenceList: {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  evidenceLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontSize: 14,
    lineHeight: "20px",
    fontWeight: 500,
    color: {
      default: colors.blue300,
      ":hover": colors.blue200,
    },
  },
  evidenceIcon: {
    width: 16,
    height: 16,
  },
  externalIcon: {
    width: 14,
    height: 14,
  },
  emptyEvidence: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 1.625,
    color: colors.brand300,
  },
});
