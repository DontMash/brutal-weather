import type { RequestHandler } from './$types';

import { error } from '@sveltejs/kit';
import { getLocations } from '$lib/server/geocoding.service';

export const GET: RequestHandler = async ({ url }) => {
	try {
		const name = url.searchParams.get('name') ?? '';
		const limitParam = url.searchParams.get('limit');
		const limit = limitParam ? +limitParam : undefined;

		const value = await getLocations(name, limit);
		return new Response(JSON.stringify(value));
	} catch (err) {
		error(404, (err as Error).message);
	}
};
