import type { Forecast } from '$lib/weather/forecast';
import type { Location } from '$lib/weather/geocoding';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			locations?: Array<Location>;
			forecast?: Forecast;
			location?: Partial<Location>;
		}
		// interface Platform {}
	}
}

export { };
