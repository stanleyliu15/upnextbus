import { AsyncResult } from "../../types";

export interface NextBusState {
  agencies: AsyncResult<NextBus.Agency[]>;
  routes: AsyncResult<NextBus.Route[]>;
  predictions: AsyncResult<NextBus.Predictions>;
  nearbyPredictionsList: AsyncResult<NextBus.Predictions[]>;
  nearestAgencyIdByLocation: AsyncResult<string>;
  selectedAgencyId: string | null;
  favoriteRouteIds: string[];
  routeIdFilters: string[];
}
