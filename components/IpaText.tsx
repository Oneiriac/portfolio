import * as React from "react";

const IpaText: React.FunctionComponent<any> = ({ children }) => (
  <span className="ipa-text" tabIndex={-1}>
    <style jsx>{`
      .ipa-text {
        display: inline-block;
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
    `}</style>

    {children}
  </span>
);

export default IpaText;
