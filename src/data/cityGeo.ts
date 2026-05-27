// Approximate city-center coordinates + county for each market. Public
// geographic data, used for GeoCoordinates + areaServed in structured data
// (a strong local-SEO signal). Keyed by the city's collection slug.
export interface CityGeo { lat: number; lng: number; county: string }

export const cityGeo: Record<string, CityGeo> = {
  atlanta: { lat: 33.749, lng: -84.388, county: 'Fulton' },
  'sandy-springs': { lat: 33.9243, lng: -84.3785, county: 'Fulton' },
  roswell: { lat: 34.0232, lng: -84.3616, county: 'Fulton' },
  alpharetta: { lat: 34.0754, lng: -84.2941, county: 'Fulton' },
  marietta: { lat: 33.9526, lng: -84.5499, county: 'Cobb' },
  smyrna: { lat: 33.884, lng: -84.5144, county: 'Cobb' },
  brookhaven: { lat: 33.8651, lng: -84.3366, county: 'DeKalb' },
  dunwoody: { lat: 33.9462, lng: -84.3346, county: 'DeKalb' },
  'johns-creek': { lat: 34.0289, lng: -84.1986, county: 'Fulton' },
  kennesaw: { lat: 34.0234, lng: -84.6155, county: 'Cobb' },
  duluth: { lat: 34.0029, lng: -84.1446, county: 'Gwinnett' },
  'peachtree-city': { lat: 33.3968, lng: -84.5963, county: 'Fayette' },
  'stone-mountain': { lat: 33.8082, lng: -84.1702, county: 'DeKalb' },
  savannah: { lat: 32.0809, lng: -81.0912, county: 'Chatham' },
  'tybee-island': { lat: 32.0007, lng: -80.8454, county: 'Chatham' },
  'blue-ridge': { lat: 34.8643, lng: -84.3241, county: 'Fannin' },
  helen: { lat: 34.7015, lng: -83.7251, county: 'White' },
  athens: { lat: 33.9519, lng: -83.3576, county: 'Clarke' },
  'lake-lanier': { lat: 34.2979, lng: -83.8241, county: 'Hall' },
  augusta: { lat: 33.4735, lng: -82.0105, county: 'Richmond' },
  columbus: { lat: 32.461, lng: -84.9877, county: 'Muscogee' },
};
