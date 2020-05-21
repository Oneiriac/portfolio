import * as React from "react";

const IpaText: React.FunctionComponent<any> = ({ children }) => (
  <span className="ipa-text fadein-full" tabIndex={-1}>
    <style jsx>{`
      .ipa-text {
        display: inline-block;
        animation-delay: 0.5s;
        color: rgba(var(--warm-dark-color), 0.6);
        font-family: Inter, sans-serif;
        font-weight: 700;
        transition: color 0.35s, transform 0.35s;
        outline: none;
      }

      .ipa-text:hover {
        color: rgba(var(--warm-dark-color), 1);
        transform: scale(1.05);
      }

      .ipa-text:focus,
      .ipa-text:active {
        transform: scale(0.9);
      }
    `}</style>

    {children}
  </span>
);

export default IpaText;
