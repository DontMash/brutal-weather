import { get } from 'svelte/store';
import { page } from '$app/stores';

import { get as GET } from '$lib/utils';
import type { Forecast } from '$lib/weather/forecast';
import type { Location } from '$lib/weather/geocoding';

const API_PATH = 'api/v1';
const API_SEARCH_PATH = API_PATH + '/search';
const API_FORECAST_PATH = API_PATH + '/forecast';

export const getLocations = (name: string, limit: number = 10): Promise<Array<Location>> =>
    new Promise<Array<Location>>((resolve, reject) => {
        const url = new URL(API_SEARCH_PATH, get(page).url.origin);
        url.searchParams.set('name', name);
        url.searchParams.set('limit', limit.toString());

        GET<Array<Location>>(url.href)
            .then(locations => {
                if (!locations || locations.length < 0) {
                    return reject(new Error('No entries found'));
                }
                return resolve(locations);
            })
            .catch(reject);
    });

export const getForecast = (latitude: number, longitude: number): Promise<Forecast> => {
    const url = new URL(API_FORECAST_PATH, get(page).url.origin);
    url.searchParams.set('latitude', latitude.toString());
    url.searchParams.set('longitude', longitude.toString());

    return GET<Forecast>(url.href);
};
