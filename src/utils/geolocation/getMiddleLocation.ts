import { degreesToRadians, radiansToDegrees } from "./converter";
import { GeoLocation } from "../../../types";

export function getMiddleLocation(location1: GeoLocation, location2: GeoLocation) {
  const dLng = degreesToRadians(location2.lon - location1.lon);

  const lat1 = degreesToRadians(location1.lat);
  const lat2 = degreesToRadians(location2.lat);
  const lon1 = degreesToRadians(location1.lon);

  const bX = Math.cos(lat2) * Math.cos(dLng);
  const bY = Math.cos(lat2) * Math.sin(dLng);
  const lat3 = Math.atan2(
    Math.sin(lat1) + Math.sin(lat2),
    Math.sqrt((Math.cos(lat1) + bX) * (Math.cos(lat1) + bX) + bY * bY)
  );
  const lon3 = lon1 + Math.atan2(bY, Math.cos(lat1) + bX);

  return { lat: radiansToDegrees(lat3), lon: radiansToDegrees(lon3) };
}
