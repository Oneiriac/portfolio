import * as React from "react";
import ContentContainer from "./ContentContainer";

interface Props {
  contentClassName?: string;
  backgroundColorRgb?: string;
}

const HeroTriangle: React.FunctionComponent<Props> = ({
  children,
  contentClassName,
  backgroundColorRgb = "var(--warm-mid-color)",
}) => (
  <section className="hero-triangle">
    <style jsx>{`
      .hero-triangle {
        box-shadow: 0px -10rem 5px 5px rgba(${backgroundColorRgb}, 0.9); /* Get the hero colour extending behind sticky header */
      }

      .hero-triangle-inner {
        background-color: rgba(${backgroundColorRgb}, 0.9);
      }
    `}</style>
    <style jsx>
      {`
        .hero-triangle {
          width: 100%;
          filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.6));
        }

        .hero-triangle-inner {
          width: 100%;
          padding-top: 1rem;
          color: rgb(var(--warm-dark-color));
          padding-bottom: 6vmin;
          clip-path: polygon(
            0 0,
            100% 0,
            100% calc(100% - 3vw),
            0 100%
          ); /* Triangle border */
        }
      `}
    </style>
    <div className="hero-triangle-inner">
      <ContentContainer className={contentClassName}>
        {children}
      </ContentContainer>
    </div>
  </section>
);

export default HeroTriangle;
