import * as React from "react";
import { TechnologyData } from "../interfaces";
import FlexColumn, { FlexColumnProps } from "./FlexColumn";
import css from "styled-jsx/css";

interface Props extends FlexColumnProps {
  techsUsed: TechnologyData[];
}

// Apply these styles to the flex column directly
const { className: techListClassName, styles: techListStyles } = css.resolve`
  .tech-list {
    display: flex;
    flex-direction: column;
  }
`;

const TechnologyList: React.FunctionComponent<Props> = ({
  techsUsed,
  ...props
}) =>
  Array.isArray(techsUsed) && techsUsed.length > 0 ? (
    <FlexColumn className={`tech-list ${techListClassName}`} {...props}>
      {techListStyles}
      <style jsx>{`
        span {
          display: flex;
          flex-direction: row;
          align-items: center;
          line-height: 2;
        }

        .icon-container {
          width: 1.5rem;
          margin-right: 0.75rem;
        }

        span img {
          margin: 0 auto;
          object-fit: contain;
          height: 1.3rem;
        }
      `}</style>

      <h3>Technologies used</h3>
      {techsUsed.map((tech) => (
        <span key={tech.name}>
          <span className="icon-container">
            <img src={tech.icon.url} alt={tech.icon.alt ?? undefined} />
          </span>
          {tech.name}
        </span>
      ))}
    </FlexColumn>
  ) : null;

export default TechnologyList;
