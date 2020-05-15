import * as React from "react";
import { TechnologyData } from "../interfaces";

type Props = {
  techsUsed: TechnologyData[];
};

const TechnologyList: React.FunctionComponent<Props> = ({ techsUsed }) => (
  <section className="tech-list">
    <style jsx>{`
      .tech-list {
        display: flex;
        flex-direction: column;
      }

      span {
        display: flex;
        flex-direction: row;
        align-items: center;
        line-height: 2;
      }

      span img {
        margin-right: 0.75rem;
        width: 1.5rem;
        height: 1.5rem;
      }
    `}</style>
    <h3>Technologies used</h3>
    {Array.isArray(techsUsed) &&
      techsUsed.map((tech) => (
        <span key={tech.name}>
          <img src={tech.icon.url} alt={tech.icon.alt ?? undefined} />
          {tech.name}
        </span>
      ))}
  </section>
);

export default TechnologyList;
