import * as Location from "expo-location";
import { Platform } from "react-native";

import { LocationPermissionDeniedError } from "../errors";
import { GeoLocation } from "../../types";

const LOCATION_OPTIONS =
  Platform.OS === "android"
    ? {
        enableHighAccuracy: true,
        accuracy: Location.Accuracy.High
      }
    : {};

export const getLocationAsync = async (): Promise<GeoLocation> => {
  const { status } = await Location.getPermissionsAsync();

  if (status !== "granted") {
    const { status } = await Location.requestPermissionsAsync();

    if (status !== "granted") {
      throw new LocationPermissionDeniedError();
    }
  }

  const { coords } = await Location.getCurrentPositionAsync(LOCATION_OPTIONS);

  return {
    lat: coords.latitude,
    lon: coords.longitude
  };
};
