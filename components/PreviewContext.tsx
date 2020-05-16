import * as React from "react";
import { useContext } from "react";

type PreviewProps = {
  preview: boolean;
  setPreview: React.Dispatch<React.SetStateAction<boolean>>;
};

const PreviewContext = React.createContext<PreviewProps>({
  preview: false,
  setPreview: () => {},
});

export function usePreview(newPreviewValue: boolean | undefined) {
  const { setPreview } = useContext(PreviewContext);
  setPreview(!!newPreviewValue);
}

export const PreviewProvider: React.FunctionComponent = ({ children }) => {
  const [preview, setPreview] = React.useState<boolean>(false);

  return (
    <PreviewContext.Provider value={{ preview, setPreview }}>
      {children}
    </PreviewContext.Provider>
  );
};

export default PreviewContext;
