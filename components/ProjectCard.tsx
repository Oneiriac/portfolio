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
          box-shadow: 2px 5px 2px rgba(47, 47, 62, 0.3),
            2px 10px 5px rgba(67, 107, 227, 0.2);
          background-color: rgba(var(--cool-dark-color), 0.8);
          color: #f0f8ea;
          padding: 1.5rem;
          height: 100%;
          transition: background-color 0.35s;
        }

        h3 {
          margin-top: 0;
          margin-bottom: 1rem;
          transition: color 0.35s;
        }

        span {
          transition: color 0.35s;
          margin-bottom: 1.5rem;
        }

        .project-card:hover,
        .project-card:focus {
          background-color: rgba(var(--cool-dark-color), 0.9);
        }

        .project-card:active {
          background-color: rgba(var(--cool-dark-color), 1);
        }

        .tech-icons-row {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
        }

        .tech-icons-row > img {
          object-fit: contain;
          height: 1.25rem;
          margin-right: 1rem;
          mix-blend-mode: hard-light;
        }
      `}</style>

      <div className="project-card">
        <h3>{projectData.name}</h3>
        <span>{projectData.summary}</span>
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
