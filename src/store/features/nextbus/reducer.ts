import { combineReducers } from "redux";
import { createReducer } from "typesafe-actions";

import { NextBusState } from "./types";
import * as actions from "./actions";
import * as asyncActions from "./async-actions";

const reducer = combineReducers<NextBusState>({
  agencies: combineReducers({
    loading: createReducer(false as boolean)
      .handleAction(asyncActions.getAgenciesAsync.request, (state, action) => true)
      .handleAction(
        [asyncActions.getAgenciesAsync.success, asyncActions.getAgenciesAsync.failure],
        (state, action) => false
      ),
    data: createReducer([]).handleAction(asyncActions.getAgenciesAsync.success, (state, action) => {
      return action.payload;
    }),
    error: createReducer(null).handleAction(
      asyncActions.getAgenciesAsync.failure,
      (state, action) => {
        return action.payload;
      }
    )
  }),
  routes: combineReducers({
    loading: createReducer(false as boolean)
      .handleAction(asyncActions.getRoutesAsync.request, (state, action) => true)
      .handleAction(
        [asyncActions.getRoutesAsync.success, asyncActions.getRoutesAsync.failure],
        (state, action) => false
      ),
    data: createReducer([]).handleAction(asyncActions.getRoutesAsync.success, (state, action) => {
      return action.payload;
    }),
    error: createReducer(null).handleAction(
      asyncActions.getRoutesAsync.failure,
      (state, action) => {
        return action.payload;
      }
    )
  }),
  predictions: combineReducers({
    loading: createReducer(false as boolean)
      .handleAction(asyncActions.getPredictionsAsync.request, (state, action) => true)
      .handleAction(
        [asyncActions.getPredictionsAsync.success, asyncActions.getPredictionsAsync.failure],
        (state, action) => false
      ),
    data: createReducer(null).handleAction(
      asyncActions.getPredictionsAsync.success,
      (state, action) => {
        return action.payload;
      }
    ),
    error: createReducer(null).handleAction(
      asyncActions.getPredictionsAsync.failure,
      (state, action) => {
        return action.payload;
      }
    )
  }),
  nearbyPredictionsList: combineReducers({
    loading: createReducer(false as boolean)
      .handleAction(asyncActions.getNearbyPredictionListAsync.request, (state, action) => true)
      .handleAction(
        [
          asyncActions.getNearbyPredictionListAsync.success,
          asyncActions.getNearbyPredictionListAsync.failure
        ],
        (state, action) => false
      ),
    data: createReducer([]).handleAction(
      asyncActions.getNearbyPredictionListAsync.success,
      (state, action) => {
        return action.payload;
      }
    ),
    error: createReducer(null).handleAction(
      asyncActions.getNearbyPredictionListAsync.failure,
      (state, action) => {
        return action.payload;
      }
    )
  }),
  nearestAgencyIdByLocation: combineReducers({
    loading: createReducer(false as boolean)
      .handleAction(asyncActions.getNearestAgencyIdByLocationAsync.request, (state, action) => true)
      .handleAction(
        [
          asyncActions.getNearestAgencyIdByLocationAsync.success,
          asyncActions.getNearestAgencyIdByLocationAsync.failure
        ],
        (state, action) => false
      ),
    data: createReducer(null).handleAction(
      asyncActions.getNearestAgencyIdByLocationAsync.success,
      (state, action) => {
        return action.payload;
      }
    ),
    error: createReducer(null).handleAction(
      asyncActions.getNearestAgencyIdByLocationAsync.failure,
      (state, action) => {
        return action.payload;
      }
    )
  }),
  selectedAgencyId: createReducer(null).handleAction(actions.selectAgencyId, (state, action) => {
    return action.payload;
  }),
  favoriteRouteIds: createReducer([])
    .handleAction(actions.favoriteRouteId, (state, action) => {
      return [...state, action.payload];
    })
    .handleAction(actions.unfavoriteRouteId, (state, action) => {
      return state.filter(routeId => routeId === action.payload);
    }),
  routeIdFilters: createReducer([]).handleAction(actions.filterRouteIds, (state, action) => {
    return action.payload;
  })
});

export { reducer as nextBusReducer };
