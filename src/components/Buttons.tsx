import React from "react";
import {
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableOpacityProps,
  TouchableNativeFeedbackProps,
  TouchableHighlight
} from "react-native";
import styled from "styled-components/native";

import { space, borderRadius } from "../styles";

export const ButtonComponent: React.ComponentType =
  Platform.OS === "ios" ? TouchableOpacity : TouchableNativeFeedback;

type ButtonProps =
  | Pick<TouchableOpacityProps, keyof TouchableOpacityProps>
  | Pick<TouchableNativeFeedbackProps, keyof TouchableNativeFeedbackProps>;

export const Button = styled(ButtonComponent)<ButtonProps>`
  padding: ${space.md} ${space.xxxlg};
  border-radius: ${borderRadius.round};
  background-color: ${({ theme }) => theme.primary};
`;

type LinkButtonProps = { includeBottomBorder?: boolean };
export const LinkButton = styled.TouchableHighlight.attrs(({ theme }) => ({
  underlayColor: theme.backgroundDark
}))<LinkButtonProps>`
  display: flex;
  justify-content: center;
  min-height: 50px;

  border-radius: ${borderRadius.round};
  padding: ${space.md} ${space.xs} ${space.md} ${space.md};

  ${({ theme, includeBottomBorder }) => {
    if (includeBottomBorder) {
      return `border-bottom-width: 0.33px; border-bottom-color: ${theme.lighter}`;
    }
  }};
`;

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const CircleIconButtonComponent = ({ children, ...props }) => (
  <ButtonComponent {...props}>
    <Wrapper>{children}</Wrapper>
  </ButtonComponent>
);

type CircleIconButtonProps = {
  iconSize?: number;
  inverse?: boolean;
};

export const CircleIconButton = styled(CircleIconButtonComponent)<CircleIconButtonProps>`
  justify-content: center;
  align-items: center;

  /** to get circle 2x the size of the icon */
  width: ${({ iconSize }) => iconSize * 2};
  height: ${({ iconSize }) => iconSize * 2};

  border-radius: ${borderRadius.full};
`;

type FloatingButtonProps = {
  position: "bottom-left" | "bottom-right";
};

const BaseFloatingButton = styled(CircleIconButton).attrs(({ theme }) => ({
  underlayColor: theme.backgroundDark
}))<FloatingButtonProps>`
  position: absolute;
  bottom: ${space.xlg};
  left: ${({ position }) => {
    if (position === "bottom-left") return space.xlg;
    return "auto";
  }};
  right: ${({ position }) => {
    if (position === "bottom-right") return space.xlg;
    return "auto";
  }};
  z-index: 1px;

  background-color: ${({ theme }) => theme.background};
  padding: 0;
`;

export const FloatingButton = props => <BaseFloatingButton as={TouchableHighlight} {...props} />;
