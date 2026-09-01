export type CaseStudyEvidence = {
  label: string;
  url: string;
  type: "article" | "video" | "project";
};

export type CaseStudy = {
  id: string;
  title: string;
  summary: string;
  problem: string;
  role: string;
  technicalComplexity: string[];
  decisions: string[];
  outcomes: string[];
  evidence: CaseStudyEvidence[];
  media: {
    type: "image";
    src: string;
    alt: string;
  };
};
