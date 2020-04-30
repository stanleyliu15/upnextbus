import {
  getAgenciesAsync,
  getRoutesAsync,
  getNearbyPredictionListAsync,
  selectAgencyId
} from "./actions";
import { ThunkDispatch, ThunkAction } from "../../types";
import * as NextBusService from "../../../services/nextbus-service";
import NextBusAPI from "../../../api/NextBus/api";
import { getLocationAsync } from "../../../services/location-service";
import NextBusMobileAPI from "../../../api/NextBusMobile/api";

export function getAgencies(): ThunkAction<Promise<void>> {
  return async function(dispatch: ThunkDispatch, _getState) {
    dispatch(getAgenciesAsync.request());
    try {
      const agencies = await NextBusAPI.getAgencies();
      dispatch(getAgenciesAsync.success(agencies));
    } catch (error) {
      dispatch(getAgenciesAsync.failure(error));
    }
  };
}

// todo: some agencies add/remove routes so should merge the current with the new set
// maybe should be called updateRoutes
export function getRoutes(): ThunkAction<Promise<void>> {
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

export function getNearbyPredictionsList(): ThunkAction<Promise<void>> {
  return async function(dispatch: ThunkDispatch, getState) {
    dispatch(getNearbyPredictionListAsync.request());

    try {
      const location = await getLocationAsync();
      const { nextBus, settings } = getState();

      if (nextBus.selectedAgencyId === null) {
        const nearestAgencyId = await NextBusMobileAPI.getNearestAgencyIdByLocation(location);
        dispatch(selectAgencyId(nearestAgencyId));
        await dispatch(getRoutes());
      }

      const { routes, selectedAgencyId, favorites, routeIdFilters } = nextBus;
      const { maxStopDistance, predictionListLimit, showInactivePredictions } = settings;
      const predictionsList = await NextBusService.getNearbyPredictionsList(
        {
          agencyId: selectedAgencyId,
          routes: routes.data,
          maxStopDistance,
          location,
          favorites,
          routeIdFilters,
          filterInactivePredictions: !showInactivePredictions
        },
        { listLimit: predictionListLimit }
      );

      dispatch(getNearbyPredictionListAsync.success(predictionsList));
    } catch (error) {
      dispatch(getNearbyPredictionListAsync.failure(error));
    }
  };
}
