import { GeoLocation } from "../../../../types";

const parseLocation = (lat: string, lon: string): GeoLocation => ({
  lat: parseFloat(lat),
  lon: parseFloat(lon)
});

export default parseLocation;
