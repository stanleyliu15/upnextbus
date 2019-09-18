import { createAction } from "typesafe-actions";
import { ThemeColor } from "../../../styles";

export const setThemeColor = createAction(
  "@settings/SET_THEME_COLOR",
  action => (themeColor: ThemeColor) => action({ themeColor })
);

export const setMaxStopDistance = createAction(
  "@settings/SET_MAX_STOP_DISTANCE",
  action => (maxStopDistance: number) => action({ maxStopDistance })
);

export const setPredictionListLimit = createAction(
  "@settings/SET_PREDICTION_LIST_LIMIT",
  action => (predictionListLimit: number) => action({ predictionListLimit })
);
