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
  backgroundDarker: string;
  backgroundLight: string;
};

export const colors = {
  white: "#fff",
  light: "#999",
  lighter: "#d3d3d3",
  black: "#000",
  dark: "#333",
  darker: "#222",
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
    backgroundLight: "#fff",
    backgroundDark: "#e0e0e0",
    backgroundDarker: "#c0c0c0"
  },
  [ThemeColor.DARK]: {
    primary: lighten(0.25, colors.blue),
    primaryLight: lighten(0.025, colors.indigo),
    primaryDark: lighten(0.2, colors.navyBlue),
    secondary: colors.blueLight,
    secondaryLight: colors.blueIndigo,

    text: colors.white,
    textLight: colors.lighter,
    textLighter: "#e0e0e0",

    background: "#4d4d4d",
    backgroundDark: "#333",
    backgroundDarker: "#222",
    backgroundLight: "#404040"
  }
};
