<script lang="ts">
	import WeatherStatus from './WeatherStatus.svelte';
	import WindIndicator from './WindIndicator.svelte';

	import {
		getTemperatureStatus,
		type Forecast,
		type TemperatureStatus
	} from '$lib/weather/forecast';

	export let forecast: Forecast;

	$: forecastDate = new Date(forecast.current_weather.time);
	$: forecastDateString = forecastDate.toLocaleString().slice(0, -3);

	const tempVariants: Record<TemperatureStatus, string> = {
		cold: 'bold-drop-shadow drop-shadow-sky',
		normal: '',
		hot: 'bold-drop-shadow drop-shadow-amber'
	};
</script>

<div class="flex w-full grow flex-col items-center justify-center space-y-2 p-2 text-center">
	<strong
		class={`${
			tempVariants[getTemperatureStatus(forecast.current_weather.temperature)]
		} text-8xl leading-none`}
		>{forecast.current_weather.temperature}°
	</strong>
	<time class="text-lg leading-none" datetime={forecastDateString}>{forecastDateString}</time>
</div>
<div class="grid w-full grid-cols-2 divide-x-2 divide-neutral-800">
	<div class="flex flex-col items-center justify-center bg-neutral-800 p-2">
		<WeatherStatus
			code={forecast.current_weather.weathercode}
			daytime={forecast.current_weather.is_day}
		/>
	</div>
	<div class="flex flex-col items-center justify-center bg-amber-300 fill-neutral-800 p-2">
		<WindIndicator
			winddirection={forecast.current_weather.winddirection}
			windspeed={forecast.current_weather.windspeed}
		/>
		<span class="text-sm leading-none">
			Elev. / {forecast.elevation} m
		</span>
	</div>
</div>
