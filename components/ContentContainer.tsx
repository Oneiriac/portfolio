import * as React from "react";

const ContentContainer: React.FunctionComponent<React.HTMLAttributes<any>> = ({
  children,
  className,
  ...props
}) => (
  <div
    className={"content-container" + (className ? ` ${className}` : "")}
    {...props}
  >
    <style jsx>{`
      & {
        padding: 0 1rem;
        margin-left: auto !important;
        margin-right: auto !important;
        max-width: calc(50vw + 10rem);
      }
    `}</style>
    {children}
  </div>
);

export default ContentContainer;
