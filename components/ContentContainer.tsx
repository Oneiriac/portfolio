import * as React from "react";

const ContentContainer: React.FunctionComponent = ({ children }) => (
  <div className="content-grid">
    <style jsx>{`
      .content-grid {
        width: 100%;
        display: grid;
        grid-template-columns: minmax(1.2rem, 1fr) minmax(0, 4fr) minmax(
            1.2rem,
            1fr
          );
        flex-grow: 1;
      }

      .content-container {
        padding: 2rem 0;
      }
    `}</style>
    <div />
    <div className="content-container">{children}</div>
    <div />
  </div>
);

export default ContentContainer;
