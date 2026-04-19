import experiencesData from "@/data/experiences.json";

export type Project = {
  name: string;
  media?: { type: "video" | "gif" | "image" | "article"; src: string; link?: string };
};

export type Experience = (typeof experiencesData)[number] & {
  projects?: Project[];
  companyUrl?: string;
};
