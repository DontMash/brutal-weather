// @vitest-environment happy-dom
import { describe, it, expect, vi, afterAll } from 'vitest';
import 'fake-indexeddb/auto';

import { add, get, has, remove, type Favorite, getAll } from './favorites.service';
import type { Location } from '$lib/weather/geocoding';

const mockLocation: Location = {
	id: -1,
	name: 'Test',
	country: 'Deutschland',
	country_code: 'de-DE',
	latitude: 5,
	longitude: 10
} as const;
const mockFavorite: Favorite = {
	id: -1,
	location: mockLocation,
	query: `id=${mockLocation.id}&name=${mockLocation.name}`
} as const;

describe('FavoritesService', () => {
	afterAll(() => {
		vi.clearAllMocks();
	});

	it('should create db access', async () => {
		const indexedDBOpenSpy = vi.spyOn(indexedDB, 'open');
		await add(mockLocation);

		expect(indexedDBOpenSpy).toBeCalledTimes(1);
	});

	describe('add', () => {
		it('should successfully resolve', async () => {
			const promise = add(mockLocation);

			await expect(promise).resolves.not.toThrow();
		});
		it('should resolve to updated existing entry', async () => {
			const mockLocation1: Location = { ...mockLocation, name: 'Test1' };
			await add(mockLocation1);

			const favorite = await get(mockLocation.id);

			expect(favorite.location).not.toEqual(mockLocation);
			expect(favorite.location).toEqual(mockLocation1);
		});
	});

	describe('remove', () => {
		it('should successfully resolve', async () => {
			const promise = remove(mockLocation.id);

			await expect(promise).resolves.not.toThrow();
		});
	});

	describe('has', () => {
		it('should successfully resolve', async () => {
			await add(mockLocation);
			const promise = has(mockLocation.id);

			await expect(promise).resolves.not.toThrow();
		});
		it('should reject if entry not available', async () => {
			await remove(mockLocation.id);
			const promise = has(mockLocation.id);

			await expect(promise).rejects.toThrow();
		});
	});

	describe('get', () => {
		it('should successfully resolve', async () => {
			await add(mockLocation);
			const promise = get(mockLocation.id);

			await expect(promise).resolves.not.toThrow();
		});
		it('should resolve to requested favorite', async () => {
			const favorite = await get(mockLocation.id);

			expect(favorite).toEqual(mockFavorite);
		});
		it('should reject if entry not available', async () => {
			await remove(mockLocation.id);
			const promise = has(mockLocation.id);

			await expect(promise).rejects.toThrow();
		});
	});

	describe('getAll', () => {
		it('should successfully resolve', async () => {
			await add(mockLocation);
			const promise = getAll();

			await expect(promise).resolves.not.toThrow();
		});
		it('should resolve to all favorites', async () => {
			const favorites = await getAll();

			expect(favorites.length).toBeGreaterThan(0);
		});
		it('should resolve to no entries', async () => {
			await remove(mockLocation.id);
			const favorites = await getAll();

			expect(favorites.length).toBe(0);
		});
	});
});
