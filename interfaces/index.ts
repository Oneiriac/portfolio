export type ProjectData = {
  name: string;
  summary: string;
  description: any;
  start_date: string;
  end_date: string;
  ongoing: boolean;
  technology_link: TechnologyLink[];
  live_link: WebLink;
  source_link: WebLink;
  organisation: string;
  banner_image: ImageData;
};

type WebLink = {
  url?: string;
};

type TechnologyLink = {
  technology: {
    id: string;
  };
};

export type AugmentedProjectData = ProjectData & {
  uid: string;
  techsUsed: TechnologyData[];
};

type ImageData = {
  dimensions: {
    width: number;
    height: number;
  };
  alt: string | null;
  copyright: string | null;
  url: string;
};

export type TechnologyData = {
  name: string;
  icon: ImageData;
};

export type HeaderData = {
  site_title: string;
  github_link: WebLink;
  linkedin_link: WebLink;
  email: string;
};

export type FrontPageData = {
  technology_heading: string;
  technology_link: TechnologyLink[];
};
