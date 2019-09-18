import { lighten } from "polished";

import { ThemeColor, Palette, BaseColors, StatusColors, AppColors } from "./types";

const baseColors: BaseColors = {
  white: "#fff",
  black: "#000",
  light: "#999",
  dark: "#333"
};

const statusColors: StatusColors = {
  success: "#99cc33",
  warning: "#ffcc00",
  disabled: "#d3d3d3",
  error: "#cc3300"
};

const lightColors: AppColors = {
  primary: "#0d47a1",
  primaryLight: "#5472d3",
  primaryDark: "#002171",
  secondary: "#2979ff",
  secondaryLight: "#75a7ff",
  secondaryDark: "#004ecb"
};

const darkColors: AppColors = {
  primary: lighten(0.2, lightColors.primary),
  primaryLight: lighten(0.2, lightColors.primaryLight),
  primaryDark: lighten(0.2, lightColors.primaryDark),
  secondary: lightColors.secondary,
  secondaryLight: lightColors.secondaryLight,
  secondaryDark: lightColors.secondaryDark
};

// TODO: inverse colors support

/**
 * Helper to get palette from the theme color
 * @param themeColor
 */
export const fromThemeColor = (themeColor = ThemeColor.LIGHT): Palette => ({
  ...baseColors,
  ...statusColors,
  ...(themeColor === ThemeColor.LIGHT ? lightColors : darkColors)
});
