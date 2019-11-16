import { AsyncResult } from "../../types";
import { NextBus } from "../../../../types";

export interface NextBusState {
  agencies: AsyncResult<NextBus.Agency[]>;
  routes: AsyncResult<NextBus.Route[]>;
  nearbyPredictionsList: AsyncResult<NextBus.Predictions[]>;
  selectedAgencyId: string | null;
  favorites: NextBus.StopLabel[];
  routeIdFilters: string[];
}
