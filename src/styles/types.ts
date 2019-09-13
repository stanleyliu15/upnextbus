export const enum ThemeColor {
  LIGHT = "LIGHT",
  DARK = "DARK"
}

export type ThemeColors = ThemeColor.LIGHT | ThemeColor.DARK;

export interface BaseColors {
  white: string;
  black: string;
  light: string;
  dark: string;
}

export interface StatusColors {
  success: string;
  warning: string;
  disabled: string;
  error: string;
}

export interface AppColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;
}

export interface Palette extends BaseColors, StatusColors, AppColors {}

export interface Space {
  zero: number;
  nano: number;
  small: number;
  medium: number;
  large: number;
  xLarge: number;
  xxLarge: number;
  xxxLarge: number;
}

export interface FontSize {
  small: number;
  medium: number;
  large: number;
  xLarge: number;
  xxLarge: number;
  xxxLarge: number;
}

export interface FontFamily {
  light: string;
  normal: string;
  semiBold: string;
  bold: string;
}

export interface Theme {
  palette: Palette;
  space: Space;
  fontSize: FontSize;
  fontFamily: FontFamily;
}
