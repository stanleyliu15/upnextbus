import { lighten } from "polished";

export enum ThemeColor {
  LIGHT = "LIGHT",
  DARK = "DARK"
}

type ThemeColors = {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  secondaryLight: string;

  text: string;
  textLight: string;
  textLighter: string;

  background: string;
  backgroundDark: string;
  backgroundLight: string;
};

export const colors = {
  white: "#fff",
  black: "#000",
  blackOff: "#333",
  gray: "#999",
  grayLight: "#d3d3d3",
  green: "#99cc33",
  yellow: "#ffcc00",
  blue: "#0d47a1",
  blueLight: "#2979ff",
  navyBlue: "#002171",
  indigo: "#5472d3",
  blueIndigo: "#75a7ff",
  orange: "#ff9506",
  purple: "#9852f9"
};

export const themeColors: { [key in ThemeColor]: ThemeColors } = {
  [ThemeColor.LIGHT]: {
    primary: colors.blue,
    primaryLight: colors.indigo,
    primaryDark: colors.navyBlue,
    secondary: colors.blueLight,
    secondaryLight: colors.blueIndigo,

    text: colors.black,
    textLight: "#555",
    textLighter: "#777",

    background: "#f4f4f4",
    backgroundLight: colors.white,
    backgroundDark: "#e0e0e0"
  },
  [ThemeColor.DARK]: {
    primary: lighten(0.25, colors.blue),
    primaryLight: lighten(0.25, colors.indigo),
    primaryDark: lighten(0.2, colors.navyBlue),
    secondary: colors.blueLight,
    secondaryLight: colors.blueIndigo,

    text: colors.white,
    textLight: colors.grayLight,
    textLighter: "#e0e0e0",

    background: "#4d4d4d",
    backgroundDark: colors.blackOff,
    backgroundLight: "#404040"
  }
};
