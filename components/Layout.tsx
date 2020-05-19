import * as React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { FOOTER_HEIGHT } from "./constants";
import { HeaderProps } from "../interfaces/props";

const Layout: React.FunctionComponent<HeaderProps> = ({
  children,
  headerData,
}) => (
  <div className="layout">
    <style jsx>
      {`
        .layout {
          display: flex;
          font-family: Muli, sans-serif;
          color: rgb(var(--warm-dark-color));
          flex-direction: column;
          align-items: center;
          width: 100%;
          min-height: 100vh;
          background-color: rgb(var(--warm-light-color));
          position: relative;
        }

        .layout :global(h1, h2, h3, h4, h5, h6) {
          font-family: "Space Mono", monospace;
          line-height: 1.2;
        }

        main {
          flex-grow: 1;
          flex-shrink: 0;
          width: 100%;
          padding-bottom: ${FOOTER_HEIGHT};
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }
      `}
    </style>
    <Header headerData={headerData} />
    <main>{children}</main>
    <Footer />
  </div>
);

export default Layout;
