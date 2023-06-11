import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { get } from '$lib/utils';
import type { Forecast } from '$lib/weather/forecast';
import type { Location } from '$lib/weather/geocoding';

const API_PATH = 'api/v1';
const API_SEARCH_PATH = API_PATH + '/search';
const API_FORECAST_PATH = API_PATH + '/forecast';

export const load = (({ url }) =>
	new Promise((resolve, reject) => {
		const id = url.searchParams.get('id');
		const name = url.searchParams.get('name');
		const latitude = url.searchParams.get('latitude');
		const longitude = url.searchParams.get('longitude');

		const isLocationRequest = id && name;
		const isGeoRequest = latitude && longitude;
		const forecastURL = new URL(API_FORECAST_PATH, url.origin);
		if (isLocationRequest) {
			const searchURL = new URL(API_SEARCH_PATH, url.origin);
			searchURL.searchParams.set('id', id);
			searchURL.searchParams.set('name', name);
			get<Array<Location>>(searchURL.href)
				.then((locations) => {
					const location = locations.find((location) => location.id === +id);
					if (!location) return reject(error(500, 'Unknown location request'));

					forecastURL.searchParams.set('latitude', location.latitude.toString());
					forecastURL.searchParams.set('longitude', location.longitude.toString());

					get<Forecast>(forecastURL.href)
						.then((forecast) => resolve({ forecast, location }))
						.catch((reason) => reject(error(500, reason.message)));
				})
				.catch((reason) => reject(error(500, reason.message)));
		} else if (isGeoRequest) {
			forecastURL.searchParams.set('latitude', latitude);
			forecastURL.searchParams.set('longitude', longitude);
			const location: Partial<Location> = {
				name: 'Your location',
				latitude: +latitude,
				longitude: +longitude
			};

			get<Forecast>(forecastURL.href)
				.then((forecast) => resolve({ forecast, location }))
				.catch((reason) => reject(error(500, reason.message)));
		} else {
			return reject(error(400, 'Invalid query parameters'));
		}
	})) satisfies PageServerLoad;
