import { useCallback, useEffect, useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { track } from "@vercel/analytics/react";
import caseStudiesData from "@/data/caseStudies.json";
import { CaseStudyCard } from "./CaseStudyCard";
import type { CaseStudy } from "./types";
import { colors } from "../../styles/Colors.stylex";
import { fonts } from "../../styles/Fonts.stylex";
import { spacing } from "../../styles/Spacing.stylex";
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
        <h2 {...stylex.props(fonts.sectionHeading, styles.title)}>
          Case Studies
        </h2>
        <p {...stylex.props(fonts.sectionDescription, styles.description)}>
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
      default: spacing.xxl,
      [breakpoints.sm]: spacing.xxxl,
    },
  },
  title: {
    color: colors.textPrimary,
  },
  description: {
    marginTop: spacing.sm,
    color: colors.textMuted,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.md,
  },
});
