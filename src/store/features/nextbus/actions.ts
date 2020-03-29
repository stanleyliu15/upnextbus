import { createAction, createAsyncAction } from "typesafe-actions";
import { NextBus } from "../../../../types";

export const selectAgencyId = createAction(
  "@nextBus/SELECT_AGENCY_ID",
  (agencyId: string) => agencyId
)();

export const filterRouteIds = createAction(
  "@nextbus/FILTER_ROUTE_IDS",
  (routeIds: string[]) => routeIds
)();

export const favorite = createAction("@nextbus/FAVORITE", (routeId: string, stopId: string) => ({
  routeId,
  stopId
}))();

export const unfavorite = createAction(
  "@nextbus/UNFAVORITE",
  (routeId: string, stopId: string) => ({ routeId, stopId })
)();

export const getAgenciesAsync = createAsyncAction(
  "@nextbus/GET_AGENICES_REQUEST",
  "@nextbus/GET_AGENICES_SUCCESS",
  "@nextbus/GET_AGENICES_FAILURE"
)<void, NextBus.Agency[], Error>();

export const getRoutesAsync = createAsyncAction(
  "@nextbus/GET_ROUTES_REQUEST",
  "@nextbus/GET_ROUTES_SUCCESS",
  "@nextbus/GET_ROUTES_FAILURE"
)<void, NextBus.Route[], Error>();

export const getNearbyPredictionListAsync = createAsyncAction(
  "@nextbus/GET_NEARBY_PREDICTION_LIST_REQUEST",
  "@nextbus/GET_NEARBY_PREDICTION_LIST_SUCCESS",
  "@nextbus/GET_NEARBY_PREDICTION_LIST_FAILURE"
)<void, NextBus.Predictions[], Error>();
