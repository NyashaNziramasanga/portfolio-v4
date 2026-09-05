import { useCallback, useEffect, useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { track } from "@vercel/analytics/react";
import caseStudiesData from "@/data/caseStudies.json";
import { CaseStudyCard } from "./CaseStudyCard";
import type { CaseStudy } from "./types";
import { colors } from "../../styles/Colors.stylex";
import { spacing } from "../../styles/Spacing.stylex";
import {
  fontSizes,
  fontWeights,
  lineHeights,
} from "../../styles/Typography.stylex";
import { breakpoints } from "../../styles/Breakpoints.stylex";
import { layout } from "../../styles/Layout.stylex";

const studies = caseStudiesData as CaseStudy[];

function getStudyIdFromHash() {
  const id = window.location.hash.replace("#case-study-", "");
  return studies.some((study) => study.id === id) ? id : null;
}

export function FlagshipWork() {
  const [expandedId, setExpandedId] = useState<string | null>(
    getStudyIdFromHash,
  );

  useEffect(() => {
    const syncFromHash = () => setExpandedId(getStudyIdFromHash());
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const toggle = useCallback(
    (id: string) => {
      const next = expandedId === id ? null : id;
      setExpandedId(next);
      track("Flagship Study Toggled", {
        study: id,
        action: next ? "opened" : "closed",
      });
    },
    [expandedId],
  );

  return (
    <div {...stylex.props(styles.root)}>
      <div {...stylex.props(styles.header)}>
        <h2 {...stylex.props(styles.title)}>Case Studies</h2>
        <p {...stylex.props(styles.description)}>
          Mobile product problems, architecture and engineering decisions behind
          the work.
        </p>
      </div>
      <div {...stylex.props(styles.list)}>
        {studies.map((study) => (
          <CaseStudyCard
            key={study.id}
            study={study}
            open={expandedId === study.id}
            onToggle={() => toggle(study.id)}
          />
        ))}
      </div>
    </div>
  );
}

const styles = stylex.create({
  root: {
    display: "flex",
    width: "100%",
    maxWidth: layout.contentMax,
    alignSelf: "flex-start",
    flexDirection: "column",
  },
  header: {
    marginBottom: {
      default: spacing.space32,
      [breakpoints.sm]: spacing.space40,
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
    marginTop: spacing.space12,
    fontSize: {
      default: fontSizes.body,
      [breakpoints.sm]: fontSizes.bodyLarge,
    },
    lineHeight: lineHeights.relaxed,
    color: colors.textMuted,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.space16,
  },
});
