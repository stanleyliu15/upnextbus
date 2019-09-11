import { arrayify } from "../../../utils";
import parseServiceAlert from "./parseServiceAlert";
import parseDirectionP from "./parseDirectionP";

const parsePredictions = (predictions: NextBusAPI.Predictions): NextBus.Predictions => ({
  routeId: predictions.routeTag,
  stopId: predictions.stopTag,
  agencyName: predictions.agencyTitle,
  routeName: predictions.routeTitle,
  stopName: predictions.stopTitle,
  directionFallbackName: predictions.dirTitleBecauseNoPredictions,
  directionPs:
    predictions.direction &&
    arrayify(predictions.direction).map(directionP => parseDirectionP(directionP)),
  serviceAlerts:
    predictions.message && arrayify(predictions.message).map(message => parseServiceAlert(message))
});

export default parsePredictions;
