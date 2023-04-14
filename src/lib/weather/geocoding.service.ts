import { get } from '../utils';
import type { Location } from './geocoding';
import type { Response } from './api';

const BASE_URL = 'https://geocoding-api.open-meteo.com/v1/';

export const getLocations = (name: string, limit: number = 10): Promise<Array<Location>> => new Promise<Array<Location>>(async (resolve, reject) => {
    try {
        const url = new URL('search', BASE_URL);
        url.searchParams.append('name', name);
        url.searchParams.append('count', limit.toString());

        const response = await (get(url.href) as Promise<Response<Location>>);
        if (!response.results || response.results.length < 0) {
            throw new Error('No entries found');
        }

        return resolve(response.results);
    } catch (error) {
        return reject(error);
    }
});
