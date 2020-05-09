import { createReducer } from "typesafe-actions";
import { isEqual } from "lodash";

import * as actions from "./actions";
import { SettingsState } from "./types";
import { ThemeColor } from "../../../styles";

const initialState: SettingsState = {
  themeColor: ThemeColor.LIGHT,
  maxStopDistance: 1,
  predictionListLimit: 3,
  showRouteIdForDisplay: false,
  showInactivePredictions: false,
  selectedAgencyId: null,
  favoriteStopLabels: {},
  routeIdFilters: {}
};

const reducer = createReducer(initialState)
  .handleAction(actions.setThemeColor, (state, action) => ({
    ...state,
    themeColor: action.payload
  }))
  .handleAction(actions.setMaxStopDistance, (state, action) => ({
    ...state,
    maxStopDistance: action.payload
  }))
  .handleAction(actions.setPredictionListLimit, (state, action) => ({
    ...state,
    predictionListLimit: action.payload
  }))
  .handleAction(actions.setShowRouteIdForDisplay, (state, action) => ({
    ...state,
    showRouteIdForDisplay: action.payload
  }))
  .handleAction(actions.setShowInactivePredictions, (state, action) => ({
    ...state,
    showInactivePredictions: action.payload
  }))
  .handleAction(actions.selectAgencyId, (state, action) => ({
    ...state,
    selectedAgencyId: action.payload
  }))
  .handleAction(actions.favoriteStopLabel, (state, action) => {
    const { selectedAgencyId, favoriteStopLabels: favoriteStopLabelsMap } = state;
    const favoriteStopLabel = action.payload;
    const favoriteStopLabels = favoriteStopLabelsMap[selectedAgencyId] || [];

    return {
      ...state,
      favoriteStopLabels: {
        ...favoriteStopLabelsMap,
        [selectedAgencyId]: [...favoriteStopLabels, favoriteStopLabel]
      }
    };
  })
  .handleAction(actions.unfavoriteStopLabel, (state, action) => {
    const { selectedAgencyId, favoriteStopLabels: favoriteStopLabelsMap } = state;
    const favoriteStopLabels = favoriteStopLabelsMap[selectedAgencyId] || [];

    return {
      ...state,
      favoriteStopLabels: {
        ...favoriteStopLabelsMap,
        [selectedAgencyId]: favoriteStopLabels.filter(
          stopLabel => !isEqual(stopLabel, action.payload)
        )
      }
    };
  })
  .handleAction(actions.filterRouteIds, (state, action) => {
    const { selectedAgencyId, routeIdFilters: routeIdFiltersMap } = state;

    return {
      ...state,
      routeIdFilters: {
        ...routeIdFiltersMap,
        [selectedAgencyId]: action.payload
      }
    };
  })
  .handleAction(actions.setFavoriteStopLabels, (state, action) => {
    const { selectedAgencyId, favoriteStopLabels: favoriteStopLabelsMap } = state;

    return {
      ...state,
      favoriteStopLabels: {
        ...favoriteStopLabelsMap,
        [selectedAgencyId]: action.payload
      }
    };
  });

export { reducer as settingsReducer };
