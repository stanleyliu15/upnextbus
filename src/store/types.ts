import { StateType, ActionType } from "typesafe-actions";
import { ThunkAction as ThunkActionBase, ThunkDispatch as ThunkDispatchBase } from "redux-thunk";

export type RootState = StateType<typeof import("./root-reducer").default>;

export type RootAction = ActionType<typeof import("./root-action").default>;

export type ThunkAction<ReturnType> = ThunkActionBase<ReturnType, RootState, null, RootAction>;

export type ThunkDispatch = ThunkDispatchBase<RootState, null, RootAction>;

export interface AsyncResult<T> {
  loading: boolean;
  data: T | null;
  error: Error | null;
}
