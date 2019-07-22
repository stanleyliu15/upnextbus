import { API_URL } from "./constants";
import extractNearestAgencyIdFromResponseJson from "./extractNearestAgencyIdFromResponseJson";
import { objectToQueryParameters } from "../../utils/utils";

const getNearestAgencyIdByLocation = async (location: Geo.Location) => {
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
