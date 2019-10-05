import { RootState } from "../../types";
import { ThemeColor } from "../../../styles";

export const selectSettings = (state: RootState) => state.settings;

export const selectThemeColor = (state: RootState) => state.settings.themeColor;

export const selectDistanceLimit = (state: RootState) => state.settings.maxStopDistance;

export const selectPredictionListLimit = (state: RootState) => state.settings.predictionListLimit;

export const selectRouteNameOption = (state: RootState) => state.settings.routeNameOption;
