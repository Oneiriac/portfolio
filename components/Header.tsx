import * as React from "react";
import Link from "next/link";

type Props = {
  preview?: boolean;
};

const Header: React.FunctionComponent<Props> = ({ preview }) => (
  <header>
    <style jsx>{`
      header {
        display: flex;
        flex-direction: row;
        width: 100%;
        line-height: 1.5;
        background-color: #222;
        padding: 12px 24px;
      }

      nav {
        flex: 1 0 auto;
        text-align: right;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
      }

      .my-name {
        flex: 0 0 8rem;
        font-weight: bold;
      }

      .divider {
        display: inline-block;
        width: 1px;
        height: 1rem;
        background-color: hsla(0, 0%, 100%, 1);
        visibility: hidden;
        margin: 0 0.75rem;
      }

      a {
        text-decoration: none;
        color: #efefef;
      }

      a:hover {
        color: #bcbcbc;
      }
    `}</style>
    <div className="my-name">
      <Link href="/">
        <a>Damon Cai</a>
      </Link>
    </div>
    <nav>
      <Link href="/about">
        <a>About</a>
      </Link>
      <span className="divider" />
      <Link href="/projects">
        <a>Projects List</a>
      </Link>
      {preview && (
        <>
          <span className="divider" />
          <a href="/api/exit-preview">Exit Preview Mode</a>
        </>
      )}
    </nav>
  </header>
);

export default Header;
