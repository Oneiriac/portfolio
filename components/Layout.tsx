import * as React from "react";
import Link from "next/link";
import Head from "next/head";

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
          font-family: sans-serif;
        }

        header {
          display: flex;
          flex-direction: row;
        }

        header nav {
          flex: 1 0 auto;
          text-align: right;
        }

        .my-name {
          flex: 0 0 8rem;
          font-weight: bold;
        }
      `}
    </style>
    <Head>
      <title>{title ? `${title} | ${titleSuffix}` : titleSuffix}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <div className="my-name">
        <Link href="/">
          <a>Damon Cai</a>
        </Link>{" "}
      </div>
      <nav>
        {" "}
        <Link href="/about">
          <a>About</a>
        </Link>{" "}
        |{" "}
        <Link href="/projects">
          <a>Projects List</a>
        </Link>
        {preview && (
          <>
            {" "}
            | <a href="/api/exit-preview">Exit Preview Mode</a>
          </>
        )}
      </nav>
    </header>
    {children}
    <footer>
      <hr />
      <span>Footer Placeholder</span>
    </footer>
  </div>
);

export default Layout;
