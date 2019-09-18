import { StateType, ActionType } from "typesafe-actions";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

export type RootState = StateType<ReturnType<typeof import("./root-reducer").default>>;

export type RootAction = ActionType<typeof import("./root-action").default>;

export type ThunkResult<R> = ThunkAction<R, RootState, null, RootAction>;

export type ThunkDispatch = ThunkDispatch<RootState, null, RootAction>;

export interface AsyncResult<T> {
  loading: boolean;
  data: T | null;
  error: Error | null;
}
