import { get } from '$lib/utils';
import type { Location } from '$lib/weather/geocoding';
import type { Response } from '$lib/weather/open-meteo.api';

const BASE_URL = 'https://geocoding-api.open-meteo.com/v1/';

export const getLocations = (name: string, limit: number = 10): Promise<Array<Location>> =>
    new Promise<Array<Location>>(async (resolve, reject) => {
        const url = new URL('search', BASE_URL);
        url.searchParams.append('name', name);
        url.searchParams.append('count', limit.toString());        

        get<Response<Location>>(url.href)
            .then(response => {
                if (!response.results || response.results.length < 0)
                    return reject(new Error('No entries found'));

                return resolve(response.results);
            })
            .catch(reject);
    });
