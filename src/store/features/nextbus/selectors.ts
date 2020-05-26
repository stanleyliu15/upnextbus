import { RootState } from "../../types";

export const selectAgencies = (state: RootState) => state.nextBus.agencies;

export const selectRoutes = (state: RootState) => state.nextBus.routes;

export const selectNearbyPredictionList = (state: RootState) => state.nextBus.nearbyPredictionsList;

export const selectNearestAgencyId = (state: RootState) => state.nextBus.nearestAgencyId;
