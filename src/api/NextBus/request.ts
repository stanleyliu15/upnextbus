import { API_URL } from "./config";
import buildQueryOptionsByCommand from "./buildQueryOptionsByCommand";
import processResponseJsonForParseByCommand from "./processResponseJsonForParseByCommand";
import parseResponseDataByCommand from "./parseResponseDataByCommand";
import { objectToQueryParameters } from "../../utils";
import { NextBus, NextBusSource } from "../../../types";

const request = async (
  command: NextBusSource.Command,
  queryOptions: NextBus.QueryOptions = {},
  parseOptions: NextBus.ParseOptions = {}
): Promise<any> => {
  const builtQueryOptions = buildQueryOptionsByCommand(command, queryOptions);
  const queryParameters = objectToQueryParameters(builtQueryOptions);
  const url = `${API_URL}?${queryParameters}`;

  try {
    const response = await fetch(url);
    const responseJson: NextBusSource.ResponseJson = await response.json();

    const responseData = processResponseJsonForParseByCommand(command, responseJson);
    const responseDataParsed = parseResponseDataByCommand(command, responseData, parseOptions);

    return responseDataParsed;
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export default request;
