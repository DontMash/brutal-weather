import { describe, expect, it } from 'vitest';
import {
	WeatherStatus,
	getWeatherStatus,
	type WeatherCode,
	getTemperatureStatus,
	getWinddirectionTitle
} from './forecast';

describe('Forecast-Utils', () => {
	describe('getWeatherStatus', () => {
		const WEATHER_CODES: Array<WeatherCode> = [
			0, 1, 2, 3, 45, 48, 51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 71, 73, 75, 77, 80, 81, 82, 85,
			86, 95, 96, 99
		];
		const WEATHER_MAPPING: Record<WeatherCode, WeatherStatus> = {
			0: WeatherStatus.Clear,
			1: WeatherStatus.Cloudy,
			2: WeatherStatus.Cloudy,
			3: WeatherStatus.Overcast,
			45: WeatherStatus.Foggy,
			48: WeatherStatus.Foggy,
			51: WeatherStatus.Drizzle,
			53: WeatherStatus.Drizzle,
			55: WeatherStatus.Drizzle,
			56: WeatherStatus.FreezingDrizzle,
			57: WeatherStatus.FreezingDrizzle,
			61: WeatherStatus.Rain,
			63: WeatherStatus.Rain,
			65: WeatherStatus.Rain,
			66: WeatherStatus.FreezingRain,
			67: WeatherStatus.FreezingRain,
			71: WeatherStatus.SnowFall,
			73: WeatherStatus.SnowFall,
			75: WeatherStatus.SnowFall,
			77: WeatherStatus.SnowGrains,
			80: WeatherStatus.RainShower,
			81: WeatherStatus.RainShower,
			82: WeatherStatus.RainShower,
			85: WeatherStatus.SnowShower,
			86: WeatherStatus.SnowShower,
			95: WeatherStatus.Thunderstorm,
			96: WeatherStatus.ThunderstormHail,
			99: WeatherStatus.ThunderstormHail
		};

		it('should return weather status', () => {
			const status = getWeatherStatus(0);
			expect(status).toBe(WeatherStatus.Clear);
		});
		it('should return weather status (random)', () => {
			const random = Math.round(Math.random() * (WEATHER_CODES.length - 1));
			const code = WEATHER_CODES[random];
			const result = WEATHER_MAPPING[code];
			const status = getWeatherStatus(code);
			expect(status).toBe(result);
		});
		it('should return weather status (10x random)', () => {
			for (let i = 0; i < 10; i++) {
				const random = Math.round(Math.random() * (WEATHER_CODES.length - 1));
				const code = WEATHER_CODES[random];
				const result = WEATHER_MAPPING[code];
				const status = getWeatherStatus(code);
				expect(status).toBe(result);
			}
		});
		it('should fail for invalid weather code', () => {
			const fn = () => getWeatherStatus(-1 as WeatherCode);
			expect(fn).toThrow();
		});
	});

	describe('getTemperatureStatus', () => {
		const COLD_TEMPERATURE_CELSIUS = 0;
		const HOT_TEMPERATURE_CELSIUS = 20;
		const test = (value: number) =>
			value <= COLD_TEMPERATURE_CELSIUS
				? 'cold'
				: value >= HOT_TEMPERATURE_CELSIUS
					? 'hot'
					: 'normal';

		it('should return cold', () => {
			const status = getTemperatureStatus(0);
			expect(status).toBe('cold');
		});
		it('should return hot', () => {
			const status = getTemperatureStatus(20);
			expect(status).toBe('hot');
		});
		it('should return normal', () => {
			const status = getTemperatureStatus(10);
			expect(status).toBe('normal');
		});
		it('should return status (random)', () => {
			const random = Math.round(Math.random() * 200 - 100);
			const result = test(random);
			const status = getTemperatureStatus(random);
			expect(status).toBe(result);
		});
		it('should return status (10x random)', () => {
			for (let i = 0; i < 10; i++) {
				const random = Math.round(Math.random() * 200 - 100);
				const result = test(random);
				const status = getTemperatureStatus(random);
				expect(status).toBe(result);
			}
		});
	});

	describe('getWinddirectionTitle', () => {
		it('should return "North"', () => {
			const title = getWinddirectionTitle(0);
			expect(title).toBe('N');
		});
		it('should return status (random)', () => {
			const random = Math.round(Math.random() * 360);
			const title = getWinddirectionTitle(random);
			expect(title).toBeDefined();
		});
		it('should return status (10x random)', () => {
			for (let i = 0; i < 10; i++) {
				const random = Math.round(Math.random() * 360);
				const title = getWinddirectionTitle(random);
				expect(title).toBeDefined();
			}
		});
		it('should fail for invalid wind direction', () => {
			const fn = () => getWinddirectionTitle(-1);
			expect(fn).toThrow();
		});
	});
});
