import { API_URL } from "./config";
import { objectToQueryParameters } from "../../utils";
import { GeoLocation } from "../../../types";

const extractNearestAgencyId = (responseJson: any) => {
  const { preds } = responseJson;
  if (preds.length > 0) {
    // the first item in preds is already sorted to be the nearest to the location
    return preds[0].agency_tag;
  }
  return null;
};

const getNearestAgencyIdByLocation = async (location: GeoLocation) => {
  const queryParameters = `preds=byLoc&${objectToQueryParameters(location)}`;
  const url = `${API_URL}?${queryParameters}`;

  try {
    const response = await fetch(url);
    const responseJson = await response.json();
    const agencyId = extractNearestAgencyId(responseJson);

    return agencyId;
  } catch (error) {
    throw error;
  }
};

export default getNearestAgencyIdByLocation;
