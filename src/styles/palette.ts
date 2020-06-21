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

  border: string;
  highlight: string;
};

export const colors = {
  white: "#fff",
  black: "#000",

  grayDarkest: "#404040",
  grayDarker: "#4d4d4d",
  grayDark: "#777",
  gray: "#999",
  grayLight: "#d3d3d3",
  grayLighter: "#e0e0e0",
  grayLightest: "#f4f4f4",

  green: "#99cc33",
  red: "#d63447",
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
    textLight: colors.grayDarker,
    textLighter: colors.grayDark,

    background: colors.grayLightest,
    backgroundLight: colors.white,
    backgroundDark: colors.grayLighter,

    border: colors.grayLight,
    highlight: colors.grayLighter
  },
  [ThemeColor.DARK]: {
    primary: lighten(0.3, colors.blue),
    primaryLight: lighten(0.3, colors.indigo),
    primaryDark: lighten(0.3, colors.navyBlue),
    secondary: lighten(0.3, colors.blueLight),
    secondaryLight: colors.blueIndigo,

    text: colors.white,
    textLight: colors.grayLight,
    textLighter: colors.grayLighter,

    background: colors.grayDarkest,
    backgroundDark: colors.grayLighter,
    backgroundLight: colors.grayDarker,

    border: colors.grayLight,
    highlight: colors.grayDarkest
  }
};
