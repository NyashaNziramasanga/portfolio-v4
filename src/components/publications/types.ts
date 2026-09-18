export type Publication = {
  id: string;
  platform: "workflow" | "flinders" | "youtube" | "devto" | "medium";
  title: string;
  url: string;
  archived: boolean;
  featuredOrder?: number;
  media?: { type: "video" | "article" | "pdf"; src: string };
};

export type Platform = Publication["platform"];
