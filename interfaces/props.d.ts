import { HeaderData, ProjectData, TechnologyData } from "./index";

export interface ProjectProps {
  projectData: ProjectData;
  uid: string;
  techsUsed: TechnologyData[];
  preview?: boolean;
}

export interface HeaderProps {
  headerData: HeaderData;
}
