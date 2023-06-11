<script lang="ts">
	import type { ComponentType } from 'svelte';
	import ClearWeatherIcon from '$lib/components/icons/weather/ClearWeatherIcon.svelte';
	import CloudyWeatherIcon from '$lib/components/icons/weather/CloudyWeatherIcon.svelte';
	import OvercastWeatherIcon from '$lib/components/icons/weather/OvercastWeatherIcon.svelte';
	import FoggyWeatherIcon from '$lib/components/icons/weather/FoggyWeatherIcon.svelte';
	import DrizzleWeatherIcon from '$lib/components/icons/weather/DrizzleWeatherIcon.svelte';
	import FreezingDrizzleWeatherIcon from '$lib/components/icons/weather/FreezingDrizzleWeatherIcon.svelte';
	import RainWeatherIcon from '$lib/components/icons/weather/RainWeatherIcon.svelte';
	import FreezingRainWeatherIcon from '$lib/components/icons/weather/FreezingRainWeatherIcon.svelte';
	import SnowFallWeatherIcon from '$lib/components/icons/weather/SnowFallWeatherIcon.svelte';
	import SnowGrainsWeatherIcon from '$lib/components/icons/weather/SnowGrainsWeatherIcon.svelte';
	import RainShowerWeatherIcon from '$lib/components/icons/weather/RainShowerWeatherIcon.svelte';
	import SnowShowerWeatherIcon from '$lib/components/icons/weather/SnowShowerWeatherIcon.svelte';
	import ThunderstormWeatherIcon from '$lib/components/icons/weather/ThunderstormWeatherIcon.svelte';
	import ThunderstormHailWeatherIcon from '$lib/components/icons/weather/ThunderstormHailWeatherIcon.svelte';
	import ClearNightWeatherIcon from '$lib/components/icons/weather/ClearNightWeatherIcon.svelte';
	import CloudyNightWeatherIcon from '$lib/components/icons/weather/CloudyNightWeatherIcon.svelte';

	import {
		getWeatherStatus,
		WeatherStatus,
		type WeatherCode,
		Daytime
	} from '$lib/weather/forecast';

	export let code: WeatherCode;
	export let daytime: Daytime = 1;

	$: status = getWeatherStatus(code);

	const weatherVariants: Record<WeatherStatus, ComponentType> = {
		[WeatherStatus.Clear]: daytime === Daytime.Day ? ClearWeatherIcon : ClearNightWeatherIcon,
		[WeatherStatus.Cloudy]: daytime === Daytime.Day ? CloudyWeatherIcon : CloudyNightWeatherIcon,
		[WeatherStatus.Overcast]: OvercastWeatherIcon,
		[WeatherStatus.Foggy]: FoggyWeatherIcon,
		[WeatherStatus.Drizzle]: DrizzleWeatherIcon,
		[WeatherStatus.FreezingDrizzle]: FreezingDrizzleWeatherIcon,
		[WeatherStatus.Rain]: RainWeatherIcon,
		[WeatherStatus.FreezingRain]: FreezingRainWeatherIcon,
		[WeatherStatus.SnowFall]: SnowFallWeatherIcon,
		[WeatherStatus.SnowGrains]: SnowGrainsWeatherIcon,
		[WeatherStatus.RainShower]: RainShowerWeatherIcon,
		[WeatherStatus.SnowShower]: SnowShowerWeatherIcon,
		[WeatherStatus.Thunderstorm]: ThunderstormWeatherIcon,
		[WeatherStatus.ThunderstormHail]: ThunderstormHailWeatherIcon
	};
</script>

<figure>
	<svelte:component this={weatherVariants[status]} />
</figure>
