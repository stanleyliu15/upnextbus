import { GeoLocation } from "./utils";

/**
 * Typings for my version of the Nextbus API
 */
export declare namespace NextBus {
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
    location: GeoLocation;
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
    directionName: string;
    directionIds: string[];
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
    stopId: string;
  }

  interface Vehicle {
    id: string;
    routeId: string;
    directionId: string;
    location: GeoLocation;
    secondsSinceRecord: number;
    predictable: boolean;
    heading: number;
    speed: number;
  }

  type QueryOptions =
    | AgenciesQueryOptions
    | RoutesQueryOptions
    | RouteInfosQueryOptions
    | PredictionsQueryOptions
    | PredictionsListQueryOptions
    | VehiclesQueryOptions;

  type QueryOptionsBuilder = (
    command: NextBusSource.Command,
    queryOptions: NextBus.QueryOptions
  ) => NextBusSource.QueryOptions;

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

  interface VehiclesQueryOptions {
    agencyId: string;
    routeId: string;
    lastTime?: string;
  }

  type ParseOptions = PredictionsParseOptions | PredictionsListParseOptions;

  interface PredictionsParseOptions {
    listLimit?: number;
  }

  interface PredictionsListParseOptions extends PredictionsParseOptions {}
}
