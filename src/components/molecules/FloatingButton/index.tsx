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

type StyledFloatingButtonProps = {
  position: "bottom-left" | "bottom-right";
};

const StyledFloatingButton = styled(CircularIconButton).attrs(props => ({
  ...props
}))<StyledFloatingButtonProps>`
  position: absolute;

  bottom: ${space.xxxLarge};
  left: ${({ position }) => {
    if (position === "bottom-left") return space.xxxLarge;
    return "auto";
  }};
  right: ${({ position }) => {
    if (position === "bottom-right") return space.xxxLarge;
    return "auto";
  }};
  z-index: 1px;

  background-color: ${({ theme }) => theme.background};
  padding: 0;
`;
