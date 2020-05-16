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
          box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05),
            0 15px 40px rgba(67, 107, 227, 0.2);
          background-color: rgba(67, 107, 227, 0.85);
          color: #232323;
          padding: 1rem;
          transition: 0.2s;
        }

        .project-card:hover {
          background-color: rgba(67, 107, 227, 1);
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
              <img src={tech.icon.url} alt={tech.icon.alt ?? undefined} />
            ))}
        </div>
      </div>
    </a>
  </Link>
);

export default ProjectCard;
