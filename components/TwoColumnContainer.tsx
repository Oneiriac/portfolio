import * as React from "react";
import { ReactHTML } from "react";
import css from "styled-jsx/css";
import { MIN_GUTTER_WIDTH } from "./constants";

export interface FlexColumnProps extends React.HTMLAttributes<any> {
  as?:
    | keyof ReactHTML
    | React.FunctionComponent<any>
    | React.ComponentClass<any>;
  columnBasis: string;
  columnSpans: [number, number];
  [key: string]: any;
}

export const twoColumnContainerCss = (
  columnSpans: [number, number],
  columnBasis: string
) => css.resolve`
  & {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    /* Hack to get column gap with flexbox */
    margin-right: -${MIN_GUTTER_WIDTH};
    /* column-gap: 3.5vw; */ /* Switch to this when supported widely outside Firefox */
  }

  & > :global(*) {
    margin-right: max(
      ${MIN_GUTTER_WIDTH},
      3.5vw
    ); /* Larger gap on larger devices where there are multiple columns */
  }

  & > :global(*:nth-child(1)) {
    flex: ${columnSpans[0]} 1 calc(${columnSpans[0]} * ${columnBasis});
  }

  & > :global(*:nth-child(2)) {
    flex: ${columnSpans[1]} 1 calc(${columnSpans[1]} * ${columnBasis});
  }
`;

/**
 * Layout component to make building flex layouts with unequal-size columns easier.
 * @param [as] - component to render: can be either a string (for an inbuilt DOM tag) or a React component
 * @param columnBasis - width of 1 column in the flex layout
 * @param columnSpans - number of columns in the layout that this component should span
 * @param children
 * @param props
 */
const TwoColumnContainer: React.FunctionComponent<FlexColumnProps> = ({
  as: Component = "div",
  columnBasis,
  columnSpans,
  className,
  children,
  ...props
}) => {
  const containerCss = twoColumnContainerCss(columnSpans, columnBasis);
  return (
    <Component
      className={`${containerCss.className} ${
        className ? ` ${className}` : ""
      }`}
      {...props}
    >
      {containerCss.styles}

      {children}
    </Component>
  );
};
export default TwoColumnContainer;
