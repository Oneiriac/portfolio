import * as React from "react";
import Link from "next/link";
import { HeaderProps } from "../interfaces/props";
import GithubSvg from "../public/github.svg";
import LinkedInSvg from "../public/linkedin.svg";
import MailSvg from "../public/mail.svg";

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
        background-color: rgb(var(--warm-dark-color));
        padding: 0.75rem 1rem;
        box-shadow: 0 2px 5px 0 rgba(var(--warm-dark-color), 0.6),
          0 6px 5px 0 rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(2px);
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
      }

      nav a,
      nav .divider {
        font-weight: 600;
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
        height: 1em;
      }
    `}</style>

    <div className="nav-name">
      <Link href="/">
        <a>damon cai</a>
      </Link>
    </div>
    <nav>
      <Link href="/#projects">
        <a>projects</a>
      </Link>
      {(github_link?.url || linkedin_link?.url || email) && (
        <span className="divider" />
      )}
      <div className="nav-contact">
        {github_link?.url && (
          <a href={github_link.url}>
            <GithubSvg />
          </a>
        )}
        {linkedin_link?.url && (
          <a href={linkedin_link.url}>
            <LinkedInSvg />
          </a>
        )}
        {email && (
          <a href={`mailto:${email}`}>
            <MailSvg />
          </a>
        )}
      </div>
    </nav>
  </header>
);

export default Header;
