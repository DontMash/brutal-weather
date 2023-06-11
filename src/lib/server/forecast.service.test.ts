import { describe, it, expect, vi, afterEach } from 'vitest';
import { getForecast } from './forecast.service';
import * as utils from '$lib/utils';

describe.skip('ForecastService', () => {
    afterEach(() => { vi.resetAllMocks; });
    const getSpy = vi.spyOn(utils, 'get');

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
            await getForecast(0, 0);

            expect(getSpy).toBeCalledTimes(1);
        });
    });
});
