import * as React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons/faExternalLinkAlt";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons/faEllipsisH";

import ProjectLink from "./ProjectLink";
import { ProjectData } from "../interfaces";

interface Props {
  projectData: ProjectData;
  uid: string;
  showDetailsLink?: boolean;
}

const ProjectLinkRow: React.FunctionComponent<Props> = ({
  projectData,
  uid,
  showDetailsLink = true,
}) => (
  <div className="project-links-row">
    {projectData.live_link?.url && (
      <ProjectLink href={projectData.live_link.url} linkType={"primary"}>
        <FontAwesomeIcon icon={faExternalLinkAlt} />
        Check it out
      </ProjectLink>
    )}
    {projectData.source_link?.url && (
      <ProjectLink href={projectData.source_link.url} linkType={"primary"}>
        <FontAwesomeIcon icon={faGithub} />
        View source
      </ProjectLink>
    )}
    {showDetailsLink && (
      <Link href={`projects/${uid}`} passHref={true}>
        <ProjectLink linkType={"secondary"}>
          <FontAwesomeIcon icon={faEllipsisH} />
          More details
        </ProjectLink>
      </Link>
    )}
  </div>
);

export default ProjectLinkRow;
