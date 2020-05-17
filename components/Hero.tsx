import * as React from "react";
import ContentContainer from "./ContentContainer";
import TechnologyList from "./TechnologyList";
import css from "styled-jsx/css";
import { TechnologyData } from "../interfaces";
import FlexColumn from "./FlexColumn";

const heroContentCss = css.resolve`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const heroGridCss = css.resolve`
  width: 100%;
  background-color: rgb(var(--warm-mid-color));
  color: rgb(var(--warm-dark-color));
  padding-top: 1rem;
  padding-bottom: 6vmin;
  clip-path: polygon(
    0 0,
    100% 0,
    100% calc(100% - 3vw),
    0 100%
  ); /* Triangle border */
`;

const heroColumnBasis = "12rem";

interface HeroProps {
  technologies: TechnologyData[];
}

const Hero: React.FunctionComponent<HeroProps> = ({ technologies }) => (
  <section className="hero">
    <style jsx>
      {`
        .hero {
          width: 100%;
          box-shadow: 0px -100px 5px 5px rgb(var(--warm-mid-color)); /* Get the hero colour extending behind sticky header */
          filter: drop-shadow(0 2px 5px rgba(163, 71, 40, 0.7));
        }

        .hero :global(*) {
          outline: none;
        }

        .hero-inner {
        }

        h1 {
          font-size: 3.5rem;
          line-height: 1.1;
          font-weight: 900;
          margin-top: 0;
          margin-bottom: 1rem;
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
          line-height: 1.5;
          margin-bottom: 0.5rem;
          opacity: 0.9;
        }

        .location-text {
          opacity: 0.7;
          font-weight: 500;
        }

        .location-emoji {
          font-size: 2rem;
        }

        .hero-tech-list {
          display: grid;
          grid-template-columns: repeat(
            auto-fill,
            calc(0.7 * ${heroColumnBasis})
          );
          column-gap: 2rem;
        }

        :global(.hero-personal) {
          margin-right: 3rem;
        }
      `}
    </style>
    {heroContentCss.styles}
    {heroGridCss.styles}
    <ContentContainer
      containerProps={{ className: heroContentCss.className }}
      gridProps={{ className: heroGridCss.className }}
    >
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
        {" "}
        <h2>Tech I use</h2>
        <div className="hero-tech-list">
          <TechnologyList techsUsed={technologies} />
        </div>
      </FlexColumn>
    </ContentContainer>
  </section>
);

export default Hero;
