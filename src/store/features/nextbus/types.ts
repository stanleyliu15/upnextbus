import { AsyncResult } from "../../types";

export interface NextBusState {
  agencies: AsyncResult<NextBus.Agency[]>;
  routes: AsyncResult<NextBus.Route[]>;
  nearbyPredictionsList: AsyncResult<NextBus.Predictions[]>;
  nearestAgencyIdByLocation: AsyncResult<string>;
  selectedAgencyId: string | null;
  favorites: NextBus.StopLabel[];
  routeIdFilters: string[];
}
