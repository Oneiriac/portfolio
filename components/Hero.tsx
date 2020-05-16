import * as React from "react";
import ContentContainer from "./ContentContainer";

const Hero: React.FunctionComponent = () => (
  <section className="hero">
    <style jsx>
      {`
        .hero {
          width: 100%;
          background-color: #e16036;
          box-shadow: 0px -100px 5px 5px #e16036; /* Get the hero colour extending behind sticky header */
          color: #1c0f13;
          padding: 1.5rem 0;
        }

        h1 {
          font-size: 3rem;
          font-weight: 900;
          margin-top: 0;
          margin-bottom: 1rem;
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

    <ContentContainer>
      <h1>
        Hi, I'm Damon
        <span className="typing-indicator" />
      </h1>
      <div className="hero-description">
        Software engineer,
        <br />
        Web developer,
        <br />
        Occasional linguist
      </div>
      <br />
      <div className="location">
        <em className="location-text">Melbourne, Australia </em>&nbsp;
        <span className="location-emoji">☕</span>
      </div>
    </ContentContainer>
  </section>
);

export default Hero;
