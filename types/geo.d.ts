declare namespace Geo {
  interface Location {
    lat: number;
    lng: number;
  }

  interface BoundingBox {
    latMin: number;
    latMax: number;
    lngMin: number;
    lngMax: number;
  }
}
