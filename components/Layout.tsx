import * as React from "react";
import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";
import { FOOTER_HEIGHT } from "./constants";

const titleSuffix = "Portfolio";

type Props = {
  title?: string;
};

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = "This is the default title",
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

    <Head>
      <title>{title ? `${title} | ${titleSuffix}` : titleSuffix}</title>
    </Head>
    <Header />
    <main>{children}</main>
    <Footer />
  </div>
);

export default Layout;
