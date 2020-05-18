import * as React from "react";
import { FOOTER_HEIGHT } from "./constants";

const Footer: React.FunctionComponent = () => (
  <footer>
    <style jsx>{`
      footer {
        height: 3rem;
        margin-top: calc(${FOOTER_HEIGHT} - 3rem);
        position: absolute;
        bottom: 0;
        width: 100%;
        font-size: 0.75rem;
        opacity: 0.75;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }
      span {
        margin: 0.5rem 0;
      }

      a:visited {
        color: inherit;
      }
    `}</style>
    <span>
      Made with <a href="https://nextjs.org/">Next.js</a> +{" "}
      <a href="https://prismic.io/">Prismic</a>
    </span>
  </footer>
);

export default Footer;
