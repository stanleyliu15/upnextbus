import {
  getAgenciesAsync,
  getRoutesAsync,
  getNearbyPredictionListAsync,
  getNearestAgencyIdAsync
} from "./actions";
import { ThunkDispatch, ThunkAction } from "../../types";
import * as NextBusService from "../../../services/nextbus-service";
import NextBusAPI from "../../../api/NextBus/api";
import { getLocationAsync } from "../../../services/location-service";
import { selectFilterRouteIds, selectFavoriteStopLabels, selectAgencyId } from "../settings";
import NextBusMobileAPI from "../../../api/NextBusMobile/api";

export function getAgencies(): ThunkAction<Promise<void>> {
  return async function(dispatch: ThunkDispatch, _) {
    dispatch(getAgenciesAsync.request());
    try {
      const agencies = await NextBusAPI.getAgencies();
      dispatch(getAgenciesAsync.success(agencies));
    } catch (error) {
      dispatch(getAgenciesAsync.failure(error));
    }
  };
}

export function getRoutes(): ThunkAction<Promise<void>> {
  return async function(dispatch: ThunkDispatch, getState) {
    const { selectedAgencyId } = getState().settings;
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
      const state = getState();
      const routeIdFilters = selectFilterRouteIds(state);
      const favoriteStopLabels = selectFavoriteStopLabels(state);
      const { nextBus, settings } = state;
      const { routes } = nextBus;
      const {
        selectedAgencyId,
        showInactivePredictions,
        maxStopDistance,
        predictionListLimit
      } = settings;

      const predictionsList = await NextBusService.getNearbyPredictionsList(
        {
          agencyId: selectedAgencyId,
          routes: routes.data,
          maxStopDistance,
          location,
          favoriteStopLabels,
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

export function getNearestAgencyId(): ThunkAction<Promise<void>> {
  return async function(dispatch: ThunkDispatch, _) {
    dispatch(getNearestAgencyIdAsync.request());
    try {
      const location = await getLocationAsync();
      const nearestAgencyId = await NextBusMobileAPI.getNearestAgencyIdByLocation(location);
      dispatch(getNearestAgencyIdAsync.success(nearestAgencyId));
    } catch (error) {
      dispatch(getNearestAgencyIdAsync.failure(error));
    }
  };
}

export function loadSelectedAgencyId(): ThunkAction<Promise<void>> {
  return async function(dispatch: ThunkDispatch, getState) {
    await dispatch(getNearestAgencyId());
    const { nearestAgencyId } = getState().nextBus;
    dispatch(selectAgencyId(nearestAgencyId.data));
  };
}
