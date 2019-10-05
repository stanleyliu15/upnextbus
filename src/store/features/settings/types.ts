import { ThemeColor } from "../../../styles/types";

export enum RouteNameOption {
  "Identifier" = "id",
  "Name" = "name",
  "Short Name" = "shortName"
}

export interface SettingsState {
  themeColor: ThemeColor;
  maxStopDistance: number;
  predictionListLimit: number;
  routeNameOption: RouteNameOption;
}
