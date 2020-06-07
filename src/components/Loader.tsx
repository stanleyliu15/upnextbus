import styled from "styled-components/native";

import { iconSize, colors, Theme } from "../styles";

type LoaderProps = {
  noExpand?: boolean;
  color: keyof Theme | string;
  size: keyof typeof iconSize;
};

const Loader = styled.ActivityIndicator.attrs(({ theme, color, size }) => ({
  color: theme[color] || colors[color] || color,
  size: iconSize[size] || iconSize.sm
}))<LoaderProps>`
  flex: ${({ noExpand }) => (noExpand ? 0 : 1)};
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.background || colors.white};
`;

export default Loader;
