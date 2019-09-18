import { createAction } from "typesafe-actions";

export const selectAgencyId = createAction(
  "@nextBus/SELECT_AGENCY_ID",
  action => (agencyId: string) => action(agencyId)
);

export const filterRouteIds = createAction(
  "@nextbus/FILTER_ROUTE_IDS",
  action => (routeIds: string[]) => action(routeIds)
);

export const favoriteRouteId = createAction(
  "@nextbus/FAVORITE_ROUTE_ID",
  action => (routeId: string) => action(routeId)
);

export const unfavoriteRouteId = createAction(
  "@nextbus/UNFAVORITE_ROUTE_ID",
  action => (routeId: string) => action(routeId)
);
