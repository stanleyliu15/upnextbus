import { Theme } from "./theme";
import { colors } from "./palette";
import { borderSize } from "./consts";

type BorderProps = {
  direction?: "top" | "bottom" | "left" | "right";
  size?: keyof typeof borderSize;
  style?: "solid" | "dashed" | "dotted";
  color?: keyof Theme | string;
};

const mixins = {
  flexRowCenter: `
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `,
  flexColumnCenter: `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  border: ({ direction = null, size = "sm", color = null, style = "solid" }: BorderProps) => ({
    theme
  }) => `
    border-color: ${theme[color] || colors[color] || color || theme.border};
    border-${direction ? `${direction}-` : ""}width: ${borderSize[size]};
    border-style: ${style};
  `
};

export default mixins;
