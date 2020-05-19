import * as React from "react";
import TechnologyList from "./TechnologyList";
import { TechnologyData } from "../interfaces";
import HeroContainer from "./HeroContainer";
import css from "styled-jsx/css";
import { twoColumnContainerCss } from "./TwoColumnContainer";

const heroColumnBasis = "15rem";
const heroColumnCss = twoColumnContainerCss([2, 1], heroColumnBasis);

const heroContentCss = css.resolve`
  margin-top: 5rem;
  margin-bottom: 5rem;
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
          font-size: 3.5rem;
          line-height: 1.25;
          font-weight: 900;
          margin-top: 0;
          margin-bottom: 1.5rem;
        }

        .ipa-text {
          display: inline-block;
          content: attr(data-ipa-text);
          animation: fadein 4s ease-in-out;
          opacity: 0.6;
          font-family: Inter, sans-serif;
          font-weight: 700;
          transition: opacity 0.35s, transform 0.35s;
          outline: none;
        }

        .ipa-text:hover {
          opacity: 1;
          transform: scale(1.05);
        }

        .ipa-text:focus,
        .ipa-text:active {
          transform: scale(0.9);
        }

        @keyframes fadein {
          0% {
            opacity: 0;
          }

          100% {
            opacity: 0.6;
          }
        }

        .hero-description {
          font-size: 1.5rem;
          font-weight: 700;
          line-height: 1.8;
          margin-bottom: 0.5rem;
          opacity: 0.9;
        }

        .location-text {
          font-weight: 700;
        }

        .location-emoji {
          font-size: 2rem;
        }

        .hero-tech-list {
          display: grid;
          grid-template-columns: repeat(
            auto-fill,
            minmax(calc(0.5 * ${heroColumnBasis}), 1fr)
          );
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
      <h1 className="hero-intro">
        Hi, I'm <br /> Damon{" "}
        <span className="ipa-text" tabIndex={-1}>
          /deɪmən/
        </span>
      </h1>
      <div className="hero-description">
        Software engineer
        <br />
        Web developer
        <br />
        Occasional linguist
      </div>
      <div className="location">
        <em className="location-text">Melbourne, Australia </em>&nbsp;
        <span className="location-emoji">☕</span>
      </div>
    </section>
    <aside>
      <h2>{techHeading}</h2>
      <div className="hero-tech-list">
        <TechnologyList
          techsUsed={technologies}
          backgroundColorRgb={"var(--cool-dark-color)"}
        />
      </div>
    </aside>
  </HeroContainer>
);

export default Hero;
