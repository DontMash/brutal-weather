import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { getGeolocation, timeout } from './utils';

describe('Utils', () => {
    describe('timeout', () => {
        beforeAll(() => { vi.useFakeTimers(); });
        afterAll(() => { vi.useRealTimers(); });

        it('should resolve', async () => {
            const promise = timeout(100);
            vi.runAllTimers();
            await expect(promise).resolves.not.toThrow();
        });
        it('should resolve after set time', async () => {
            const time = 100;
            const promise = timeout(time);

            const timeBefore = Date.now();
            vi.advanceTimersByTime(time);
            const timeAfter = Date.now();

            await expect(promise).resolves.not.toThrow();
            expect(timeAfter).toBe(timeBefore + time);
        });
    });

    describe.skip('get', () => {
    });

    describe('getGeolocation', () => {
        beforeEach(() => {
            vi.stubGlobal('navigator', {
                geolocation: mockGeolocation,
            });
        });
        afterEach(() => {
            vi.restoreAllMocks();
        });
        const mockGeolocation: Partial<Geolocation> = {
            getCurrentPosition: (success, error) => {
                success({
                    coords: mockGeolocationCoordinates,
                    timestamp: Date.now(),
                });
            },
        };
        const mockGeolocationCoordinates: GeolocationCoordinates = {
            accuracy: 100,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            latitude: 0,
            longitude: 0,
            speed: null,
        };
        const mockPositionError: GeolocationPositionError = {
            code: 1,
            message: 'Permission denied',
            PERMISSION_DENIED: 1,
            POSITION_UNAVAILABLE: 2,
            TIMEOUT: 3,
        };

        it('should resolve', async () => {
            const promise = getGeolocation();
            await expect(promise).resolves.not.toThrow();
        });
        it('should resolve to value', async () => {
            const position = await getGeolocation();
            expect(position.coords).toEqual(mockGeolocationCoordinates);
        });
        it('should reject if not supported', async () => {
            vi.stubGlobal('navigator', {
                geolocation: undefined,
            });
            const promise = getGeolocation();
            const error = new Error('Your browser does not support geolocation');
            await expect(promise).rejects.toThrow(error);
        });
        it('should reject if geolocation error', async () => {
            const geolocation = { ...mockGeolocation };
            geolocation.getCurrentPosition = (success, error) => {
                error!(mockPositionError);
            };
            vi.stubGlobal('navigator', {
                geolocation
            });
            const promise = getGeolocation();
            const error = new Error('Unable to get your location');
            await expect(promise).rejects.toThrow(error);
        });
        it('should use current position', async () => {
            const getSpy = vi.spyOn(mockGeolocation, 'getCurrentPosition');
            await getGeolocation();

            expect(getSpy).toBeCalledTimes(1);
        });
    });
});
