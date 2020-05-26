import styled from "styled-components/native";

import { colors } from "../styles/palette";

type LoaderProps = {
  noExpand?: boolean;
};

const Loader = styled.ActivityIndicator.attrs(({ theme, color, size }) => ({
  color: theme[color] || colors[color] || color,
  size: size || "small"
}))<LoaderProps>`
  flex: ${({ noExpand }) => (noExpand ? 0 : 1)};
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.background || colors.white};
`;

export default Loader;
