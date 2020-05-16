import { ProjectData, TechnologyData } from "./index";

export interface ProjectProps {
  projectData: ProjectData;
  uid: string;
  techsUsed: TechnologyData[];
  preview?: boolean;
}
