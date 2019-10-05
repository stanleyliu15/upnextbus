import { GestureResponderEvent } from "react-native";
import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation";

import { Theme } from "../src/styles";

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

export interface OnPressHandler {
  (event: GestureResponderEvent): void;
}

export interface Point {
  x: number;
  y: number;
}

export interface Rectangle {
  top: number;
  left: number;
  right: number;
  bottom: number;
}

export interface GeoLocation {
  lat: number;
  lon: number;
}

export interface GeoBoundingBox {
  latMin: number;
  latMax: number;
  lonMin: number;
  lonMax: number;
}

export interface NavigationProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
