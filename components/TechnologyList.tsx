import * as React from "react";
import { TechnologyData } from "../interfaces";

interface Props {
  techsUsed: TechnologyData[];
  iconFirst?: boolean;
}

const TechnologyList: React.FunctionComponent<Props> = ({
  techsUsed,
  iconFirst = true,
}) =>
  Array.isArray(techsUsed) && techsUsed.length > 0 ? (
    <>
      <style jsx>{`
        /* Separate out the dynamic style */
        .tech-item {
          flex-direction: ${iconFirst ? "row" : "row-reverse"};
          justify-content: ${iconFirst ? "flex-start" : "flex-end"};
        }
      `}</style>
      <style jsx>{`
        .tech-item {
          display: inline-flex;
          align-items: center;
          line-height: 3;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .tech-item > * {
          margin-right: 0.5rem;
        }

        .icon-container {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          padding: 0.6rem;
          border-radius: 100%;
          background-color: rgba(var(--cool-dark-color), 0.5);
          text-align: center;
        }

        .icon-container img {
          object-fit: contain;
        }
      `}</style>

      {techsUsed.map((tech) => (
        <span className="tech-item" key={tech.name}>
          <span className="icon-container">
            <img src={tech.icon.url} alt={tech.icon.alt ?? undefined} />
          </span>
          <span className="tech-name">{tech.name}</span>
        </span>
      ))}
    </>
  ) : null;

export default TechnologyList;
