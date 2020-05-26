export class NextBusError extends Error {
  retriable: boolean;

  constructor(message: string, retriable: boolean) {
    super(message);
    this.retriable = retriable;
  }
}

export class NextBusUnableFindNearestAgencyError extends NextBusError {
  constructor() {
    super("Unable to find an agency near your location.", true);
  }
}

export class NextBusMaximumRoutesError extends NextBusError {}

export class NextBusUnavaliableRouteError extends NextBusError {
  routeId: string;

  constructor(message: string, retriable: boolean, routeId: string) {
    super(message, retriable);
    this.routeId = routeId;
  }
}

export class UnableFindNearbyBusesError extends Error {
  constructor() {
    super("Unable to find any buses near your location.");
  }
}

export class LocationPermissionDeniedError extends Error {
  constructor() {
    super("Permissions to use location was denied");
  }
}
