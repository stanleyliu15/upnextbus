import {
  getAgenciesAsync,
  getRoutesAsync,
  getNearbyPredictionListAsync,
  selectAgencyId
} from "./actions";
import { ThunkDispatch, ThunkResult } from "../../types";
import * as NextBusService from "../../../services/nextbus-service";
import NextBusAPI from "../../../api/NextBus/api";
import { getLocationAsync } from "../../../services/location-service";
import NextBusMobileAPI from "../../../api/NextBusMobile/api";
import { NextBusNoNearbyAgencyError } from "../../../errors";

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
    dispatch(getNearbyPredictionListAsync.request());
    const location = await getLocationAsync();

    try {
      if (getState().nextBus.selectedAgencyId === null) {
        const nearestAgencyId = await NextBusMobileAPI.getNearestAgencyIdByLocation(location);
        if (!nearestAgencyId) {
          throw new NextBusNoNearbyAgencyError();
        }

        dispatch(selectAgencyId(nearestAgencyId));
        await dispatch(getRoutes());
      }

      const { routes, selectedAgencyId, favorites, routeIdFilters } = getState().nextBus;
      const { maxStopDistance, predictionListLimit, showInactivePredictions } = getState().settings;

      const predictionsList = await NextBusService.getNearbyPredictionsList(
        {
          agencyId: selectedAgencyId,
          routes: routes.data,
          maxStopDistance,
          location,
          favorites,
          routeIdFilters,
          filterInactivePredictions: showInactivePredictions
        },
        { listLimit: predictionListLimit }
      );
      dispatch(getNearbyPredictionListAsync.success(predictionsList));
    } catch (error) {
      dispatch(getNearbyPredictionListAsync.failure(error));
    }
  };
}
