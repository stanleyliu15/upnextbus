import { createAction } from "typesafe-actions";

import { ThemeColor } from "../../../styles";
import { RouteNameOption } from "./types";

export const setThemeColor = createAction(
  "@settings/SET_THEME_COLOR",
  (themeColor: ThemeColor) => themeColor
)();

export const setMaxStopDistance = createAction(
  "@settings/SET_MAX_STOP_DISTANCE",
  (maxStopDistance: number) => maxStopDistance
)();

export const setPredictionListLimit = createAction(
  "@settings/SET_PREDICTION_LIST_LIMIT",
  (predictionListLimit: number) => predictionListLimit
)();

export const setRouteNameOption = createAction(
  "@settings/SET_ROUTE_NAME_OPTION",
  (routeNameOption: RouteNameOption) => routeNameOption
)();

export const setShowInactivePredictions = createAction(
  "@settings/SET_SHOW_INACTIVE_PREDICTIONS",
  (showInactivePredictions: boolean) => showInactivePredictions
)();
