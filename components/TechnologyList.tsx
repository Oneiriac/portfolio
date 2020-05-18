import * as React from "react";
import { TechnologyData } from "../interfaces";
import TechnologyIcon from "./TechnologyIcon";

interface Props {
  techsUsed: TechnologyData[];
  iconFirst?: boolean;
  backgroundColorRgb?: string;
}

const TechnologyList: React.FunctionComponent<Props> = ({
  techsUsed,
  iconFirst = true,
  backgroundColorRgb = "var(--cool-dark-color)",
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
        }

        .tech-item > :global(*) {
          margin-right: 0.5rem;
        }
      `}</style>

      {techsUsed.map((tech) => (
        <span className="tech-item" key={tech.name}>
          <TechnologyIcon
            technology={tech}
            backgroundColorRgb={backgroundColorRgb}
          />
          <span className="tech-name">{tech.name}</span>
        </span>
      ))}
    </>
  ) : null;

export default TechnologyList;
