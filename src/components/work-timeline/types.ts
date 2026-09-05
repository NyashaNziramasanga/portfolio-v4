export type Project = {
  name: string;
  media?: {
    type: "video" | "gif" | "image" | "article";
    src: string;
    link?: string;
  };
};

export type Experience = {
  id: string;
  logo: string;
  title: string;
  company: string;
  companyUrl?: string;
  dateStart: string;
  dateEnd: string;
  startDate: string;
  endDate?: string;
  projects?: Project[];
};

export type Education = {
  id: string;
  logo: string;
  title: string;
  institution: string;
  institutionUrl: string;
  dateStart: string;
  dateEnd: string;
};
