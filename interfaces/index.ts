export type ProjectData = {
  name: string;
  summary: string;
  description: any;
  start_date: string;
  end_date: string;
  ongoing: boolean;
  technology_link: any[];
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
