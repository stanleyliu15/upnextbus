import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { NextBus } from "./nextBus";
import { GeoLocation } from "./utils";

export type RootStackParamList = {
  Nearby: undefined;
  Detail: undefined;
  Settings: undefined;
} & DetailStackParamList &
  SettingsStackParamList;

export type DetailStackParamList = {
  DetailScreen: {
    predictions?: NextBus.Predictions;
    route?: NextBus.Route;
    direction?: NextBus.Direction;
    stop?: NextBus.Stop;
  };
  ChangeDirectionScreen: {
    direction: NextBus.Direction;
    directions: NextBus.Direction[];
    directionIds: string[];
    predictionsDirectionName: string;
    location: GeoLocation | null;
  };
  ChangeStopScreen: {
    stop: NextBus.Stop;
    stops: NextBus.Stop[];
  };
  ServiceAlertsScreen: {
    serviceAlerts: NextBus.ServiceAlert[];
  };
};

export type SettingsStackParamList = {
  SettingsScreen: undefined;
  ChangeAgencyScreen: undefined;
  ChangeFilterRoutesScreen: {
    routeIds: string[];
  };
  ChangeDistanceLimitScreen: undefined;
  ChangePredictionsLimitScreen: undefined;
  ChangeRouteNameOptionScreen: undefined;
  ChangeThemeScreen: undefined;
  ChangeShowInactivePredictionsScreen: undefined;
  ChangeFavoriteStopLabelsScreen: undefined;
};
