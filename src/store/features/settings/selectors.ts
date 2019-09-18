import { RootState } from "../../types";

export const themeColorSelector = (state: RootState) => state.settings.themeColor;
