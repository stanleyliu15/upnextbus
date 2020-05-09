import parseServiceAlert from "./parseServiceAlert";
import parsePrediction from "./parsePrediction";
import { titleCase, arrayify } from "../../../utils";
import { NextBus, NextBusSource } from "../../../../types";

const parsePredictions = (
  predictions: NextBusSource.Predictions,
  parseOptions: NextBus.PredictionsParseOptions
): NextBus.Predictions => {
  const directions = arrayify(predictions.direction);

  return {
    routeId: predictions.routeTag,
    stopId: predictions.stopTag,
    agencyName: predictions.agencyTitle,
    routeName: predictions.routeTitle,
    stopName: predictions.stopTitle,
    directionIds: predictions.dirTitleBecauseNoPredictions
      ? []
      : directions.reduce((directionIds, directionP) => {
          return directionIds.concat(arrayify(directionP.prediction)[0].dirTag);
        }, []),
    directionName: predictions.dirTitleBecauseNoPredictions
      ? arrayify(titleCase(predictions.dirTitleBecauseNoPredictions))
      : directions.reduce(
          (directionName, directionP, index) =>
            `${directionName}${index > 0 ? "\n" : ""}${titleCase(directionP.title)}`,
          ""
        ),
    predictionList: predictions.direction
      ? directions
          .reduce(
            (predictionList, directionP) => predictionList.concat(arrayify(directionP.prediction)),
            []
          )
          .slice(0, parseOptions.listLimit || undefined)
          .map(prediction => parsePrediction(prediction))
          .sort((prediction1, prediction2) => prediction1.minutes - prediction2.minutes)
      : [],
    serviceAlerts: predictions.message
      ? arrayify(predictions.message).map(message => parseServiceAlert(message))
      : [],
    stopLabel: {
      routeId: predictions.routeTag,
      stopId: predictions.stopTag
    }
  };
};

export default parsePredictions;
