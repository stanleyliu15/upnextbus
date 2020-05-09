import React from "react";
import {
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableOpacityProps,
  TouchableNativeFeedbackProps,
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
  TouchableHighlightProps
} from "react-native";
import styled, { useTheme } from "styled-components/native";

import { space, borderRadius, Theme } from "../styles";

type ButtonProps =
  | Pick<TouchableOpacityProps, keyof TouchableOpacityProps>
  | Pick<TouchableNativeFeedbackProps, keyof TouchableNativeFeedbackProps>;

export const Button: React.FC<ButtonProps> = ({ children, style, ...rest }) => {
  const theme = useTheme();
  const buttonStyle = StyleSheet.flatten([
    {
      paddingVertical: parseInt(space.md, 10),
      paddingHorizontal: parseInt(space.xxxlg, 10),
      borderRadius: parseInt(borderRadius.round, 10),
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

export type HighlightButtonProps = TouchableHighlightProps & {
  highlightColor: keyof Theme | string;
};
export const HighlightButton = styled.TouchableHighlight.attrs<HighlightButtonProps>(
  ({ theme, highlightColor }) => ({
    underlayColor: theme[highlightColor] || highlightColor || theme.highlight
  })
)``;

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
      borderRadius: parseInt(borderRadius.full, 10)
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
