import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { AsyncStorage } from "react-native";

import { nextBusReducer } from "./features/nextbus/reducer";
import { settingsReducer } from "./features/settings/reducer";

const nextBusPersistConfig = {
  key: "nextBus",
  storage: AsyncStorage,
  // TODO: update blacklist
  blacklist: ["agencies", "predictions", "nearestPredictionsList", "nearestAgencyIdByLocation"]
};

const rootPersistConfig = {
  key: "root",
  storage: AsyncStorage
};

const rootReducer = combineReducers({
  nextBus: persistReducer(nextBusPersistConfig, nextBusReducer),
  settings: settingsReducer
});

export default persistReducer(rootPersistConfig, rootReducer);
