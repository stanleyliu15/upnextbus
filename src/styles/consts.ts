import { Theme } from "./theme";

export const borderSize = {
  xs: "0.33px",
  sm: "0.5px",
  md: "1px"
};

export const borderRadius = {
  round: 6,
  full: 9999
};

type BorderProps = {
  direction?: "top" | "bottom" | "left" | "right";
  size?: keyof typeof borderSize;
  style?: "solid" | "dashed" | "dotted";
  color?: keyof Theme | string;
};

export const border = ({
  direction = null,
  size = "xs",
  color = null,
  style = "solid"
}: BorderProps) => ({ theme }) => `
  border-color: ${theme[color] || color || theme.border};
  border-${direction ? `${direction}-` : ""}width: ${borderSize[size]};
  border-style: ${style};
`;
