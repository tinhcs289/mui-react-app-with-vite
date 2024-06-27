import { Loader } from "@googlemaps/js-api-loader";

async function tryDo<T>(
  prom: ((...args: any[]) => Promise<T>) | Promise<T>,
  ...args: any[]
): Promise<[error: null, result: T] | [error: unknown, result: null]> {
  try {
    const result = await (typeof prom === "function" ? prom(...args) : prom);
    return [null, result as T];
  } catch (error) {
    return [error, null];
  }
}

// TODO: Google Place API: implement function to get api-key from backend;
async function getApiKey(): Promise<string> {
  await (() => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  })();

  return "";
}

const placeService: { current: google.maps.places.AutocompleteService } = {
  current: null as any,
};

const placeDetailService: { current: google.maps.Geocoder } = {
  current: null as any,
};

let isLoaded = false;

async function loadGooglePlacesLibrary() {
  if (isLoaded) return true;
  if (placeService.current && placeDetailService.current) return true;

  const [keyError, key] = await tryDo(getApiKey());
  if (keyError || !key) return false;

  const loader = new Loader({ apiKey: key, libraries: [] });
  const [loadError] = await tryDo(loader.load());
  if (loadError) return false;

  if (!google) return false;

  const { AutocompleteService } = (await google.maps.importLibrary(
    "places"
  )) as google.maps.PlacesLibrary;
  placeService.current = new AutocompleteService();

  const { Geocoder } = (await google.maps.importLibrary(
    "geocoding"
  )) as google.maps.GeocodingLibrary;
  placeDetailService.current = new Geocoder();

  isLoaded = true;
  return true;
}

async function getPlacesBySearchText(
  searchText: string
): Promise<google.maps.places.AutocompletePrediction[]> {
  if (!searchText || !searchText.trim()) return [];
  if (!placeService.current) return [];
  const promise = new Promise<google.maps.places.AutocompletePrediction[]>(
    (resolve, reject) => {
      placeService.current
        .getPlacePredictions({ input: searchText })
        .then((results) => {
          resolve(results?.predictions || []);
        })
        .catch(reject);
    }
  );
  const [error, results] = await tryDo(promise);
  if (!!error || !results) return [];
  return results;
}

async function getPlaceById(
  placeId: string
): Promise<google.maps.GeocoderResult | null | undefined> {
  if (!placeId || !placeId.trim()) return null;
  if (!placeDetailService.current) return null;
  const promise = new Promise<google.maps.GeocoderResult | null | undefined>(
    (resolve, reject) => {
      placeDetailService.current
        .geocode({ placeId })
        .then(({ results }) => {
          if (!results?.[0]) resolve(null);
          return resolve(results[0]);
        })
        .catch(reject);
    }
  );
  const [error, result] = await tryDo(promise);
  if (!!error || !result) return null;
  return result;
}

export const GMap = {
  loadPlaceService: loadGooglePlacesLibrary,
  searchPlaces: getPlacesBySearchText,
  getPlace: getPlaceById,
};
