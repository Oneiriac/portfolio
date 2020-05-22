import * as React from "react";
import { ProjectProps } from "../interfaces/props";
import Link from "next/link";
import TechnologyList from "./TechnologyList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons/faExternalLinkAlt";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons/faEllipsisH";

const ProjectCard: React.FunctionComponent<ProjectProps> = ({
  projectData,
  uid,
  techsUsed,
}) => (
  <div className="project-card" tabIndex={-1}>
    <style jsx>{`
      a,
      a:visited {
        text-decoration: none;
      }

      .project-card {
        display: flex;
        flex-direction: column;
        box-shadow: 1px 5px 2px rgba(0, 0, 0, 0.3),
          2px 10px 5px rgba(10, 14, 35, 0.2);
        background-color: rgba(var(--cool-light-color), 0.9);
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
      }

      .project-card:focus,
      .project-card:focus-within,
      .project-card:active {
        transform: translateY(-0.25rem);
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

      .link-base {
        display: inline-block;
        font-size: 0.75rem;
        font-weight: 700;
        margin-right: 1em;
        margin-top: 1em;
        padding: 0.5rem 0.75rem;
        border-radius: 0.2rem;
        transition: all 0.35s;
        backface-visibility: hidden;
        transform: scale(1);
        text-transform: lowercase;
        opacity: 0.9;
        box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.2),
          1px 2px 3px 2px rgba(67, 107, 227, 0.1);
      }

      .link-base:hover,
      .link-base:focus,
      .link-base:focus-within {
        transform: scale(1.02);
        outline: none;
        opacity: 1;
      }

      .link-base:active {
        transform: scale(0.98);
        outline: none;
        opacity: 1;
      }

      .link-base :global(svg) {
        vertical-align: middle;
        height: 1.2em;
        margin-right: 0.5em;
      }

      .link-primary {
        background-color: rgba(var(--cool-dark-color), 1);
        color: rgba(var(--warm-light-color), 1);
      }

      .link-secondary {
        background-color: transparent;
        color: rgba(var(--cool-dark-color), 1);
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
      <div className="links-row">
        {projectData.live_link?.url && (
          <a
            href={projectData.live_link.url}
            className="link-base link-primary"
          >
            <FontAwesomeIcon icon={faExternalLinkAlt} />
            Check it out
          </a>
        )}
        {projectData.source_link?.url && (
          <a
            href={projectData.source_link.url}
            className="link-base link-primary"
          >
            <FontAwesomeIcon icon={faGithub} />
            View source
          </a>
        )}
        <Link href={`projects/${uid}`}>
          <a className="link-base link-secondary">
            <FontAwesomeIcon icon={faEllipsisH} />
            More details
          </a>
        </Link>
      </div>
    </div>
  </div>
);

export default ProjectCard;
