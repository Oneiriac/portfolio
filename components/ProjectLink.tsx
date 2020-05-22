import * as React from "react";

interface Props extends React.AnchorHTMLAttributes<any> {
  linkType: "primary" | "secondary";
}

export const ProjectLink: React.FunctionComponent<Props> = ({
  className,
  linkType,
  children,
  ...props
}) => (
  <a className={`link-base link-${linkType}`} {...props}>
    <style jsx>{`
      a,
      a:visited {
        text-decoration: none;
      }

      .link-base {
        display: inline-block;
        font-size: 0.75rem;
        font-weight: 700;
        margin-right: 1em;
        margin-top: 1em;
        padding: 0.5rem 0.75rem;
        border-radius: 0.2rem;
        transition: all 0.35s;
        backface-visibility: hidden;
        transform: scale(1);
        text-transform: lowercase;
        opacity: 0.9;
        box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.2),
          1px 2px 3px 2px rgba(67, 107, 227, 0.1);
      }

      .link-base:hover,
      .link-base:focus,
      .link-base:focus-within {
        transform: scale(1.02);
        outline: none;
        opacity: 1;
      }

      .link-base:active {
        transform: scale(0.98);
        outline: none;
        opacity: 1;
      }

      .link-base :global(svg) {
        vertical-align: middle;
        height: 1.2em;
        margin-right: 0.5em;
      }

      .link-primary {
        background-color: rgba(var(--cool-dark-color), 1);
        color: rgba(var(--warm-light-color), 1);
      }

      .link-secondary {
        background-color: rgba(var(--cool-light-color), 0.8);
        color: rgba(var(--cool-dark-color), 1);
      }
    `}</style>
    {children}
  </a>
);

export default ProjectLink;
