import { createAction, createAsyncAction } from "typesafe-actions";
import { NextBus } from "../../../../types";

export const selectAgencyId = createAction(
  "@nextBus/SELECT_AGENCY_ID",
  action => (agencyId: string) => action(agencyId)
);

export const filterRouteIds = createAction(
  "@nextbus/FILTER_ROUTE_IDS",
  action => (routeIds: string[]) => action(routeIds)
);

export const favorite = createAction(
  "@nextbus/FAVORITE",
  action => (routeId: string, stopId: string) => action({ routeId, stopId })
);

export const unfavorite = createAction(
  "@nextbus/UNFAVORITE",
  action => (routeId: string, stopId: string) => action({ routeId, stopId })
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
