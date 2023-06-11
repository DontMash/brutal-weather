// @vitest-environment happy-dom
import { describe, it, expect, vi, afterEach } from 'vitest';

import { getLocations } from './geocoding.service';
import * as utils from '$lib/utils';

describe.skip('GeocodingService', () => {
	afterEach(() => {
		vi.resetAllMocks();
	});
	const getSpy = vi.spyOn(utils, 'get');

	describe('getLocations', () => {
		it('should successfully resolve', async () => {
			const promise = getLocations('Test');

			await expect(promise).resolves.not.toThrow();
		});
		it('should limit amount of results', async () => {
			const locations = await getLocations('Test', 1);

			expect(locations.length).toBeGreaterThan(0);
			expect(locations.length).toBeLessThan(2);
		});
		it('should reject on invalid search term', async () => {
			const promise = getLocations('T');

			await expect(promise).rejects.toThrow();
		});
		it('should use get - utils', async () => {
			await getLocations('Test');

			expect(getSpy).toBeCalledTimes(1);
		});
	});
});
