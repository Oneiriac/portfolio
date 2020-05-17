import * as React from "react";

type Props = {
  gridProps?: React.HTMLAttributes<any>;
  containerProps?: React.HTMLAttributes<any>;
};

const ContentContainer: React.FunctionComponent<Props> = ({
  children,
  gridProps: { className: gridClassName, ...restGridProps } = {},
  containerProps: { className: containerClassName, ...restContainerProps } = {},
}) => (
  <div
    className={`content-grid${gridClassName ? ` ${gridClassName}` : ""}`}
    {...restGridProps}
  >
    <style jsx>{`
      .content-grid {
        width: 100%;
        display: grid;
        grid-template-columns: minmax(3rem, 1fr) minmax(0, 6fr) minmax(
            3rem,
            1fr
          );
        flex-grow: 1;
      }

      .content-container {
        padding: 1rem 0;
      }
    `}</style>
    <div />
    <div
      className={`content-container${
        containerClassName ? ` ${containerClassName}` : ""
      }`}
      {...restContainerProps}
    >
      {children}
    </div>
    <div />
  </div>
);

export default ContentContainer;
