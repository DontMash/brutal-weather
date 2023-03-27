export type Forecast = {
    current_weather: Weather;
};

type Weather = {
    temperature: number;
    time: string;
    winddirection: number;
    windspeed: number;
};
