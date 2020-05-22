import * as React from "react";
import { TechnologyData } from "../interfaces";

export interface TechnologyIconProps extends React.HTMLAttributes<any> {
  backgroundColorRgb?: string | null;
  size?: string;
  iconSizeFactor?: number;
}

interface TechnologyIconPropsLocal extends TechnologyIconProps {
  technology: TechnologyData;
}

const TechnologyIcon: React.FunctionComponent<TechnologyIconPropsLocal> = ({
  technology,
  backgroundColorRgb = "var(--cool-dark-color)",
  size = "2.5rem",
  iconSizeFactor = 0.6,
  className,
  ...props
}) => (
  <span
    className={`icon-container${className ? ` ${className}` : ""}`}
    {...props}
  >
    <style jsx>{`
      .icon-container {
        background-color: rgba(
          ${backgroundColorRgb || "0, 0, 0"},
          ${backgroundColorRgb ? 0.4 : 0}
        );
        width: ${size};
        height: ${size};
      }

      .icon-container img {
        max-height: calc(${iconSizeFactor} * ${size});
        max-width: calc(${iconSizeFactor} * ${size});
      }
    `}</style>

    <style jsx>{`
      .icon-container {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        border-radius: 100%;
        text-align: center;
      }

      .icon-container img {
        margin: 0 auto;
        object-fit: contain;
      }
    `}</style>

    {technology && (
      <img src={technology.icon.url} alt={technology.icon.alt ?? undefined} />
    )}
  </span>
);

export default TechnologyIcon;
