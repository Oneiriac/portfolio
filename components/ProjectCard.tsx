import * as React from "react";
import { ProjectProps } from "../interfaces/props";
import TechnologyList from "./TechnologyList";
import ProjectLinkRow from "./ProjectLinkRow";

const ProjectCard: React.FunctionComponent<ProjectProps> = ({
  projectData,
  uid,
  techsUsed,
}) => (
  <div className="project-card" tabIndex={-1}>
    <style jsx>
      {`
        .project-card::after {
          content: "";
          background: linear-gradient(
              to left top,
              rgba(var(--cool-dark-color), 0),
              rgba(var(--cool-light-color), 0.8) 30%,
              rgba(var(--cool-light-color), 1)
            ),
            ${projectData?.banner_image?.url
              ? `url("${projectData?.banner_image?.url}")`
              : ""};
          opacity: 1;
          background-size: cover;
          filter: blur(1px);
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          position: absolute;
          z-index: -1;
        }
      `}
    </style>
    <style jsx>{`
      a,
      a:visited {
        text-decoration: none;
      }

      .project-card {
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        box-shadow: 1px 5px 2px rgba(0, 0, 0, 0.3),
          2px 10px 5px rgba(10, 14, 35, 0.2);
        background: rgba(var(--cool-light-color), 0.9);
        color: rgba(var(--warm-dark-color), 1);
        padding: 1.5rem;
        height: 100%;
        transition: background-color 0.35s, transform 0.15s;
        transform: translateY(0);
        border-radius: 0.2rem;
      }

      h3 {
        margin-top: 0;
        transition: color 0.35s;
      }

      .card-summary {
        transition: color 0.35s;
        font-weight: 500;
        line-height: 1.5;
        margin-bottom: 1.5rem;
      }

      .project-card:hover,
      .project-card:focus,
      .project-card:focus-within,
      .project-card:active {
        background-color: rgba(var(--cool-light-color), 1);
        outline: none;
      }

      .project-card:focus,
      .project-card:focus-within,
      .project-card:active {
        transform: translateY(-0.25rem);
        outline: none;
      }

      .bottom-rows {
        margin-top: auto; /* Push to bottom */
      }

      .tech-icons-row {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-bottom: 1rem;
      }
    `}</style>

    <h3>{projectData.name}</h3>
    <span className="card-summary">{projectData.summary}</span>
    <div className="bottom-rows">
      <div className="tech-icons-row">
        {Array.isArray(techsUsed) && (
          <TechnologyList
            techsUsed={techsUsed}
            showText={false}
            techIconProps={{
              size: "2rem",
            }}
          />
        )}
      </div>
      <ProjectLinkRow projectData={projectData} uid={uid} />
    </div>
  </div>
);

export default ProjectCard;
