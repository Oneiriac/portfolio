import * as React from "react";
import Link from "next/link";
import PreviewContext from "./PreviewContext";

type Props = {};

const Header: React.FunctionComponent<Props> = () => (
  <header>
    <style jsx>{`
      header {
        position: sticky;
        top: 0;
        z-index: 1;
        display: flex;
        flex-direction: row;
        opacity: 0.95;
        width: 100%;
        line-height: 1.5;
        background-color: rgb(var(--warm-dark-color));
        padding: 0.75rem 1rem;
        box-shadow: 0 2px 5px 0 rgba(var(--warm-dark-color), 0.6),
          0 6px 5px 0 rgba(0, 0, 0, 0.4);
      }

      a {
        text-decoration: none;
        color: rgba(var(--warm-light-color), 1);
        transition: opacity 0.35s;
      }

      a:hover {
        opacity: 0.6;
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
        font-weight: 600;
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
        color: rgb(var(--cool-light-color));
      }
    `}</style>

    <div className="my-name">
      <Link href="/">
        <a>damon cai</a>
      </Link>
    </div>
    <nav>
      <Link href="/#projects">
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
