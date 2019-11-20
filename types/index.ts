import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation";

import { Theme } from "../src/styles";

export * from "./nextBus";
export * from "./nextBusSource";

export * from "./utils";

declare module "styled-components/native" {
  export interface DefaultTheme extends Theme {}
}

declare module "react-navigation-tabs/lib/typescript/src/types" {
  export interface TabBarIconProps {
    focused: boolean;
    tintColor?: string;
    horizontal?: boolean;
  }
}

export interface NavigationProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
