import { error } from '@sveltejs/kit';
import { getForecast } from '$lib/server/forecast.service';
import type { RequestHandler } from '../$types';

export const GET = (({ url }) =>
	new Promise<Response>((resolve, reject) => {
		const latitudeParam = url.searchParams.get('latitude');
		const longitudeParam = url.searchParams.get('longitude');
		if (!latitudeParam || !longitudeParam) return reject(error(400, 'Invalid query parameters'));

		const latitude = +latitudeParam;
		const longitude = +longitudeParam;
		return getForecast(latitude, longitude)
			.then((forecast) => resolve(new Response(JSON.stringify(forecast))))
			.catch((reason) => {
				const requestError = reason as Error;
				return reject(error(400, requestError.message));
			});
	})) satisfies RequestHandler;
