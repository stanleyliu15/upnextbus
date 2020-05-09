import { createAction } from "typesafe-actions";

import { ThemeColor } from "../../../styles";
import { NextBus } from "../../../../types";

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

export const setShowRouteIdForDisplay = createAction(
  "@settings/SET_SHOW_ROUTE_ID_FOR_DISPLAY",
  (showRouteIdForDisplay: boolean) => showRouteIdForDisplay
)();

export const setShowInactivePredictions = createAction(
  "@settings/SET_SHOW_INACTIVE_PREDICTIONS",
  (showInactivePredictions: boolean) => showInactivePredictions
)();

export const selectAgencyId = createAction(
  "@settings/SELECT_AGENCY_ID",
  (agencyId: string) => agencyId
)();

export const filterRouteIds = createAction(
  "@settings/FILTER_ROUTE_IDS",
  (routeIds: string[]) => routeIds
)();

export const favoriteStopLabel = createAction(
  "@settings/FAVORITE_STOP_LABEL",
  (stopLabel: NextBus.StopLabel) => stopLabel
)();

export const unfavoriteStopLabel = createAction(
  "@settings/UNFAVORITE_STOP_LABEL",
  (stopLabel: NextBus.StopLabel) => stopLabel
)();

export const setFavoriteStopLabels = createAction(
  "@settings/SET_FAVORITE_STOP_LABELS",
  (stopLabels: NextBus.StopLabel[]) => stopLabels
)();
