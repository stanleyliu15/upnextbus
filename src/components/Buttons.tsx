import React from "react";
import {
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableOpacityProps,
  TouchableNativeFeedbackProps,
  StyleSheet,
  View,
  TouchableHighlightProps
} from "react-native";
import styled, { useTheme } from "styled-components/native";

import Loader from "./Loader";
import { space, borderRadius, Theme, colors, iconSize } from "../styles";

type BaseButtonProps =
  | Pick<TouchableOpacityProps, keyof TouchableOpacityProps>
  | Pick<TouchableNativeFeedbackProps, keyof TouchableNativeFeedbackProps>;
export type ButtonProps = BaseButtonProps & { loading?: boolean };
export const Button: React.FC<ButtonProps> = ({ children, style, loading, disabled, ...rest }) => {
  const theme = useTheme();
  const buttonStyle = StyleSheet.flatten([
    {
      paddingVertical: parseInt(space.md, 10),
      paddingHorizontal: parseInt(space.xxxlg, 10),
      borderRadius: parseInt(borderRadius.round, 10),
      backgroundColor: disabled ? theme.gray : theme.primary
    },
    style
  ]);
  const buttonContent = loading ? <Loader color="white" noExpand /> : children;

  if (Platform.OS === "ios") {
    return (
      <TouchableOpacity style={buttonStyle} disabled={disabled} {...rest}>
        {buttonContent}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableNativeFeedback {...rest}>
      <View style={buttonStyle}>{buttonContent}</View>
    </TouchableNativeFeedback>
  );
};

export type CircleIconButtonProps = ButtonProps & { iconSize: keyof typeof iconSize };
export const CircleIconButton = styled(Button)<CircleIconButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ iconSize: iSize }) => iconSize[iSize] * 2}px;
  height: ${({ iconSize: iSize }) => iconSize[iSize] * 2}px;
  padding: 0;

  border-radius: ${borderRadius.full};
`;

export type FloatCircleIconButtonProps = { position: "left" | "right" };
export const FloatCircleIconButton = styled(CircleIconButton)<FloatCircleIconButtonProps>`
  position: absolute;
  bottom: ${space.md};
  left: ${({ position }) => (position === "left" ? space.md : "auto")};
  right: ${({ position }) => (position === "right" ? space.md : "auto")};
  z-index: 1;

  background-color: ${({ theme }) => theme.background};
`;

export type HighlightButtonProps = TouchableHighlightProps & {
  highlightColor?: keyof Theme | string;
};
export const HighlightButton = styled.TouchableHighlight.attrs<HighlightButtonProps>(
  ({ theme, highlightColor }) => ({
    underlayColor:
      theme[highlightColor] || colors[highlightColor] || highlightColor || theme.highlight
  })
)<HighlightButtonProps>``;
