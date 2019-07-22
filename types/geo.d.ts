declare namespace Geo {
  interface Location {
    lat: number;
    lon: number;
  }

  interface BoundingBox {
    latMin: number;
    latMax: number;
    lonMin: number;
    lonMax: number;
  }
}
