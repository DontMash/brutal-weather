import { error } from '@sveltejs/kit';
import { getLocations } from '$lib/server/geocoding.service';
import type { RequestHandler } from '../$types';

export const GET = (({ url }) =>
    new Promise<Response>((resolve, reject) => {
        const name = url.searchParams.get('name') ?? '';
        const limitParam = url.searchParams.get('limit');
        const limit = limitParam ? +limitParam : undefined;

        getLocations(name, limit)
            .then(locations => resolve(new Response(JSON.stringify(locations))))
            .catch(reason => reject(error(404, reason.message)));
    })) satisfies RequestHandler;
