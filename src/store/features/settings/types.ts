import { ThemeColor } from "../../../styles";

export enum RouteNameOption {
  "Identifier" = "routeId",
  "Name" = "routeName"
}

export interface SettingsState {
  themeColor: ThemeColor;
  maxStopDistance: number;
  predictionListLimit: number;
  routeNameOption: RouteNameOption;
  showInactivePredictions: boolean;
}
