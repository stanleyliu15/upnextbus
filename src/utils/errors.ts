export class NextBusAPIError extends Error {
  retriable: boolean;

  constructor(message: string, retriable: boolean) {
    super(message);
    this.retriable = retriable;
  }
}
