import * as React from "react";
import { MIN_GUTTER_WIDTH } from "./constants";

interface Props extends React.HTMLAttributes<any> {
  as?: keyof React.ReactHTML | React.FunctionComponent | React.ComponentClass;
}

const ContentContainer: React.FunctionComponent<Props> = ({
  as: Component = "div",
  children,
  ...props
}) => (
  <Component {...props}>
    <style jsx>{`
      & {
        padding: 0 ${MIN_GUTTER_WIDTH};
        margin-left: auto !important;
        margin-right: auto !important;
        max-width: calc(50vw + 10rem);
      }
    `}</style>
    {children}
  </Component>
);

export default ContentContainer;
