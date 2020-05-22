import * as React from "react";
import TechnologyList from "./TechnologyList";
import { TechnologyData } from "../interfaces";
import HeroContainer from "./HeroContainer";
import css from "styled-jsx/css";
import { twoColumnContainerCss } from "./TwoColumnContainer";
import IpaText from "./IpaText";

const heroColumnBasis = "15rem";
const heroColumnCss = twoColumnContainerCss([2, 1], heroColumnBasis);

const heroContentCss = css.resolve`
  margin-top: 2rem;
  margin-bottom: 4rem;
`;

interface HeroProps {
  technologies: TechnologyData[];
  techHeading: string;
}

const Hero: React.FunctionComponent<HeroProps> = ({
  technologies,
  techHeading,
}) => (
  <HeroContainer
    backgroundColorRgb={"var(--warm-mid-color)"}
    contentClassName={`${heroContentCss.className} ${heroColumnCss.className}`}
    slant="left"
  >
    <style jsx>
      {`
        h1 {
          font-size: 3rem;
          line-height: 1.25;
          font-weight: 900;
          margin-top: 0;
          margin-bottom: 1.5rem;
        }

        .hero-description {
          font-size: 1.5rem;
          font-weight: 700;
          line-height: 1.8;
          margin-bottom: 0.5rem;
          animation-delay: 1s;
        }

        .location {
          animation-delay: 1.5s;
        }

        .location-text {
          font-weight: 700;
        }

        .location-emoji {
          font-size: 2rem;
        }

        .hero-tech-section {
          margin-top: 1rem;
          animation-delay: 2.5s;
        }

        .hero-tech-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(7rem, 50%), 1fr));
          column-gap: 2rem;
          row-gap: 0.75rem;
        }

        .hero-tech-list :global(*) {
          line-height: 1.5;
          font-weight: 600;
        }
      `}
    </style>
    {heroContentCss.styles}
    {heroColumnCss.styles}

    <section className="hero-personal">
      <h1 className="hero-intro fadein-full">
        Hi, I'm <br /> Damon <IpaText>/deɪmən/</IpaText>
      </h1>
      <div className="hero-description fadein-full">
        Software engineer
        <br />
        Web developer
        <br />
        Occasional linguist
      </div>
      <div className="location fadein-full">
        <em className="location-text">Melbourne, Australia </em>&nbsp;
        <span className="location-emoji">☕</span>
      </div>
    </section>
    <aside className="hero-tech-section fadein-full">
      <h2>{techHeading}</h2>
      <div className="hero-tech-list fadein-full">
        <TechnologyList
          techsUsed={technologies}
          backgroundColorRgb={"var(--cool-dark-color)"}
        />
      </div>
    </aside>
  </HeroContainer>
);

export default Hero;
