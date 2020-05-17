import * as React from "react";
import TechnologyList from "./TechnologyList";
import { TechnologyData } from "../interfaces";
import FlexColumn from "./FlexColumn";
import HeroContainer from "./HeroContainer";
import css from "styled-jsx/css";

const heroColumnBasis = "12rem";

const heroContentCss = css.resolve`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 5rem;
  margin-bottom: 5rem;
`;

interface HeroProps {
  technologies: TechnologyData[];
}

const Hero: React.FunctionComponent<HeroProps> = ({ technologies }) => (
  <HeroContainer
    backgroundColorRgb={"var(--warm-mid-color)"}
    contentClassName={heroContentCss.className}
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
          content: attr(data-ipa-text);
          animation: fadein 2s ease-in-out;
          opacity: 0.4;
          font-family: Inter, sans-serif;
          font-weight: 700;
          transition: opacity 0.35s;
          user-select: text;
        }

        .ipa-text:hover {
          opacity: 1;
        }

        @keyframes fadein {
          0% {
            opacity: 0;
          }

          100% {
            opacity: 0.4;
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
            calc(0.6 * ${heroColumnBasis})
          );
          column-gap: 2rem;
          row-gap: 0.75rem;
        }

        .hero-tech-list :global(*) {
          line-height: 1.5;
          font-weight: 600;
        }

        :global(.hero-personal) {
          margin-right: 3rem;
        }
      `}
    </style>
    {heroContentCss.styles}

    <FlexColumn
      className="hero-personal"
      as="section"
      columnBasis={heroColumnBasis}
      columnSpan={2}
    >
      <h1 className="hero-intro">
        Hi, I'm <br /> Damon <span className="ipa-text">/deɪmən/</span>
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
    </FlexColumn>
    <FlexColumn as="aside" columnBasis={heroColumnBasis} columnSpan={1}>
      <h2>Some tech I use</h2>
      <div className="hero-tech-list">
        <TechnologyList techsUsed={technologies} />
      </div>
    </FlexColumn>
  </HeroContainer>
);

export default Hero;
