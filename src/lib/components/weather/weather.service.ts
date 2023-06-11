import { get } from '$lib/utils';
import type { Forecast } from '$lib/weather/forecast';
import type { Location } from '$lib/weather/geocoding';

const API_PATH = 'api/v1';
const API_SEARCH_PATH = API_PATH + '/search';
const API_FORECAST_PATH = API_PATH + '/forecast';

export const getLocations = (name: string, limit = 10): Promise<Array<Location>> => {
	const url = new URL(API_SEARCH_PATH, location.origin);
	url.searchParams.set('name', name);
	url.searchParams.set('limit', limit.toString());

	return get<Array<Location>>(url.href);
};

export const getForecast = (latitude: number, longitude: number): Promise<Forecast> => {
	const url = new URL(API_FORECAST_PATH, location.origin);
	url.searchParams.set('latitude', latitude.toString());
	url.searchParams.set('longitude', longitude.toString());

	return get<Forecast>(url.href);
};
