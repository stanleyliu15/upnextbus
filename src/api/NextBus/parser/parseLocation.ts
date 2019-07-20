const parseLocation = (lat: string, lng: string): Geo.Location => ({
  lat: parseFloat(lat),
  lng: parseFloat(lng)
});

export default parseLocation;
