import * as React from "react";
import { ProjectProps } from "../interfaces/props";
import Link from "next/link";

const ProjectCard: React.FunctionComponent<ProjectProps> = ({
  projectData,
  uid,
  techsUsed,
}) => (
  <Link href={`projects/${uid}`}>
    <a>
      <style jsx>{`
        a {
          text-decoration: none;
        }

        .project-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05),
            0 15px 40px rgba(67, 107, 227, 0.2);
          background-color: rgba(67, 107, 227, 0.65);
          color: #34384d;
          padding: 1rem;
          min-height: 10rem;
          transition: background-color 0.35s;
        }

        .project-card h3 {
          margin-top: 0;
          transition: color 0.35s;
        }

        .project-card:hover,
        .project-card:focus,
        .project-card:active {
          background-color: rgba(67, 107, 227, 1);
        }

        .project-card:hover,
        .project-card:focus,
        .project-card:active h3 {
          color: #dedede;
        }

        .tech-icons-row {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
        }

        .tech-icons-row > img {
          object-fit: contain;
          height: 1.25rem;
          margin-right: 0.75rem;
        }
      `}</style>

      <div className="project-card">
        <h3>{projectData.name}</h3>
        <p>{projectData.summary}</p>
        <div className="tech-icons-row">
          {Array.isArray(techsUsed) &&
            techsUsed.map((tech) => (
              <img
                key={tech.name}
                src={tech.icon.url}
                alt={tech.icon.alt ?? undefined}
              />
            ))}
        </div>
      </div>
    </a>
  </Link>
);

export default ProjectCard;
