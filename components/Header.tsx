import * as React from "react";
import Link from "next/link";
import PreviewContext from "./PreviewContext";

type Props = {};

const Header: React.FunctionComponent<Props> = () => (
  <header>
    <style jsx>{`
      header {
        display: flex;
        flex-direction: row;
        width: 100%;
        line-height: 1.5;
        background-color: #222;
        padding: 0.75rem 1rem;
      }

      a {
        text-decoration: none;
        color: #efefef;
        transition: color 0.35s;
      }

      a:hover {
        color: #bcbcbc;
      }

      nav {
        flex: 1 0 auto;
        text-align: right;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
      }

      nav a {
        font-variant: all-small-caps;
      }

      .my-name {
        flex: 0 0 auto;
      }

      .my-name a {
        font-family: "Space Mono", monospace;
        font-weight: 900;
      }

      .divider {
        width: 1.5rem;
        text-align: center;
        background-color: transparent;
      }

      .divider::before {
        content: "/";
        color: #efefef;
      }
    `}</style>

    <div className="my-name">
      <Link href="/">
        <a>damon cai</a>
      </Link>
    </div>
    <nav>
      <Link href="/about">
        <a>About</a>
      </Link>
      <span className="divider" />
      <Link href="/projects">
        <a>Projects</a>
      </Link>
      <PreviewContext.Consumer>
        {({ preview }) =>
          preview && (
            <>
              <span className="divider" />
              <a href="/api/exit-preview">Exit Preview</a>
            </>
          )
        }
      </PreviewContext.Consumer>
    </nav>
  </header>
);

export default Header;
