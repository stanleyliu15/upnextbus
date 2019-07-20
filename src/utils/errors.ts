export class NextBusAPIError extends Error {
  public retriable: boolean;

  public constructor(message: string, retriable: boolean) {
    super(message);
    this.retriable = retriable;
  }
}
