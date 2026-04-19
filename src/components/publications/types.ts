import publicationsData from "@/data/publications.json";

export type Publication = (typeof publicationsData)[number] & {
  media?: {
    type: "video" | "article";
    src: string;
    link?: string;
  };
};

export type Platform = Publication["platform"];
