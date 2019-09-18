import { createReducer } from "typesafe-actions";

import { SettingsState } from "./types";
import { ThemeColor } from "../../../styles";
import * as actions from "./actions";

const initialState: SettingsState = {
  themeColor: ThemeColor.LIGHT,
  maxStopDistance: 5,
  predictionListLimit: 3
};

const reducer = createReducer<SettingsState>(initialState)
  .handleAction(actions.setThemeColor, (state, action) => ({
    ...state,
    themeColor: action.payload.themeColor
  }))
  .handleAction(actions.setMaxStopDistance, (state, action) => ({
    ...state,
    maxStopDistance: action.payload.maxStopDistance
  }))
  .handleAction(actions.setPredictionListLimit, (state, action) => ({
    ...state,
    predictionListLimit: action.payload.predictionListLimit
  }));

export { reducer as settingsReducer };
