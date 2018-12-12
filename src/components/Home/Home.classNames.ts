import { mergeStyleSets } from "@uifabric/merge-styles";
import { memoizeFunction } from "@uifabric/utilities";

export interface IHomeClassNames {
  container: string;
  button: string;
  numberDisplay: string;
}

const container = {
  display: "flex",
  flexFlow: "row nowrap",
  alignItems: "center",
  justifyContent: "center",
  width: "300px",
  margin: "auto"
};

const button = {
  width: "40px",
  height: "40px",
  backgroundColor: "antiquewhite",
  border: "1px solid #ecd6b9",
  fontWeight: "bold",
  fontSize: "22px",
  borderRadius: "5px",
  color: "#867155",
  cursor: "pointer",
  selectors: {
    ":focus": {
      outline: "none"
    }
  }
};

const numberDisplay = {
  margin: "20px",
  width: "50px",
  fontSize: "36px",
  textAlign: "center"
};

export const getClassNames = memoizeFunction(
  (): IHomeClassNames => {
    let styleSet = { container, button, numberDisplay };
    return mergeStyleSets(styleSet) as any;
  }
);
