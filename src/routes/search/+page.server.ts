import type { PageServerLoad } from './$types';

import { get } from '$lib/utils';
import type { Location } from '$lib/weather/geocoding';
import { error } from '@sveltejs/kit';

const API_PATH = 'api/v1';
const API_SEARCH_PATH = API_PATH + '/search';

export const load = (({ url }) =>
    new Promise((resolve, reject) => {
        const name = url.searchParams.get('name') ?? '';
        const limit = url.searchParams.get('limit') ?? String(100);

        const searchURL = new URL(API_SEARCH_PATH, url.origin);
        searchURL.searchParams.set('name', name);
        searchURL.searchParams.set('limit', limit);

        get<Array<Location>>(searchURL.href)
            .then(locations => resolve({ locations }))
            .catch(reason => reject(error(404, reason.message)));
    })) satisfies PageServerLoad;
