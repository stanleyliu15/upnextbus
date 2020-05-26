import { API_URL } from "./config";
import { objectToQueryParameters } from "../../utils";
import { GeoLocation } from "../../../types";
import { NextBusUnableFindNearestAgencyError } from "../../errors";

const extractNearestAgencyId = (responseJson: any) => {
  const { preds } = responseJson;
  if (preds.length > 0) {
    // the first item in preds is already sorted to be the nearest to the location
    return preds[0].agency_tag;
  }

  throw new NextBusUnableFindNearestAgencyError();
};

const getNearestAgencyIdByLocation = async (location: GeoLocation) => {
  const queryParameters = `preds=byLoc&${objectToQueryParameters(location)}`;
  const url = `${API_URL}?${queryParameters}`;

  const response = await fetch(url);
  const responseJson = await response.json();
  const nearestAgencyId = extractNearestAgencyId(responseJson);

  return nearestAgencyId;
};

export default getNearestAgencyIdByLocation;
