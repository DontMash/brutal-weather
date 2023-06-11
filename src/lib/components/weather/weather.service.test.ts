// @vitest-environment happy-dom
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';

import { getLocations, getForecast } from './weather.service';
import * as utils from '$lib/utils';

describe('WeatherService', () => {
	beforeEach(() => {
		vi.stubGlobal('location', { origin: 'http://localhost:5173' });
	});
	afterEach(() => {
		vi.clearAllMocks();
	});

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
			const getSpy = vi.spyOn(utils, 'get');
			await getLocations('Test');

			expect(getSpy).toBeCalledTimes(1);
		});
	});

	describe('getForecast', () => {
		it('should successfully resolve', async () => {
			const promise = getForecast(0, 0);

			await expect(promise).resolves.not.toThrow();
		});
		it('should reject on invalid latitude', async () => {
			// latitude from -90 to 90
			const promise = getForecast(91, 0);

			await expect(promise).rejects.toThrow();
		});
		it('should reject on invalid longitude', async () => {
			// longitude from -180 to 180
			const promise = getForecast(0, 181);

			await expect(promise).rejects.toThrow();
		});
		it('should use get - utils', async () => {
			const getSpy = vi.spyOn(utils, 'get');
			await getForecast(0, 0);

			expect(getSpy).toBeCalledTimes(1);
		});
	});
});
