import * as React from "react";
import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";

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
          color: rgba(0, 0, 0, 0.77);
          flex-direction: column;
          align-items: center;
          width: 100%;
          min-height: 100vh;
        }

        .layout :global(h1, h2, h3, h4, h5, h6) {
          font-family: "Space Mono", monospace;
        }

        .grid-wrapper {
          width: 100%;
          display: grid;
          grid-template-columns: minmax(1.2rem, 1fr) minmax(0, 10fr) minmax(
              1.2rem,
              1fr
            );
          grid-gap: 1rem;
          flex-grow: 1;
        }

        main {
          padding: 1rem 0;
        }
      `}
    </style>

    <Head>
      <title>{title ? `${title} | ${titleSuffix}` : titleSuffix}</title>
    </Head>
    <Header />
    <div className="grid-wrapper">
      <div />
      <main>{children}</main>
      <div />
    </div>
    <Footer />
  </div>
);

export default Layout;
