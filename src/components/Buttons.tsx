import React, { useContext } from "react";
import {
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableOpacityProps,
  TouchableNativeFeedbackProps,
  StyleSheet,
  View,
  ViewStyle,
  StyleProp
} from "react-native";
import styled, { ThemeContext } from "styled-components/native";

import { space, borderSize, borderRadius } from "../styles";

type ButtonProps =
  | Pick<TouchableOpacityProps, keyof TouchableOpacityProps>
  | Pick<TouchableNativeFeedbackProps, keyof TouchableNativeFeedbackProps>;

export const Button: React.FC<ButtonProps> = ({ children, style, ...rest }) => {
  const theme = useContext(ThemeContext);
  const buttonStyle = StyleSheet.flatten([
    {
      paddingVertical: parseInt(space.md, 10),
      paddingHorizontal: parseInt(space.xxxlg, 10),
      borderRadius: borderRadius.round,
      backgroundColor: theme.primary
    },
    style
  ]);

  if (Platform.OS === "ios") {
    return (
      <TouchableOpacity style={buttonStyle} {...rest}>
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableNativeFeedback {...rest}>
      <View style={buttonStyle}>{children}</View>
    </TouchableNativeFeedback>
  );
};

type LinkButtonProps = { includeBottomBorder?: boolean };
export const LinkButton = styled.TouchableHighlight.attrs(({ theme, underlayColor }) => ({
  underlayColor: theme[underlayColor] || underlayColor || theme.backgroundDark
}))<LinkButtonProps>`
  display: flex;
  justify-content: center;

  padding: ${space.lg} ${space.xs} ${space.lg} ${space.md};
  border-radius: ${borderRadius.round};
  border-bottom-width: ${({ includeBottomBorder }) => (includeBottomBorder ? borderSize.sm : 0)};
  border-bottom-color: ${({ includeBottomBorder, theme }) =>
    includeBottomBorder ? theme.grayLight : "transparent"};
`;

type CircleIconButtonProps = ButtonProps & { iconSize: number };
export const CircleIconButton: React.FC<CircleIconButtonProps> = ({
  children,
  iconSize,
  style,
  ...rest
}) => {
  const buttonStyle = StyleSheet.flatten([
    {
      justifyContent: "center",
      alignItems: "center",
      width: iconSize * 2,
      height: iconSize * 2,
      borderRadius: borderRadius.full
    },
    style
  ]) as StyleProp<ViewStyle>;

  if (Platform.OS === "ios") {
    return (
      <TouchableOpacity style={buttonStyle} {...rest}>
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableNativeFeedback {...rest}>
      <View style={buttonStyle}>{children}</View>
    </TouchableNativeFeedback>
  );
};

type FloatingButtonProps = { position: "bottom-left" | "bottom-right" };
export const FloatingButton = styled(CircleIconButton)<FloatingButtonProps>`
  position: absolute;
  bottom: ${space.md};
  left: ${({ position }) => (position === "bottom-left" ? space.md : "auto")};
  right: ${({ position }) => (position === "bottom-right" ? space.md : "auto")};
  z-index: 1;
  padding: 0;

  background-color: ${({ theme }) => theme.background};
`;
