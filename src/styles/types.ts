export enum ThemeColor {
  LIGHT = "LIGHT",
  DARK = "DARK"
}

export type ThemeColors = ThemeColor.LIGHT | ThemeColor.DARK;

export interface BaseColors {
  white: string;
  black: string;
  light: string;
  lighter: string;
  dark: string;
  darker: string;
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

  text: string;
  textLight: string;
  textLighter: string;
  textLightest: string;
  background: string;
  backgroundDark: string;
  backgroundDarker: string;
  backgroundLight: string;
}

export interface Palette extends BaseColors, StatusColors, AppColors {}

export interface Space {
  zero: string;
  nano: string;
  small: string;
  medium: string;
  large: string;
  xLarge: string;
  xxLarge: string;
  xxxLarge: string;
  massive: string;
}

export interface FontSize {
  primary: number;

  nano: number;
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

export interface Border {
  round: string;
  full: string;
}

export interface Theme extends Palette {}
