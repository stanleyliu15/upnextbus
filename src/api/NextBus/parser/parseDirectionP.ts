import { arrayify } from "../../../utils";
import parsePrediction from "./parsePrediction";

const parseDirectionP = (directionP: NextBusAPI.DirectionP): NextBus.DirectionP => ({
  name: directionP.title,
  predictionList: arrayify(directionP.prediction).map(prediction => parsePrediction(prediction))
});

export default parseDirectionP;
