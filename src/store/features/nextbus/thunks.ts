import {
  selectAgencyId,
  getAgenciesAsync,
  getRoutesAsync,
  getPredictionsAsync,
  getNearbyPredictionListAsync,
  getNearestAgencyIdByLocationAsync
} from "./actions";
import { ThunkDispatch, ThunkResult } from "../../types";
import { getLocationAsync } from "../../../services/location-service";
import * as NextBusService from "../../../services/nextbus-service";
import NextBusAPI from "../../../api/NextBus/api";
import NextBusMobileAPI from "../../../api/NextBusMobile/api";

export function getAgencies(): ThunkResult<Promise<void>> {
  return async function(dispatch: ThunkDispatch, getState) {
    dispatch(getAgenciesAsync.request());
    try {
      const agencies = await NextBusAPI.getAgencies();
      dispatch(getAgenciesAsync.success(agencies));
    } catch (error) {
      dispatch(getAgenciesAsync.failure(error));
    }
  };
}

export function getRoutes(): ThunkResult<Promise<void>> {
  return async function(dispatch: ThunkDispatch, getState) {
    const {
      nextBus: { selectedAgencyId }
    } = getState();
    dispatch(getRoutesAsync.request());
    try {
      const agencies = await NextBusAPI.getRoutes({ agencyId: selectedAgencyId });
      dispatch(getRoutesAsync.success(agencies));
    } catch (error) {
      dispatch(getRoutesAsync.failure(error));
    }
  };
}

export function getPredictions(
  agencyId: string,
  routeId: string,
  stopId: string
): ThunkResult<Promise<void>> {
  return async function(dispatch: ThunkDispatch, getState) {
    const {
      settings: { predictionListLimit }
    } = getState();
    dispatch(getPredictionsAsync.request());
    try {
      const predictions = await NextBusAPI.getPredictions(
        { agencyId, routeId, stopId },
        { listLimit: predictionListLimit }
      );
      dispatch(getPredictionsAsync.success(predictions));
    } catch (error) {
      dispatch(getPredictionsAsync.failure(error));
    }
  };
}

export function getNearbyPredictionsList(): ThunkResult<Promise<void>> {
  return async function(dispatch: ThunkDispatch, getState) {
    const {
      nextBus: {
        routes: { data },
        selectedAgencyId
      },
      settings: { maxStopDistance, predictionListLimit }
    } = getState();
    dispatch(getNearbyPredictionListAsync.request());
    try {
      const predictionsList = await NextBusService.getNearbyPredictionsList(
        { agencyId: selectedAgencyId, routes: data, maxStopDistance },
        { listLimit: predictionListLimit }
      );
      dispatch(getNearbyPredictionListAsync.success(predictionsList));
    } catch (error) {
      dispatch(getNearbyPredictionListAsync.failure(error));
    }
  };
}

export function getNearestAgencyIdByLocation(): ThunkResult<Promise<void>> {
  return async function(dispatch: ThunkDispatch, getState) {
    dispatch(getNearestAgencyIdByLocationAsync.request());

    try {
      const location = await getLocationAsync();
      const agencyId = await NextBusMobileAPI.getNearestAgencyIdByLocation(location);
      dispatch(selectAgencyId(agencyId));
      dispatch(getNearestAgencyIdByLocationAsync.success(agencyId));
    } catch (error) {
      dispatch(getNearestAgencyIdByLocationAsync.failure(error));
    }
  };
}
