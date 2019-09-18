import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import { LocationPermissionDeniedError } from "../errors";
import { GeoLocation } from "../../types";

export const getLocationAsync = async (): Promise<GeoLocation> => {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);

  if (status === "granted") {
    const { coords } = await Location.getCurrentPositionAsync({});

    return {
      lat: coords.latitude,
      lon: coords.longitude
    };
  }

  throw new LocationPermissionDeniedError();
};
