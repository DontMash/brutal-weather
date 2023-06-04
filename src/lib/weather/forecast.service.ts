import type { Forecast } from './forecast';
import type { Response } from './api';
import { get } from '../utils';

const BASE_URL = 'https://api.open-meteo.com/v1/';
const DEFAULT_FORECAST_OPTIONS: ForecastOptions = {
    current_weather: true,
    hourly: {
        temperature_2m: true,
        apparent_temperature: true,
        precipitation_probability: true,
        relativehumidity_2m: true,
        weathercode: true,
        is_day: true,
    },
} as const;

type ForecastOptions = {
    current_weather: boolean,
    hourly?: ForecastHourlyOptions,
};
type ForecastHourlyOptions = {
    temperature_2m?: boolean,
    relativehumidity_2m?: boolean,
    apparent_temperature?: boolean,
    precipitation_probability?: boolean,
    weathercode?: boolean,
    is_day?: boolean,
};

export const getForecast = (latitude: number, longitude: number, options: ForecastOptions = DEFAULT_FORECAST_OPTIONS): Promise<Forecast> => {
    const url = new URL('forecast', BASE_URL);
    url.searchParams.append('latitude', latitude.toString());
    url.searchParams.append('longitude', longitude.toString());
    url.searchParams.append('timezone', 'auto');
    
    if (options.current_weather) {
        url.searchParams.append('current_weather', options.current_weather.toString());
    }
    if (options.hourly) {
        const hourlyOptions = Object.entries(options.hourly);
        if (hourlyOptions.length < 1) {
            url.searchParams.append('hourly', 'temperature_2m');
        }
        else {
            const modifiers = hourlyOptions.filter(([_key, value]) => value).map(([key, _value]) => key);
            url.searchParams.append('hourly', modifiers.join(','));
        }
    }

    return (get(url.href) as Promise<Response<Forecast>>);
};
