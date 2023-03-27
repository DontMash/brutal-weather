import type { Forecast } from './forecast.types';
import type { Response } from './api.types';
import { get } from '../utils';

const BASE_URL = 'https://api.open-meteo.com/v1/';

export const getForecast = (latitude: number, longitude: number): Promise<Forecast> => {
    const url = new URL('forecast', BASE_URL);
    url.searchParams.append('latitude', latitude.toString());
    url.searchParams.append('longitude', longitude.toString());
    url.searchParams.append('current_weather', 'true');

    return (get(url.href) as Promise<Response<Forecast>>);
};
