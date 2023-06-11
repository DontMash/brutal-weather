import type { Forecast, ForecastOptions } from '$lib/weather/forecast';
import type { Response } from '$lib/weather/open-meteo.api';
import { get } from '$lib/utils';

const BASE_URL = 'https://api.open-meteo.com/v1/';
const DEFAULT_FORECAST_OPTIONS: ForecastOptions = {
	current_weather: true,
	hourly: {
		temperature_2m: true,
		apparent_temperature: true,
		precipitation_probability: true,
		relativehumidity_2m: true,
		weathercode: true,
		is_day: true
	}
} as const;

export const getForecast = (
	latitude: number,
	longitude: number,
	options: ForecastOptions = DEFAULT_FORECAST_OPTIONS
): Promise<Forecast> => {
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
		} else {
			const modifiers = hourlyOptions.filter(([, value]) => value).map(([key]) => key);
			url.searchParams.append('hourly', modifiers.join(','));
		}
	}

	return get<Response<Forecast>>(url.href);
};
