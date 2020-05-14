import * as React from "react";
import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";

const titleSuffix = "Portfolio";

type Props = {
  title?: string;
  preview?: boolean;
};

const Layout: React.FunctionComponent<Props> = ({
  children,
  preview,
  title = "This is the default title",
}) => (
  <div className="layout">
    <style jsx>
      {`
        .layout {
          display: flex;
          font-family: Lato, sans-serif;
          color: rgba(0, 0, 0, 0.87);
          flex-direction: column;
          align-items: center;
          width: 100%;
          min-height: 100vh;
        }

        main {
          width: 100%;
          max-width: 1000px;
          padding: 1rem;
          flex-grow: 1;
        }
      `}
    </style>
    <style jsx global>{`
      *,
      ::before,
      ::after {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        padding: 0;
      }
    `}</style>
    <Head>
      <title>{title ? `${title} | ${titleSuffix}` : titleSuffix}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
        href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap"
        rel="stylesheet"
      />
    </Head>
    <Header preview={preview} />
    <main>{children}</main>
    <Footer />
  </div>
);

export default Layout;
