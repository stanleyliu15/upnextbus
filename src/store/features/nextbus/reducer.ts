import { combineReducers } from "redux";
import { createReducer } from "typesafe-actions";

import * as actions from "./actions";
import { NextBusState } from "./types";

const reducer = combineReducers<NextBusState>({
  agencies: combineReducers({
    loading: createReducer(false as boolean)
      .handleAction(actions.getAgenciesAsync.request, (_state, _action) => true)
      .handleAction(
        [actions.getAgenciesAsync.success, actions.getAgenciesAsync.failure],
        (_state, _action) => false
      ),
    data: createReducer([]).handleAction(actions.getAgenciesAsync.success, (_state, action) => {
      return action.payload;
    }),
    error: createReducer(null)
      .handleAction(actions.getAgenciesAsync.failure, (_state, action) => {
        return action.payload;
      })
      .handleAction(actions.getAgenciesAsync.request, (_state, _action) => {
        return null;
      })
  }),
  routes: combineReducers({
    loading: createReducer(false as boolean)
      .handleAction(actions.getRoutesAsync.request, (_state, _action) => true)
      .handleAction(
        [actions.getRoutesAsync.success, actions.getRoutesAsync.failure],
        (_state, _action) => false
      ),
    data: createReducer([]).handleAction(actions.getRoutesAsync.success, (_state, action) => {
      return action.payload;
    }),
    error: createReducer(null)
      .handleAction(actions.getRoutesAsync.failure, (_state, action) => {
        return action.payload;
      })
      .handleAction(actions.getRoutesAsync.request, (_state, _action) => {
        return null;
      })
  }),
  nearbyPredictionsList: combineReducers({
    loading: createReducer(false as boolean)
      .handleAction(actions.getNearbyPredictionListAsync.request, (_state, _action) => true)
      .handleAction(
        [
          actions.getNearbyPredictionListAsync.success,
          actions.getNearbyPredictionListAsync.failure
        ],
        (_state, _action) => false
      ),
    data: createReducer([]).handleAction(
      actions.getNearbyPredictionListAsync.success,
      (_state, action) => {
        return action.payload;
      }
    ),
    error: createReducer(null)
      .handleAction(actions.getNearbyPredictionListAsync.failure, (_state, action) => {
        return action.payload;
      })
      .handleAction(actions.getNearbyPredictionListAsync.request, (_state, _action) => {
        return null;
      })
  })
});

export { reducer as nextBusReducer };
