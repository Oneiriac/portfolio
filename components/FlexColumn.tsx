import * as React from "react";
import { ReactHTML } from "react";

export interface FlexColumnProps extends React.HTMLAttributes<any> {
  as: keyof ReactHTML | React.FunctionComponent | React.ComponentClass;
  columnBasis: string;
  columnSpan: number;
}

/**
 * Layout component to make building flex layouts with unequal-size columns easier.
 * @param [as] - component to render: can be either a string (for an inbuilt DOM tag) or a React component
 * @param columnBasis - width of 1 column in the flex layout
 * @param columnSpan - number of columns in the layout that this component should span
 * @param [className] - class name(s) to add to this component
 * @param children
 * @param props
 */
const FlexColumn: React.FunctionComponent<FlexColumnProps> = ({
  as: Component = "div",
  columnBasis,
  columnSpan,
  className = "",
  children,
  ...props
}) => (
  <Component
    className={`flex-column${className ? ` ${className}` : ""}`}
    {...props}
  >
    <style jsx>{`
      .flex-column {
        flex: ${columnSpan} 1 calc(${columnSpan}* ${columnBasis});
      }
    `}</style>

    {children}
  </Component>
);
export default FlexColumn;
