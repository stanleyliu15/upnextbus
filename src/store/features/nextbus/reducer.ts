import { combineReducers } from "redux";
import { createReducer } from "typesafe-actions";

import { NextBusState } from "./types";
import * as actions from "./actions";

const reducer = combineReducers<NextBusState>({
  agencies: combineReducers({
    loading: createReducer(false as boolean)
      .handleAction(actions.getAgenciesAsync.request, (state, action) => true)
      .handleAction(
        [actions.getAgenciesAsync.success, actions.getAgenciesAsync.failure],
        (state, action) => false
      ),
    data: createReducer([]).handleAction(actions.getAgenciesAsync.success, (state, action) => {
      return action.payload;
    }),
    error: createReducer(null).handleAction(actions.getAgenciesAsync.failure, (state, action) => {
      return action.payload;
    })
  }),
  routes: combineReducers({
    loading: createReducer(false as boolean)
      .handleAction(actions.getRoutesAsync.request, (state, action) => true)
      .handleAction(
        [actions.getRoutesAsync.success, actions.getRoutesAsync.failure],
        (state, action) => false
      ),
    data: createReducer([]).handleAction(actions.getRoutesAsync.success, (state, action) => {
      return action.payload;
    }),
    error: createReducer(null).handleAction(actions.getRoutesAsync.failure, (state, action) => {
      return action.payload;
    })
  }),
  predictions: combineReducers({
    loading: createReducer(false as boolean)
      .handleAction(actions.getPredictionsAsync.request, (state, action) => true)
      .handleAction(
        [actions.getPredictionsAsync.success, actions.getPredictionsAsync.failure],
        (state, action) => false
      ),
    data: createReducer(null).handleAction(actions.getPredictionsAsync.success, (state, action) => {
      return action.payload;
    }),
    error: createReducer(null).handleAction(
      actions.getPredictionsAsync.failure,
      (state, action) => {
        return action.payload;
      }
    )
  }),
  nearbyPredictionsList: combineReducers({
    loading: createReducer(false as boolean)
      .handleAction(actions.getNearbyPredictionListAsync.request, (state, action) => true)
      .handleAction(
        [
          actions.getNearbyPredictionListAsync.success,
          actions.getNearbyPredictionListAsync.failure
        ],
        (state, action) => false
      ),
    data: createReducer([]).handleAction(
      actions.getNearbyPredictionListAsync.success,
      (state, action) => {
        return action.payload;
      }
    ),
    error: createReducer(null).handleAction(
      actions.getNearbyPredictionListAsync.failure,
      (state, action) => {
        return action.payload;
      }
    )
  }),
  nearestAgencyIdByLocation: combineReducers({
    loading: createReducer(false as boolean)
      .handleAction(actions.getNearestAgencyIdByLocationAsync.request, (state, action) => true)
      .handleAction(
        [
          actions.getNearestAgencyIdByLocationAsync.success,
          actions.getNearestAgencyIdByLocationAsync.failure
        ],
        (state, action) => false
      ),
    data: createReducer(null).handleAction(
      actions.getNearestAgencyIdByLocationAsync.success,
      (state, action) => {
        return action.payload;
      }
    ),
    error: createReducer(null).handleAction(
      actions.getNearestAgencyIdByLocationAsync.failure,
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
