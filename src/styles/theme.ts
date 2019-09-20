import { ThemeColor, Theme } from "./types";
import * as palette from "./palette";

/**
 * Helper to get theme from the theme color
 * @param themeColor
 */
export const fromThemeColor = (themeColor = ThemeColor.LIGHT): Theme => ({
  ...palette.baseColors,
  ...palette.statusColors,
  ...(themeColor === ThemeColor.LIGHT ? palette.lightColors : palette.darkColors)
});
