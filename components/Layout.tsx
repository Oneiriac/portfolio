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
          background-color: honeydew;
          position: relative;
        }

        .layout :global(h1, h2, h3, h4, h5, h6) {
          font-family: "Space Mono", monospace;
        }

        main {
          flex-grow: 1;
          flex-shrink: 0;
          width: 100%;
          padding-bottom: 3rem;
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
