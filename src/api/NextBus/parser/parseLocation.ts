const parseLocation = (lat: string, lon: string): Geo.Location => ({
  lat: parseFloat(lat),
  lon: parseFloat(lon)
});

export default parseLocation;
