import { useCallback, useEffect, useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { track } from "@vercel/analytics/react";
import caseStudiesData from "@/data/caseStudies.json";
import { CaseStudyCard } from "./CaseStudyCard";
import type { CaseStudy } from "./types";
import { colors, constants } from "../../styles/tokens.stylex";

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
    maxWidth: 1024,
    alignSelf: "flex-start",
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
    fontSize: {
      default: 14,
      [constants.sm]: 16,
    },
    lineHeight: 1.625,
    color: colors.brand300,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
});
