import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";

import { nextBusReducer } from "./features/nextbus/reducer";
import { settingsReducer } from "./features/settings/reducer";

const nextBusPersistConfig = {
  key: "nextBus",
  storage: AsyncStorage,
  whitelist: ["routes"]
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
