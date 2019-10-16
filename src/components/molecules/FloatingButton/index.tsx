import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { TouchableHighlight } from "react-native";

import { space } from "../../../styles";
import { CircularIconButton } from "../CircleIconButton";

export const FloatingButton = props => {
  const theme = useContext(ThemeContext);
  return (
    <StyledFloatingButton as={TouchableHighlight} underlayColor={theme.backgroundDark} {...props} />
  );
};

const StyledFloatingButton = styled(CircularIconButton).attrs(props => ({
  ...props
}))`
  position: absolute;

  left: ${space.xxxLarge};
  bottom: ${space.xxxLarge};

  background-color: ${({ theme }) => theme.backgroundLight};

  padding: 0;

  z-index: 1px;
`;
