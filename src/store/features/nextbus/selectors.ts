import { RootState } from "../../types";

export const nearbyPredictionListSelector = (state: RootState) =>
  state.nextBus.nearbyPredictionsList;
