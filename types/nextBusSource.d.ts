import { GeoLocation } from "./utils";
/**
 * Typings based on the NextBus API
 *
 * Documentation:
 * https://www.nextbus.com/xmlFeedDocs/NextBusXMLFeed.pdf
 */

export declare namespace NextBusSource {
  type Command =
    | "agencyList"
    | "routeConfig"
    | "routeList"
    | "predictions"
    | "predictionsForMultiStops"
    | "vehicleLocations";

  type ServiceAlertPriority = "Low" | "Normal" | "High" | "Critical";

  interface TagObject {
    tag: string;
  }

  interface Agency {
    tag: string;
    title: string;
    regionTitle: string;
    shortTitle?: string;
  }

  interface Direction {
    tag: string;
    title: string;
    name?: string;
    useForUI: string;
    stop: TagObject | TagObject[];
  }

  interface DirectionP {
    title: string;
    prediction: Prediction | Prediction[];
  }

  interface RouteInfo {
    tag: string;
    title: string;
    shortTitle?: string;
  }

  interface Point {
    lat: string;
    lon: string;
  }

  interface Path {
    point: Point | Point[];
  }

  interface Route {
    tag: string;
    title: string;
    color: string;
    oppositeColor: string;
    latMin: string;
    latMax: string;
    lonMin: string;
    lonMax: string;
    stop: Stop | Stop[];
    direction: Direction | Direction[];
    shortTitle?: string;
    path?: Path | Path[];
  }

  interface Stop {
    tag: string;
    title: string;
    stopId: string;
    lat: string;
    lon: string;
    shortTitle?: string;
  }

  interface ServiceAlert {
    text: string;
    priority: ServiceAlertPriority;
  }

  interface Prediction {
    dirTag: string;
    tripTag: string;
    block: string;
    seconds: string;
    minutes: string;
    epochTime: string;
    isDeparture: string;
    branch?: string;
    isScheduleBased?: string;
    delayed?: string;
    affectedByLayover?: string;
  }

  interface Predictions {
    routeTag: string;
    stopTag: string;
    agencyTitle: string;
    routeTitle: string;
    stopTitle: string;
    direction?: DirectionP | DirectionP[];
    dirTitleBecauseNoPredictions?: string;
    message?: ServiceAlert | ServiceAlert[];
  }

  interface Vehicle {
    id: string;
    routeTag: string;
    dirTag: string;
    lat: string;
    lon: string;
    predictable: string;
    speedKmHr: string;
    heading: string;
    secsSinceReport: string;
  }

  interface Error {
    content: string;
    shouldRetry: string;
  }

  type QueryOptions =
    | AgenciesQueryOptions
    | RoutesQueryOptions
    | RouteInfosQueryOptions
    | PredictionsQueryOptions
    | PredictionsListQueryOptions
    | VehiclesQueryOptions;

  interface BaseQueryOptions {
    command: NextBusSource.Command;
  }

  interface AgenciesQueryOptions extends BaseQueryOptions {}

  interface RoutesQueryOptions extends BaseQueryOptions {
    a: string;
    terse?: string;
    verbose?: string;
  }

  interface RouteInfosQueryOptions extends BaseQueryOptions {
    a: string;
  }

  interface PredictionsQueryOptions extends BaseQueryOptions {
    a: string;
    r: string;
    s: string;
    useShortTitles?: string;
  }

  interface PredictionsListQueryOptions extends BaseQueryOptions {
    a: string;
    stopLabels: string;
    useShortTitles?: string;
  }

  interface VehiclesQueryOptions extends BaseQueryOptions {
    a: string;
    r: string;
    t?: string;
  }

  interface ResponseJson {
    [key: string]:
      | Agency
      | Agency[]
      | RouteConfig
      | Route
      | Route[]
      | Predictions
      | Predictions[]
      | Vehicle
      | Vehicle[]
      | Error
      | Error[];
    // Only exists on VehicleLocations command
    lastTime?: {
      time: string;
    };
    copyright: string;
  }
}
