import * as React from "react";
import { ProjectProps } from "../interfaces/props";
import Link from "next/link";
import TechnologyList from "./TechnologyList";

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

      .project-card:active,
      .project-card:hover,
      .project-card:focus,
      .project-card:focus-within {
        background-color: rgba(var(--cool-light-color), 1);
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

      .links-row > a {
        display: inline-block;
        font-size: 0.75rem;
        font-weight: 700;
        margin-right: 1em;
        margin-top: 1em;
        padding: 0.5rem 0.75rem;
        box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.2),
          2px 2px 3px 2px rgba(67, 107, 227, 0.1);
        border-radius: 0.2rem;
        transition: all 0.35s;
        backface-visibility: hidden;
        background-color: rgba(var(--cool-dark-color), 0.8);
        color: rgba(var(--warm-light-color), 1);
        transform: scale(1);
        text-transform: lowercase;
      }

      .links-row > a:hover,
      .links-row > a:focus,
      .links-row > a:focus-within {
        background-color: rgba(var(--cool-dark-color), 1);
        transform: scale(1.02);
        outline: none;
      }

      .links-row > a:active {
        background-color: rgba(var(--cool-dark-color), 1);
        transform: scale(0.98);
        outline: none;
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
          <a href={projectData.live_link.url}>Check it out</a>
        )}
        {projectData.source_link?.url && (
          <a href={projectData.source_link.url}>View source</a>
        )}
        <Link href={`projects/${uid}`}>
          <a>More details</a>
        </Link>
      </div>
    </div>
  </div>
);

export default ProjectCard;
