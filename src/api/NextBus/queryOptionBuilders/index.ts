import buildQueryOptionsForAgencies from "./buildQueryOptionsForAgencies";
import buildQueryOptionsForRoutes from "./buildQueryOptionsForRoutes";
import buildQueryOptionsForRouteInfos from "./buildQueryOptionsForRouteInfos";
import buildQueryOptionsForPredictions from "./buildQueryOptionsForPredictions";
import buildQueryOptionsForPredictionsList from "./buildQueryOptionsForPredictionsList";
import buildQueryOptionsForVehicles from "./buildQueryOptionsForVehicles";

const queryOptionBuilders = {
  buildQueryOptionsForAgencies,
  buildQueryOptionsForRoutes,
  buildQueryOptionsForRouteInfos,
  buildQueryOptionsForPredictions,
  buildQueryOptionsForPredictionsList,
  buildQueryOptionsForVehicles
};

export default queryOptionBuilders;
