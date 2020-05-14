import * as React from "react";

const Footer: React.FunctionComponent = () => (
  <footer>
    <style jsx>{`
      footer {
        width: 100%;
        flex-grow: 0;
        display: flex;
        flex-direction: column;
      }

      hr {
        margin: 0;
        padding: 0;
      }

      span {
        padding: 0 1rem;
        margin: 0.5rem 0;
      }
    `}</style>
    <hr />
    <span>Footer Placeholder</span>
  </footer>
);

export default Footer;
