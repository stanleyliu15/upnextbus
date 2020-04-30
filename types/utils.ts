import { GestureResponderEvent } from "react-native";

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
