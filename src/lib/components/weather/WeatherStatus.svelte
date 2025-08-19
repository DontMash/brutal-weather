<script lang="ts">
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

	interface Props {
		code: WeatherCode;
		daytime?: Daytime;
	}

	let { code, daytime = Daytime.Day }: Props = $props();

	const getWeatherIcon = (status: WeatherStatus, daytime: Daytime) => {
		switch (status) {
			case WeatherStatus.Clear:
				return daytime === Daytime.Day ? ClearWeatherIcon : ClearNightWeatherIcon;
			case WeatherStatus.Cloudy:
				daytime === Daytime.Day ? CloudyWeatherIcon : CloudyNightWeatherIcon;
			case WeatherStatus.Overcast:
				return OvercastWeatherIcon;
			case WeatherStatus.Foggy:
				return FoggyWeatherIcon;
			case WeatherStatus.Drizzle:
				return DrizzleWeatherIcon;
			case WeatherStatus.FreezingDrizzle:
				return FreezingDrizzleWeatherIcon;
			case WeatherStatus.Rain:
				return RainWeatherIcon;
			case WeatherStatus.FreezingRain:
				return FreezingRainWeatherIcon;
			case WeatherStatus.SnowFall:
				return SnowFallWeatherIcon;
			case WeatherStatus.SnowGrains:
				return SnowGrainsWeatherIcon;
			case WeatherStatus.RainShower:
				return RainShowerWeatherIcon;
			case WeatherStatus.SnowShower:
				return SnowShowerWeatherIcon;
			case WeatherStatus.Thunderstorm:
				return ThunderstormWeatherIcon;
			case WeatherStatus.ThunderstormHail:
				return ThunderstormHailWeatherIcon;
		}
	};

	const status = $derived(getWeatherStatus(code));
	const StatusComponent = $derived(getWeatherIcon(status, daytime));
</script>

<StatusComponent />
