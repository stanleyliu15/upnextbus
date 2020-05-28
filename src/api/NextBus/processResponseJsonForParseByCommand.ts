import { flow } from "lodash";

import { COMMAND_PATH_MAP, COMMANDS } from "./config";
import { arrayify } from "../../utils";
import {
  NextBusError,
  NextBusMaximumRoutesError,
  NextBusUnavaliableRouteError
} from "../../errors";
import parseError from "./parser/parseError";
import { NextBusSource } from "../../../types";

const MAXIMUM_ROUTES_ERROR_MESSAGE =
  'Command would return more routes than the maximum: 100.\n Try specifying batches of routes from "routeList".';

const UNAVALIABLE_ROUTE_REGEX = /For agency=((?!\s*$).+) route r=((?!\s*$).+) is not currently available. It might be initializing still./;

const checkResponseJsonForError = (
  command: NextBusSource.Command,
  responseJson: NextBusSource.ResponseJson
) => {
  if (responseJson.Error) {
    const error = parseError(responseJson.Error);

    if (command === COMMANDS.predictions || command === COMMANDS.predictionsForMultiStops) {
      const unavaliableRouteMatches = UNAVALIABLE_ROUTE_REGEX.exec(error.message);
      if (unavaliableRouteMatches) {
        const [, , routeId] = unavaliableRouteMatches;
        throw new NextBusUnavaliableRouteError(error.message, error.retriable, routeId);
      }
    }

    if (command === COMMANDS.routeConfig) {
      if (error.message === MAXIMUM_ROUTES_ERROR_MESSAGE) {
        throw new NextBusMaximumRoutesError(error.message, error.retriable);
      }
    }

    throw new NextBusError(error.message, error.retriable);
  }

  return responseJson;
};

const extractResponseData = (
  command: NextBusSource.Command,
  responseJson: NextBusSource.ResponseJson
) => {
  if (command === COMMANDS.vehicleLocations) {
    return responseJson;
  }

  const path = COMMAND_PATH_MAP[command];
  return responseJson[path];
};

const uniformalizeResponseData = (command: NextBusSource.Command, responseData: any) => {
  if (command === COMMANDS.predictions) {
    return responseData;
  }

  if (command === COMMANDS.vehicleLocations) {
    if (responseData[COMMAND_PATH_MAP[command]]) {
      return arrayify(responseData[COMMAND_PATH_MAP[command]]);
    }

    return [];
  }

  return arrayify(responseData);
};

const processResponseJsonForParseByCommand = (
  command: NextBusSource.Command,
  responseJson: NextBusSource.ResponseJson
) => {
  return flow(
    checkResponseJsonForError.bind(this, command),
    extractResponseData.bind(this, command),
    uniformalizeResponseData.bind(this, command)
  )(responseJson);
};

export default processResponseJsonForParseByCommand;
