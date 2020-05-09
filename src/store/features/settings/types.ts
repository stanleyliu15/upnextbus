import { ThemeColor } from "../../../styles";
import { NextBus } from "../../../../types";

export interface SettingsState {
  themeColor: ThemeColor;
  maxStopDistance: number;
  predictionListLimit: number;
  showRouteIdForDisplay: boolean;
  showInactivePredictions: boolean;
  selectedAgencyId: string | null;
  favoriteStopLabels: { [agencyId: string]: NextBus.StopLabel[] };
  routeIdFilters: { [agencyId: string]: string[] };
}
