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

export class LocationPermissionDeniedError extends Error {
  constructor() {
    super("Permissions to use location was denied");
  }
}