/**
 * Typings for my version of the Nextbus API
 */
declare namespace NextBus {
  type ServiceAlertPriority = "LOW" | "NORMAL" | "HIGH" | "CRITICAL";

  interface Agency {
    id: string;
    name: string;
    shortName?: string;
    region: string;
  }

  interface Direction {
    id: string;
    name: string;
    shortName: string;
    useForUI: boolean;
    stopIds: string[];
    stops: Stop[];
  }

  interface RouteInfo {
    id: string;
    name: string;
    shortName?: string;
  }

  interface Route {
    id: string;
    name: string;
    shortName?: string;
    color: string;
    oppositeColor: string;
    boundingBox: BoundingBox;
    directions: Direction[];
    paths?: Path[];
  }

  interface Stop {
    id: string;
    lookupId?: number;
    name: string;
    shortName?: string;
    location: Geo.Location;
  }

  interface ServiceAlert {
    message: string;
    priority: ServiceAlertPriority;
  }

  interface Path {
    locations: GeoLocation[];
  }

  interface Predictions {
    routeId: string;
    stopId: string;
    agencyName: string;
    routeName: string;
    directionNames: string[];
    stopName: string;
    predictionList: Prediction[];
    serviceAlerts: ServiceAlert[];
  }

  interface Prediction {
    directionId: string;
    tripId: string;
    block: string;
    branch: string;
    seconds: number;
    minutes: number;
    epochTime: number;
    isDeparture: bool;
    isScheduleBased: bool;
    isDelayed: bool;
    isAffectedByLayover: bool;
  }

  interface Error {
    message: string;
    retriable: boolean;
  }

  interface StopLabel {
    routeId: string;
    directionId: string;
    stopId: string;
  }

  type QueryOptions =
    | AgenciesQueryOptions
    | RoutesQueryOptions
    | RouteInfosQueryOptions
    | PredictionsQueryOptions
    | PredictionsListQueryOptions;

  type QueryOptionsBuilder = (
    command: NextBusAPI.Command,
    queryOptions: NextBus.QueryOptions
  ) => NextBusAPI.QueryOptions;

  interface AgenciesQueryOptions {}

  interface RoutesQueryOptions {
    agencyId: string;
  }

  interface RouteInfosQueryOptions {
    agencyId: string;
  }

  interface PredictionsQueryOptions {
    agencyId: string;
    routeId: string;
    stopId: string;
  }

  interface PredictionsListQueryOptions {
    agencyId: string;
    stopLabels: StopLabel[];
  }

  type ParseOptions = PredictionsParseOptions | PredictionsListParseOptions;

  interface PredictionsParseOptions {
    listLimit?: number;
  }

  interface PredictionsListParseOptions extends PredictionsFilterOptions {}
}
