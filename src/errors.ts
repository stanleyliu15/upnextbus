export class NextBusAPIError extends Error {
  retriable: boolean;

  constructor(message: string, retriable: boolean) {
    super(message);
    this.retriable = retriable;
  }
}

export class NextBusNoNearbyError extends Error {
  constructor() {
    super("Unable to find any buses near you.");
  }
}

export class NextBusSourceMaximumRouteError extends Error {}

export class NextBusUnavaliableRouteError extends Error {
  routeId: string;

  constructor(message: string, routeId: string) {
    super(message);
    this.routeId = routeId;
  }
}

export class LocationPermissionDeniedError extends Error {
  constructor() {
    super("Permissions to use location was denied");
  }
}

export class NextBusNoNearbyAgencyError extends Error {
  constructor() {
    super("Unable to find any agencies near you.");
  }
}
