import { get } from '../utils';
import type { Location } from './geocoding.types';
import type { Response } from './api.types';

const BASE_URL = 'https://geocoding-api.open-meteo.com/v1/';

export const getLocations = (name: string): Promise<Array<Location>> => new Promise<Array<Location>>(async (resolve, reject) => {
    try {
        const url = new URL('search', BASE_URL);
        url.searchParams.append('name', name);
        url.searchParams.append('count', (10).toString());

        const response = await (get(url.href) as Promise<Response<Location>>);
        if (!response.results || response.results.length < 0) {
            return reject('No entries found');
        }

        return resolve(response.results);
    } catch (error) {
        return reject(error);
    }
});
