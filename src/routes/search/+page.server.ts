import type { PageServerLoad } from './$types';

import { error } from '@sveltejs/kit';
import { get } from '$lib/utils';
import type { Location } from '$lib/weather/geocoding';

const API_PATH = 'api/v1';
const API_SEARCH_PATH = API_PATH + '/search';

export const load = (async ({ url }) => {
	try {
		const name = url.searchParams.get('name') ?? '';
		const limit = url.searchParams.get('limit') ?? String(100);

		const searchURL = new URL(API_SEARCH_PATH, url.origin);
		searchURL.searchParams.set('name', name);
		searchURL.searchParams.set('limit', limit);

		const locations = await get<Array<Location>>(searchURL.href);
		return { locations };
	} catch (err) {
		if (err instanceof Error) {
			error(404, err.message);
		}
		console.error('Unknown error', err, typeof err);
		return undefined;
	}
}) satisfies PageServerLoad;
