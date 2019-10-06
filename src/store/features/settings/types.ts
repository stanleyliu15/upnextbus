import { ThemeColor } from "../../../styles/types";

export enum RouteNameOption {
  "Identifier" = "routeId",
  "Name" = "routeName"
}

export interface SettingsState {
  themeColor: ThemeColor;
  maxStopDistance: number;
  predictionListLimit: number;
  routeNameOption: RouteNameOption;
}
