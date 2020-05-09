import { RootState } from "../../types";

export const selectSettings = (state: RootState) => state.settings;

export const selectThemeColor = (state: RootState) => state.settings.themeColor;

export const selectDistanceLimit = (state: RootState) => state.settings.maxStopDistance;

export const selectPredictionListLimit = (state: RootState) => state.settings.predictionListLimit;

export const selectShowRouteIdForDisplay = (state: RootState) =>
  state.settings.showRouteIdForDisplay;

export const selectShowInactivePredictions = (state: RootState) =>
  state.settings.showInactivePredictions;

export const selectSelectedAgencyId = (state: RootState) => state.settings.selectedAgencyId;

export const selectFilterRouteIds = (state: RootState) =>
  state.settings.routeIdFilters[state.settings.selectedAgencyId] || [];

export const selectFavoriteStopLabels = (state: RootState) =>
  state.settings.favoriteStopLabels[state.settings.selectedAgencyId] || [];
