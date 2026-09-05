import { ChevronDown, ExternalLink, Newspaper, PlayCircle } from "lucide-react";
import { track } from "@vercel/analytics/react";
import * as stylex from "@stylexjs/stylex";
import { CollapsiblePanel } from "@/components/ui/collapsible-panel";
import type { CaseStudy } from "./types";
import { colors } from "../../styles/Colors.stylex";
import { spacing } from "../../styles/Spacing.stylex";
import { radii } from "../../styles/BorderRadius.stylex";
import {
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacing,
} from "../../styles/Typography.stylex";
import { breakpoints } from "../../styles/Breakpoints.stylex";
import { shadows } from "../../styles/Shadows.stylex";
import { layout } from "../../styles/Layout.stylex";

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
    borderRadius: radii.xl,
    borderWidth: 1,
    backgroundColor: colors.surface,
    boxShadow: shadows.elevationXs,
    transitionProperty: "color, background-color, border-color",
  },
  cardOpen: {
    borderColor: colors.accentSurfaceAlpha40,
    backgroundColor: colors.surfaceHover,
  },
  cardClosed: {
    borderColor: colors.borderAlpha50,
  },
  button: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
    borderRadius: radii.xl,
    padding: {
      default: spacing.md,
      [breakpoints.sm]: spacing.lg,
    },
    textAlign: "left",
    outline: "none",
    boxShadow: {
      ":focus-visible": shadows.focus,
    },
  },
  summaryGrid: {
    display: "grid",
    minWidth: 0,
    flex: "1",
    gap: spacing.md,
    gridTemplateColumns: {
      [breakpoints.sm]: "10rem minmax(0, 1fr)",
      [breakpoints.lg]: "12rem minmax(0, 1fr)",
    },
    alignItems: {
      [breakpoints.sm]: "center",
    },
  },
  image: {
    aspectRatio: "16 / 9",
    width: "100%",
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.borderAlpha40,
    objectFit: "cover",
  },
  summaryCopy: {
    minWidth: 0,
  },
  title: {
    display: "block",
    fontSize: {
      default: fontSizes.titleSmall,
      [breakpoints.sm]: fontSizes.title,
    },
    lineHeight: lineHeights.line28,
    fontWeight: fontWeights.bold,
    color: colors.textPrimary,
  },
  summary: {
    marginTop: spacing.xs,
    display: "block",
    maxWidth: layout.contentMedium,
    fontSize: {
      default: fontSizes.body,
      [breakpoints.sm]: fontSizes.bodyLarge,
    },
    lineHeight: lineHeights.relaxed,
    color: colors.textMuted,
  },
  chevron: {
    marginTop: spacing.xxs,
    width: 20,
    height: 20,
    flexShrink: 0,
    color: colors.textMuted,
    transitionProperty: "transform",
  },
  chevronOpen: {
    transform: "rotate(180deg)",
  },
  panel: {
    borderTopWidth: 1,
    borderTopColor: colors.borderAlpha50,
    paddingInline: {
      default: spacing.lg,
      [breakpoints.sm]: spacing.xl,
    },
    paddingBottom: spacing.xl,
    paddingTop: spacing.lg,
  },
  detailGrid: {
    display: "grid",
    gap: spacing.xl,
    gridTemplateColumns: {
      [breakpoints.lg]: "repeat(2, minmax(0, 1fr))",
    },
  },
  detailHeading: {
    fontSize: fontSizes.label,
    lineHeight: lineHeights.line16,
    fontWeight: fontWeights.semibold,
    textTransform: "uppercase",
    letterSpacing: letterSpacing.labelWide,
    color: colors.textMuted,
  },
  detailCopy: {
    marginTop: spacing.xs,
    fontSize: fontSizes.body,
    lineHeight: lineHeights.relaxed,
    color: colors.textSecondary,
  },
  detailList: {
    marginTop: spacing.xs,
    display: "flex",
    flexDirection: "column",
    gap: spacing.xs,
    fontSize: fontSizes.body,
    lineHeight: lineHeights.relaxed,
    color: colors.textSecondary,
  },
  detailItem: {
    display: "flex",
    gap: spacing.xs,
  },
  bullet: {
    marginTop: spacing.xs,
    width: 6,
    height: 6,
    flexShrink: 0,
    borderRadius: radii.circle,
    backgroundColor: colors.accentSurface,
  },
  evidenceList: {
    marginTop: spacing.xs,
    display: "flex",
    flexDirection: "column",
    gap: spacing.xs,
  },
  evidenceLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: spacing.xs,
    fontSize: fontSizes.body,
    lineHeight: lineHeights.line20,
    fontWeight: fontWeights.medium,
    color: {
      default: colors.accentText,
      ":hover": colors.accentSoft,
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
    marginTop: spacing.xs,
    fontSize: fontSizes.body,
    lineHeight: lineHeights.relaxed,
    color: colors.textMuted,
  },
});
