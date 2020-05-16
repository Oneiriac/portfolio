import * as React from "react";

const Footer: React.FunctionComponent = () => (
  <footer>
    <style jsx>{`
      footer {
        height: 3rem;
        width: 100%;
        font-size: 0.75rem;
        opacity: 0.75;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }
      span {
        padding: 0 1rem;
        margin: 0.5rem 0;
      }
    `}</style>
    <span>Made with Next.js + Prismic</span>
  </footer>
);

export default Footer;
