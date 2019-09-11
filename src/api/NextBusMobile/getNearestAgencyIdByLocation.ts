import { API_URL } from "./constants";
import { objectToQueryParameters } from "../../utils";
import { GeoLocation } from "../../../types";
import extractNearestAgencyIdFromResponseJson from "./extractNearestAgencyIdFromResponseJson";

const getNearestAgencyIdByLocation = async (location: GeoLocation) => {
  const queryParameters = `?preds=byLoc&${objectToQueryParameters(location)}`;
  const url = `${API_URL}${queryParameters}`;

  try {
    const response = await fetch(url);
    const responseJson = await response.json();
    const agencyId = extractNearestAgencyIdFromResponseJson(responseJson);

    return agencyId;
  } catch (error) {
    throw error;
  }
};

export default getNearestAgencyIdByLocation;
