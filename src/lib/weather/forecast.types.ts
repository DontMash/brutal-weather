export type Forecast = {
    latitude: number,
    longitude: number,
    elevation: number,
    current_weather: Weather;
};

type Weather = {
    temperature: number;
    time: string;
    winddirection: number;
    windspeed: number;
};
