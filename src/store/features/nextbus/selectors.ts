import { RootState } from "../../types";

export const selectAgencies = (state: RootState) => state.nextBus.agencies;

export const selectRoutes = (state: RootState) => state.nextBus.routes;

export const selectFilterRouteIds = (state: RootState) => state.nextBus.routeIdFilters;

export const selectNearbyPredictionList = (state: RootState) => state.nextBus.nearbyPredictionsList;

export const selectSelectedAgencyId = (state: RootState) => state.nextBus.selectedAgencyId;

export const selectAgency = (state: RootState) => {
  const agencies = selectAgencies(state);
  const agencyId = selectSelectedAgencyId(state);

  return agencies.data.find(agency => agency.id === agencyId);
};

export const selectFavorites = (state: RootState) => state.nextBus.favorites;
