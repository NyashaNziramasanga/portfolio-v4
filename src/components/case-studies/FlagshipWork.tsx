import { useCallback, useEffect, useState } from "react";
import { track } from "@vercel/analytics/react";
import caseStudiesData from "@/data/caseStudies.json";
import { CaseStudyCard } from "./CaseStudyCard";
import type { CaseStudy } from "./types";

const studies = caseStudiesData as CaseStudy[];

function getStudyIdFromHash() {
  const id = window.location.hash.replace("#case-study-", "");
  return studies.some((study) => study.id === id) ? id : null;
}

export function FlagshipWork() {
  const [expandedId, setExpandedId] = useState<string | null>(getStudyIdFromHash);

  useEffect(() => {
    const syncFromHash = () => setExpandedId(getStudyIdFromHash());
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const toggle = useCallback((id: string) => {
    const next = expandedId === id ? null : id;
    setExpandedId(next);
    track("Flagship Study Toggled", { study: id, action: next ? "opened" : "closed" });
  }, [expandedId]);

  return (
    <div className="flex w-full max-w-5xl self-start flex-col">
      <div className="mb-8 sm:mb-10">
        <h2 className="text-xl font-bold text-brand-50 sm:text-2xl">Case Studies</h2>
        <p className="mt-3 text-sm leading-relaxed text-brand-300 sm:text-base">Mobile product problems, architecture and engineering decisions behind the work.</p>
      </div>
      <div className="flex flex-col gap-4">
        {studies.map((study) => <CaseStudyCard key={study.id} study={study} open={expandedId === study.id} onToggle={() => toggle(study.id)} />)}
      </div>
    </div>
  );
}
