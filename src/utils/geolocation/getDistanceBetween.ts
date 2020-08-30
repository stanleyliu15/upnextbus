import { degreesToRadians } from "./converter";
import { EARTHS_RADIUS_MILES } from "./constants";
import { GeoLocation } from "../../../types";

/**
 * Calculates the distance between two geolocations in miles
 *
 * Attribution - Credits to anthonymartin
 * https://github.com/anthonymartin/GeoLocation.php
 *
 * @param locationStart
 * @param locationEnd
 */
export const getDistanceBetween = (location1: GeoLocation, location2: GeoLocation) => {
  const lat1Rad = degreesToRadians(location1.lat);
  const lon1Rad = degreesToRadians(location1.lon);
  const lat2Rad = degreesToRadians(location2.lat);
  const lon2Rad = degreesToRadians(location2.lon);

  return (
    Math.acos(
      Math.sin(lat1Rad) * Math.sin(lat2Rad) +
        Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.cos(lon1Rad - lon2Rad)
    ) * EARTHS_RADIUS_MILES
  );
};
