import parseServiceAlert from "./parseServiceAlert";
import parsePrediction from "./parsePrediction";
import { titleCase, arrayify } from "../../../utils";

const parsePredictions = (
  predictions: NextBusAPI.Predictions,
  parseOptions: NextBus.PredictionsParseOptions
): NextBus.Predictions => {
  return {
    routeId: predictions.routeTag,
    stopId: predictions.stopTag,
    agencyName: predictions.agencyTitle,
    routeName: predictions.routeTitle,
    stopName: predictions.stopTitle,
    directionNames: predictions.dirTitleBecauseNoPredictions
      ? arrayify(titleCase(predictions.dirTitleBecauseNoPredictions))
      : arrayify(predictions.direction).map(directionP => titleCase(directionP.title)),
    predictionList: predictions.direction
      ? arrayify(predictions.direction)
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
      : []
  };
};

export default parsePredictions;
