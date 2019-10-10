import { lighten } from "polished";

import { BaseColors, StatusColors, AppColors } from "./types";

// TODO: inverse colors for baseColors for dark mode

export const baseColors: BaseColors = {
  white: "#fff",
  black: "#000",
  light: "#999",
  lighter: "#d3d3d3",
  dark: "#333",
  darker: "#222"
};

export const statusColors: StatusColors = {
  success: "#99cc33",
  warning: "#ffcc00",
  disabled: "#d3d3d3",
  error: "#ff0000"
};

export const lightColors: AppColors = {
  primary: "#0d47a1",
  primaryLight: "#5472d3",
  primaryDark: "#002171",
  secondary: "#2979ff",
  secondaryLight: "#75a7ff",
  secondaryDark: "#004ecb",

  text: "#000",
  textLight: "#555",
  textLighter: "#777",
  textLightest: "#999",
  background: "#f4f4f4",
  backgroundDark: "",
  backgroundLight: "#fff"
};

export const darkColors: AppColors = {
  primary: lighten(0.2, lightColors.primary),
  primaryLight: lighten(0.2, lightColors.primaryLight),
  primaryDark: lighten(0.2, lightColors.primaryDark),
  secondary: lightColors.secondary,
  secondaryLight: lightColors.secondaryLight,
  secondaryDark: lightColors.secondaryDark,

  text: "#fff",
  textLight: "#d3d3d3",
  textLighter: "#e0e0e0",
  textLightest: "#ededed",

  background: "#333",
  backgroundDark: "",
  backgroundLight: "#444"
};
