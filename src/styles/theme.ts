import { ThemeColor, Theme } from "./types";
import * as palette from "./palette";

/**
 * Helper to get theme from the theme color
 * @param themeColor
 */
export const fromThemeColor = (themeColor = ThemeColor.LIGHT): Theme => {
  const light = themeColor === ThemeColor.LIGHT;
  return {
    ...palette.baseColors,
    ...(light ? palette.lightStatusColors : palette.darkStatusColors),
    ...(light ? palette.lightColors : palette.darkColors)
  };
};
