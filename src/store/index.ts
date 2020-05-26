import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { useDispatch as useDispatchBase } from "react-redux";

import rootReducer from "./root-reducer";
import { RootState, RootAction } from "./types";

const store = createStore(
  rootReducer,
  applyMiddleware(thunk as ThunkMiddleware<RootState, RootAction>)
);

export const persistor = persistStore(store);

export const useDispatch = () => useDispatchBase<typeof store.dispatch>();

export default store;
