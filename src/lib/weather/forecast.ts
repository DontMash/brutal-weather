export type ForecastOptions = {
	current_weather?: boolean;
	hourly?: ForecastHourlyOptions;
};
type ForecastHourlyOptions = {
	temperature_2m?: boolean;
	relativehumidity_2m?: boolean;
	apparent_temperature?: boolean;
	precipitation_probability?: boolean;
	weathercode?: boolean;
	is_day?: boolean;
};

export type Forecast = {
	current_weather?: Weather;
	elevation: Meter;
	hourly?: HourlyWeather;
	latitude: Degrees;
	longitude: Degrees;
};
type Weather = {
	is_day: Daytime;
	temperature: Celsius;
	time: DateTimeString;
	weathercode: WeatherCode;
	winddirection: Degrees;
	windspeed: KilometerPerHour;
};
/**
 * Represents the weather forecast for the next week (starting today at midnight).
 * Each list contains of 168 (24 * 7) entries.
 */
type HourlyWeather = {
	time: Array<DateTimeString>;
	temperature_2m: Array<Celsius>;
	is_day?: Array<Daytime>;
	relativehumidity_2m?: Array<Percent>;
	apparent_temperature?: Array<Celsius>;
	precipitation?: Array<Millimeter>;
	precipitation_probability?: Array<Percent>;
	weathercode?: Array<WeatherCode>;
};

type DateTimeString = string;
type Millimeter = number;
type Meter = number;
type KilometerPerHour = number;
type Degrees = number;
type Celsius = number;
type Percent = number;
export enum Daytime {
	Night,
	Day
}
/**
 * WMO code
 */
export type WeatherCode =
	0
	| 1
	| 2
	| 3
	| 45
	| 48
	| 51
	| 53
	| 55
	| 56
	| 57
	| 61
	| 63
	| 65
	| 66
	| 67
	| 71
	| 73
	| 75
	| 77
	| 80
	| 81
	| 82
	| 85
	| 86
	| 95
	| 96
	| 99;
export enum WeatherStatus {
	Clear = 'Clear',
	Cloudy = 'Cloudy',
	Overcast = 'Overcast',
	Foggy = 'Foggy',
	Drizzle = 'Drizzle',
	FreezingDrizzle = 'Freezing Drizzle',
	Rain = 'Rain',
	FreezingRain = 'Freezing Rain',
	SnowFall = 'Snow Fall',
	SnowGrains = 'Snow Grains',
	RainShower = 'Rain Shower',
	SnowShower = 'Snow Shower',
	Thunderstorm = 'Thunderstorm',
	ThunderstormHail = 'Thunderstorm with hail'
}
export type TemperatureStatus = 'cold' | 'normal' | 'hot';
export type WinddirectionTitle = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';

export const getWeatherStatus = (code: WeatherCode): WeatherStatus => {
	switch (code) {
		case 0:
			return WeatherStatus.Clear;

		case 1:
		case 2:
			return WeatherStatus.Cloudy;

		case 3:
			return WeatherStatus.Overcast;

		case 45:
		case 48:
			return WeatherStatus.Foggy;

		case 51:
		case 53:
		case 55:
			return WeatherStatus.Drizzle;

		case 56:
		case 57:
			return WeatherStatus.FreezingDrizzle;

		case 61:
		case 63:
		case 65:
			return WeatherStatus.Rain;

		case 66:
		case 67:
			return WeatherStatus.FreezingRain;

		case 71:
		case 73:
		case 75:
			return WeatherStatus.SnowFall;

		case 77:
			return WeatherStatus.SnowGrains;

		case 80:
		case 81:
		case 82:
			return WeatherStatus.RainShower;

		case 85:
		case 86:
			return WeatherStatus.SnowShower;

		case 95:
			return WeatherStatus.Thunderstorm;

		case 96:
		case 99:
			return WeatherStatus.ThunderstormHail;

		default:
			throw new Error('Unknown weather code');
	}
};

const COLD_TEMPERATURE_CELSIUS = 0;
const HOT_TEMPERATURE_CELSIUS = 20;
export const getTemperatureStatus = (temperature: number): TemperatureStatus => {
	if (temperature <= COLD_TEMPERATURE_CELSIUS) return 'cold';
	else if (temperature >= HOT_TEMPERATURE_CELSIUS) return 'hot';
	else return 'normal';
};

export const getWinddirectionTitle = (value: number): WinddirectionTitle => {
	const direction = value % 360;
	if ((direction >= 337.5 && direction < 360) || (direction >= 0 && direction < 22.5)) return 'N';
	else if (direction >= 22.5 && direction < 67.5) return 'NE';
	else if (direction >= 67.5 && direction < 112.5) return 'E';
	else if (direction >= 112.5 && direction < 157.5) return 'SE';
	else if (direction >= 157.5 && direction < 202.5) return 'S';
	else if (direction >= 202.5 && direction < 247.5) return 'SW';
	else if (direction >= 247.5 && direction < 292.5) return 'W';
	else if (direction >= 292.5 && direction < 337.5) return 'NW';
	else throw new Error('Unknown wind direction title');
};
