import { parseBoolean } from "../../../utils";

const parsePrediction = (predictionParam: NextBusAPI.Prediction): NextBus.Prediction => ({
  directionId: predictionParam.dirTag,
  tripId: predictionParam.tripTag,
  block: predictionParam.block,
  seconds: parseInt(predictionParam.seconds, 10),
  minutes: parseInt(predictionParam.minutes, 10),
  epochTime: parseInt(predictionParam.epochTime, 10),
  isDeparture: parseBoolean(predictionParam.isDeparture),
  branch: predictionParam.branch,
  isScheduleBased: predictionParam.isScheduleBased && parseBoolean(predictionParam.isScheduleBased),
  isDelayed: predictionParam.delayed && parseBoolean(predictionParam.delayed),
  isAffectedByLayover:
    predictionParam.affectedByLayover && parseBoolean(predictionParam.affectedByLayover)
});

export default parsePrediction;
