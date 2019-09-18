import { createAsyncAction } from "typesafe-actions";

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

export const getPredictionsAsync = createAsyncAction(
  "@nextbus/GET_PREDICTIONS_REQUEST",
  "@nextbus/GET_PREDICTIONS_SUCCESS",
  "@nextbus/GET_PREDICTIONS_FAILURE"
)<undefined, NextBus.Predictions, Error>();

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
