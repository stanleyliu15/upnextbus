import styled from "styled-components/native";

import { iconSize, colors, Theme, mixins } from "../styles";

type LoaderProps = {
  noExpand?: boolean;
  color: keyof Theme | string;
  size: keyof typeof iconSize;
};

const Loader = styled.ActivityIndicator.attrs(({ theme, color, size }) => ({
  color: theme[color] || colors[color] || theme.primary,
  size: iconSize[size] || iconSize.sm
}))<LoaderProps>`
  flex: ${({ noExpand }) => (noExpand ? 0 : 1)};
  ${mixins.flexColumnCenter}
  background-color: ${({ theme }) => theme.background || colors.white};
`;

export default Loader;
