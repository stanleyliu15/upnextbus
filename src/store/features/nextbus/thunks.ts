import {
  selectAgencyId,
  getAgenciesAsync,
  getRoutesAsync,
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
      const routes = await NextBusAPI.getRoutes({ agencyId: selectedAgencyId });
      dispatch(getRoutesAsync.success(routes));
    } catch (error) {
      dispatch(getRoutesAsync.failure(error));
    }
  };
}

export function getNearbyPredictionsList(): ThunkResult<Promise<void>> {
  return async function(dispatch: ThunkDispatch, getState) {
    const {
      nextBus: { routes, selectedAgencyId, favorites, routeIdFilters },
      settings: { maxStopDistance, predictionListLimit }
    } = getState();

    dispatch(getNearbyPredictionListAsync.request());
    try {
      const predictionsList = await NextBusService.getNearbyPredictionsList(
        {
          agencyId: selectedAgencyId,
          routes: routes.data,
          maxStopDistance,
          favorites,
          routeIdFilters
        },
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
      const nearestAgencyId = await NextBusMobileAPI.getNearestAgencyIdByLocation(location);
      dispatch(getNearestAgencyIdByLocationAsync.success(nearestAgencyId));
    } catch (error) {
      dispatch(getNearestAgencyIdByLocationAsync.failure(error));
    }
  };
}

export function getNearestAgencyIdByLocationAndRoutes(): ThunkResult<Promise<void>> {
  return (dispatch: ThunkDispatch, getState) => {
    return dispatch(getNearestAgencyIdByLocation()).then(() => {
      const {
        nextBus: { nearestAgencyIdByLocation }
      } = getState();
      dispatch(selectAgencyId(nearestAgencyIdByLocation.data));
      return dispatch(getRoutes());
    });
  };
}
