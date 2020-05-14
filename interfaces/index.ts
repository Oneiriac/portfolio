export type ProjectData = {
  name: string;
  description: string;
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
