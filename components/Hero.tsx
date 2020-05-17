import * as React from "react";
import ContentContainer from "./ContentContainer";

const Hero: React.FunctionComponent = () => (
  <section className="hero">
    <style jsx>
      {`
        .hero {
          width: 100%;
          box-shadow: 0px -100px 5px 5px #e16036; /* Get the hero colour extending behind sticky header */
          filter: drop-shadow(0 2px 5px rgba(163, 71, 40, 0.7));
        }

        .hero :global(*) {
          outline: none;
        }

        .hero-inner {
          width: 100%;
          background-color: #e16036;
          color: #1c0f13;
          padding-top: 1rem;
          padding-bottom: 6vmin;
          clip-path: polygon(
            0 0,
            100% 0,
            100% calc(100% - 3vw),
            0 100%
          ); /* Triangle border */
        }

        .hero-intro {
          font-size: 3.5rem;
          line-height: 1.1;
          font-weight: 900;
          margin-top: 0;
          margin-bottom: 1rem;
        }

        .swap-text {
          display: inline-block;
          position: relative;
        }

        .swap-text,
        .swap-text::before {
          width: 100%;
          transition: color 0.7s, transform 0.5s;
        }

        .swap-text::before {
          font-family: "Inter", sans-serif;
          font-weight: 700;
          content: attr(data-swap-text);
          position: absolute;
          top: 0;
          left: 0;
          /* transform: translate(-50%, 0); */
          color: rgba(0, 0, 0, 0);
        }

        .hero-intro:hover .swap-text,
        .hero-intro:active .swap-text,
        .hero-intro:focus .swap-text {
          color: rgba(0, 0, 0, 0);
        }

        .hero-intro:hover .swap-text::before,
        .hero-intro:active .swap-text::before,
        .hero-intro:focus .swap-text::before {
          /* transform: translate(0, 0); */
          color: #1c0f13;
        }

        /* 
        h1::before {
          content: "$ ";
        }

        h1::after {
          content: "_";
          animation: blink-caret 0.9s step-end infinite;
          color: orange;
        }
        
        @keyframes blink-caret {
          from,
          to {
            color: transparent;
          }
          50% {
            color: orange;
          }
        }
         */

        .hero-description {
          font-size: 1.5rem;
          font-weight: 700;
          line-height: 1.5;
          opacity: 0.8;
        }

        .location-text {
          opacity: 0.7;
        }

        .location-emoji {
          font-size: 2rem;
        }
      `}
    </style>
    <div className="hero-inner">
      <ContentContainer>
        <h1 className="hero-intro" tabIndex={-1}>
          <span className="swap-text" data-swap-text={"haɪ | aɪm deɪmən"}>
            Hi, I'm Damon
          </span>
        </h1>
        <div className="hero-description">
          Software engineer
          <br />
          Web developer
          <br />
          Occasional linguist
        </div>
        <br />
        <div className="location">
          <em className="location-text">Melbourne, Australia </em>&nbsp;
          <span className="location-emoji">☕</span>
        </div>
      </ContentContainer>
    </div>
  </section>
);

export default Hero;
