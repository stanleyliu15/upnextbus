import * as palette from "./palette";

/**
 * Helper to get theme from the theme color
 * @param themeColor
 */
export const fromThemeColor = (themeColor = palette.ThemeColor.LIGHT) => ({
  ...palette.colors,
  ...palette.themeColors[themeColor]
});

export type Theme = ReturnType<typeof fromThemeColor>;
