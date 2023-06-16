<script lang="ts">
	import WeatherStatus from '$lib/components/weather/WeatherStatus.svelte';

	import { Daytime, type Forecast } from '$lib/weather/forecast';

	export let forecast: Forecast;
</script>

{#if forecast.hourly}
	<ul class="flex w-full overflow-x-auto bg-neutral-800 text-slate-100">
		{#each forecast.hourly.time as time, index}
			{@const hourly = forecast.hourly}
			{@const dateString = new Date(time).toLocaleTimeString().slice(0, -3)}
			<li class="flex flex-col">
				{#if hourly.weathercode}
					<div class="flex flex-col items-center justify-center p-2">
						<WeatherStatus code={hourly.weathercode[index]} daytime={hourly.is_day ? hourly.is_day[index] : Daytime.Day} />
					</div>
				{/if}
				
				{hourly.temperature_2m[index]}

				{#if hourly.apparent_temperature}
					{hourly.apparent_temperature[index]}
				{/if}
				<time class="text-lg leading-none" datetime={dateString}>{dateString}</time>
			</li>
		{/each}
	</ul>
{/if}
