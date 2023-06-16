import { Daytime, type Forecast } from '$lib/weather/forecast';
import type { Location } from '$lib/weather/geocoding';

const mockForecast: Forecast = {
    elevation: 1,
    latitude: 1,
    longitude: -1,
};
export const mockCurrentForecast: Forecast = {
    ...mockForecast,
    current_weather: {
        is_day: Daytime.Day,
        temperature: 10,
        time: new Date().toISOString().slice(0, -8),
        weathercode: 1,
        winddirection: 45,
        windspeed: 10
    }
};
export const mockDayForecast: Forecast = {
    ...mockForecast,
    hourly: {
        is_day: [Daytime.Day],
        temperature_2m: [10],
        time: [new Date().toISOString().slice(0, -8)],
        weathercode: [1]
    }
};
export const mockLocation: Location = {
    id: 0,
    name: 'Test',
    country: 'Nowhere',
    country_code: 'id',
    latitude: 1,
    longitude: -1
};
export const mockLocations: Array<Location> = [
    {
        ...mockLocation,
    },
    {
        ...mockLocation,
        id: 1,
        name: 'Test1',
        country_code: 'de',
    },
    {
        ...mockLocation,
        id: 2,
        name: 'Test2',
        country_code: 'fr',
    },
    {
        ...mockLocation,
        id: 3,
        name: 'Test3',
        country_code: 'gb',
    },
]
