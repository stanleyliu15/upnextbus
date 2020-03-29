import { createReducer } from "typesafe-actions";

import { SettingsState, RouteNameOption } from "./types";
import { ThemeColor } from "../../../styles";
import * as actions from "./actions";

const initialState: SettingsState = {
  themeColor: ThemeColor.LIGHT,
  maxStopDistance: 1,
  predictionListLimit: 3,
  routeNameOption: RouteNameOption.Name,
  showInactivePredictions: true
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
  .handleAction(actions.setRouteNameOption, (state, action) => ({
    ...state,
    routeNameOption: action.payload
  }))
  .handleAction(actions.setShowInactivePredictions, (state, action) => ({
    ...state,
    showInactivePredictions: action.payload
  }));

export { reducer as settingsReducer };
