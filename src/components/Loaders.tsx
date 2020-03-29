import styled from "styled-components/native";

import { colors } from "../styles/palette";

export const Loader = styled.ActivityIndicator.attrs(({ theme, color, size }) => ({
  color: color || theme.primary,
  size: size || "small"
}))`
  flex: 1;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.background};
`;

export const AppLoader = styled(Loader).attrs(_props => ({
  color: colors.white
}))`
  background-color: ${colors.blue};
`;
