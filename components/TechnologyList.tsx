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
          display: flex;
          align-items: center;
          line-height: 2;
        }

        .tech-item > * {
          margin-right: 0.75rem;
        }

        .icon-container {
          width: 1.5rem;
          margin-right: 0.75rem;
        }

        .tech-item img {
          margin: 0 auto;
          object-fit: contain;
          height: 1.3rem;
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
