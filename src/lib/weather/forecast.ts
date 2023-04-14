export type Forecast = {
    latitude: number,
    longitude: number,
    elevation: number,
    current_weather: Weather;
};

type Weather = {
    temperature: number;
    time: string;
    weathercode: WeatherCode;
    winddirection: number;
    windspeed: number;
};

export type WeatherCode = 0 | 1 | 2 | 3 | 45 | 48 | 51 | 53 | 55 | 56 | 57 | 61 | 63 | 65 | 66 | 67 | 71 | 73 | 75 | 77 | 80 | 81 | 82 | 85 | 86 | 95 | 96 | 99;
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
    ThunderstormHail = 'Thunderstorm with hail',
};
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
