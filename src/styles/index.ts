import { Theme, ThemeColor } from "./types";
import { fromThemeColor as paletteFromThemeColor } from "./palette";

import * as typography from "./typography";
import * as space from "./space";

/**
 * Helper to get theme from the theme color
 * @param themeColor
 */
export const fromThemeColor = (themeColor = ThemeColor.LIGHT): Theme => ({
  palette: paletteFromThemeColor(themeColor),
  fontSize: typography.fontSize,
  fontFamily: typography.fontFamily,
  space: space.space
});

export * from "./types";
