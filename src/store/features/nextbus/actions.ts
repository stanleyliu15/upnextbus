import { createAction, createAsyncAction } from "typesafe-actions";

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

export const getAgenciesAsync = createAsyncAction(
  "@nextbus/GET_AGENICES_REQUEST",
  "@nextbus/GET_AGENICES_SUCCESS",
  "@nextbus/GET_AGENICES_FAILURE"
)<undefined, NextBus.Agency[], Error>();

export const getRoutesAsync = createAsyncAction(
  "@nextbus/GET_ROUTES_REQUEST",
  "@nextbus/GET_ROUTES_SUCCESS",
  "@nextbus/GET_ROUTES_FAILURE"
)<undefined, NextBus.Route[], Error>();

export const getNearbyPredictionListAsync = createAsyncAction(
  "@nextbus/GET_NEARBY_PREDICTION_LIST_REQUEST",
  "@nextbus/GET_NEARBY_PREDICTION_LIST_SUCCESS",
  "@nextbus/GET_NEARBY_PREDICTION_LIST_FAILURE"
)<undefined, NextBus.Predictions[], Error>();

export const getNearestAgencyIdByLocationAsync = createAsyncAction(
  "@nextbus/GET_NEAREST_AGENCY_ID_BY_LOCATION_REQUEST",
  "@nextbus/GET_NEAREST_AGENCY_ID_BY_LOCATION_SUCCESS",
  "@nextbus/GET_NEAREST_AGENCY_ID_BY_LOCATION_FAILURE"
)<undefined, string, Error>();
