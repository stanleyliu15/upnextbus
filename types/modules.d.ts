import { Theme } from "../src/styles";
import { RootAction } from "../src/store/types";

declare module "styled-components/native" {
  export interface DefaultTheme extends Theme {}
}

declare module "typesafe-actions" {
  interface Types {
    RootAction: RootAction;
  }
}
