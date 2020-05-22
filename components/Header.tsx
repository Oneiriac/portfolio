import * as React from "react";
import Link from "next/link";
import { HeaderProps } from "../interfaces/props";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons/faLinkedinIn";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons/faPaperPlane";

const Header: React.FunctionComponent<HeaderProps> = ({
  headerData: { github_link, email, linkedin_link },
}) => (
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
        background: transparent;
        mix-blend-mode: difference;
        padding: 0.75rem max(2vw, 1rem);
        /* backdrop-filter: blur(2px); */ /* Glitch in Safari when both this and mix-blend-mode are turned on */
        font-size: 1.2em;
      }

      a {
        text-decoration: none;
        color: rgba(var(--warm-light-color), 1);
        transition: opacity 0.35s;
        text-overflow: ellipsis;
      }

      a:hover {
        opacity: 0.6;
      }

      .nav-name {
        flex: 0 0 auto;
      }

      .nav-name a {
        font-family: "Space Mono", monospace;
        font-weight: 900;
      }

      nav {
        flex: 1 1 auto;
        text-align: right;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        text-transform: lowercase;
      }

      nav a,
      nav .divider {
        font-weight: 700;
        margin-left: min(
          3vw,
          0.8rem
        ); /* Good value across range of screen widths */
      }

      .divider {
        width: min(3vw, 1.5rem);
        text-align: center;
        background-color: transparent;
      }

      .divider::before {
        content: "/";
        color: rgb(var(--warm-light-color));
        font-weight: 900;
      }

      .nav-contact {
        display: inline-flex;
        flex-direction: row;
      }

      .nav-contact :global(svg) {
        vertical-align: middle;
      }
    `}</style>

    <div className="nav-name">
      <Link href="/">
        <a>damon cai</a>
      </Link>
    </div>
    <nav>
      <Link href="/#projects">
        <a>Projects</a>
      </Link>
      {(github_link?.url || linkedin_link?.url || email) && (
        <span className="divider" />
      )}
      <div className="nav-contact">
        {github_link?.url && (
          <a href={github_link.url}>
            <FontAwesomeIcon icon={faGithub} height={"1em"} />
          </a>
        )}
        {linkedin_link?.url && (
          <a href={linkedin_link.url}>
            <FontAwesomeIcon icon={faLinkedinIn} height={"1em"} />
          </a>
        )}
        {email && (
          <a href={`mailto:${email}`}>
            <FontAwesomeIcon icon={faPaperPlane} height={"1em"} />
          </a>
        )}
      </div>
    </nav>
  </header>
);

export default Header;
