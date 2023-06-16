<script lang="ts">
	import WeatherStatus from '$lib/components/weather/WeatherStatus.svelte';
	import WindIndicator from '$lib/components/weather/WindIndicator.svelte';

	import {
		getTemperatureStatus,
		type Forecast,
		type TemperatureStatus
	} from '$lib/weather/forecast';

	export let forecast: Forecast;

	$: forecastDate = new Date(forecast.current_weather ? forecast.current_weather.time : Date.now());
	$: forecastDateString = forecastDate.toLocaleString().slice(0, -3);

	const tempVariants: Record<TemperatureStatus, string> = {
		cold: 'bold-drop-shadow drop-shadow-sky',
		normal: '',
		hot: 'bold-drop-shadow drop-shadow-amber'
	};
</script>

{#if forecast.current_weather}
	<figure class="divide-y-2 w-full grow divide-neutral-800">
		<div class="flex flex-col items-center justify-center space-y-2 p-2 text-center">
			<strong
				class={`${
					tempVariants[getTemperatureStatus(forecast.current_weather.temperature)]
				} text-8xl leading-none`}
				>{forecast.current_weather.temperature}°
			</strong>
			<time class="text-lg leading-none" datetime={forecastDateString}>{forecastDateString}</time>
		</div>
		<div class="grid grid-cols-2 divide-x-2 divide-neutral-800">
			<div class="relative flex flex-col items-center justify-center bg-neutral-800 p-2">
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
	</figure>
{/if}
