import { API_URL } from "./config";
import buildQueryOptionsByCommand from "./buildQueryOptionsByCommand";
import processResponseJsonForParseByCommand from "./processResponseJsonForParseByCommand";
import parseResponseDataByCommand from "./parseResponseDataByCommand";
import { objectToQueryParameters } from "../../utils";

const request = async (
  command: NextBusAPI.Command,
  queryOptions: NextBus.QueryOptions = {},
  parseOptions: NextBus.ParseOptions = {}
): Promise<any> => {
  const builtQueryOptions = buildQueryOptionsByCommand(command, queryOptions);
  const queryParameters = objectToQueryParameters(builtQueryOptions);
  const url = `${API_URL}?${queryParameters}`;

  try {
    const response = await fetch(url);
    const responseJson: NextBusAPI.ResponseJson = await response.json();

    const responseData = processResponseJsonForParseByCommand(command, responseJson);
    const responseDataParsed = parseResponseDataByCommand(command, responseData, parseOptions);

    return responseDataParsed;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);

    throw error;
  }
};

export default request;
