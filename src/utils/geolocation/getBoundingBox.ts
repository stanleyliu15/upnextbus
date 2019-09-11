import { degreesToRadians, radiansToDegrees } from "./converter";
import {
  EARTHS_RADIUS_MILES,
  LAT_MIN_RAD,
  LAT_MAX_RAD,
  LON_MIN_RAD,
  LON_MAX_RAD
} from "./constants";
import { GeoLocation } from "../../../types";

/**
 * Calculate and obtain the geolocational bounding box spanning a distance
 *
 * Attribution - Credits to anthonymartin
 * https://github.com/anthonymartin/GeoLocation.php
 *
 *
 * @param location
 * @param distance distance in miles
 */
export const getBoundingBox = (location: GeoLocation, distance: number) => {
  const angularRad = distance / EARTHS_RADIUS_MILES;

  const latRad = degreesToRadians(location.lat);
  const lonRad = degreesToRadians(location.lon);

  let latMinRad = latRad - angularRad;
  let latMaxRad = latRad + angularRad;
  let lonMinRad = 0.0;
  let lonMaxRad = 0.0;

  if (latMinRad > LAT_MIN_RAD && latMaxRad < LAT_MAX_RAD) {
    const deltaLon = Math.asin(Math.sin(angularRad) / Math.cos(latRad));
    lonMinRad = lonRad - deltaLon;
    lonMaxRad = lonRad + deltaLon;

    if (lonMinRad < LON_MIN_RAD) {
      lonMinRad += Math.PI * 2;
    }

    if (lonMaxRad > LON_MAX_RAD) {
      lonMaxRad -= Math.PI * 2;
    }
  } else {
    latMinRad = Math.max(latMinRad, LAT_MIN_RAD);
    latMaxRad = Math.min(latMaxRad, LAT_MAX_RAD);
    lonMinRad = LON_MIN_RAD;
    lonMaxRad = LON_MAX_RAD;
  }

  return {
    latMin: radiansToDegrees(latMinRad),
    latMax: radiansToDegrees(latMaxRad),
    lonMin: radiansToDegrees(lonMinRad),
    lonMax: radiansToDegrees(lonMaxRad)
  };
};
