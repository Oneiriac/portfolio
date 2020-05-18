import * as React from "react";
import { TechnologyData } from "../interfaces";

interface Props {
  technology: TechnologyData;
  backgroundColorRgb: string;
}

const TechnologyIcon: React.FunctionComponent<Props> = ({
  technology,
  backgroundColorRgb = "var(--cool-dark-color)",
}) => (
  <span className="icon-container">
    <style jsx>{`
      .icon-container {
        background-color: rgba(
          ${backgroundColorRgb},
          ${backgroundColorRgb ? 0.4 : 0}
        );
      }
    `}</style>
    <style jsx>{`
      .icon-container {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2.5rem;
        height: 2.5rem;
        padding: 0.6rem;
        border-radius: 100%;
        text-align: center;
      }

      .icon-container img {
        object-fit: contain;
      }
    `}</style>

    <img src={technology.icon.url} alt={technology.icon.alt ?? undefined} />
  </span>
);

export default TechnologyIcon;
