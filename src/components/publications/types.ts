export type Publication = {
  id: string;
  platform: "flinders" | "youtube" | "devto" | "medium";
  title: string;
  url: string;
  archived: boolean;
  featuredOrder?: number;
  media?: { type: "video" | "article"; src: string };
};

export type Platform = Publication["platform"];
