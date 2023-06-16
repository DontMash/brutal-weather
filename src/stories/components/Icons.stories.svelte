<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';

	import ArrowUpAltIcon from '$lib/components/icons/ArrowUpAltIcon.svelte';
	import CloseIcon from '$lib/components/icons/CloseIcon.svelte';
	import CloudFilledIcon from '$lib/components/icons/CloudFilledIcon.svelte';
	import FavoriteFilledIcon from '$lib/components/icons/FavoriteFilledIcon.svelte';
	import FavoriteIcon from '$lib/components/icons/FavoriteIcon.svelte';
	import LocationIcon from '$lib/components/icons/LocationIcon.svelte';
	import SearchIcon from '$lib/components/icons/SearchIcon.svelte';
	import ShareIcon from '$lib/components/icons/ShareIcon.svelte';

	import ClearWeatherIcon from '$lib/components/icons/weather/ClearWeatherIcon.svelte';
	import ClearNightWeatherIcon from '$lib/components/icons/weather/ClearNightWeatherIcon.svelte';
	import CloudyWeatherIcon from '$lib/components/icons/weather/CloudyWeatherIcon.svelte';
	import CloudyNightWeatherIcon from '$lib/components/icons/weather/CloudyNightWeatherIcon.svelte';
	import DrizzleWeatherIcon from '$lib/components/icons/weather/DrizzleWeatherIcon.svelte';
	import FoggyWeatherIcon from '$lib/components/icons/weather/FoggyWeatherIcon.svelte';
	import FreezingDrizzleWeatherIcon from '$lib/components/icons/weather/FreezingDrizzleWeatherIcon.svelte';
	import FreezingRainWeatherIcon from '$lib/components/icons/weather/FreezingRainWeatherIcon.svelte';
	import OvercastWeatherIcon from '$lib/components/icons/weather/OvercastWeatherIcon.svelte';
	import RainShowerWeatherIcon from '$lib/components/icons/weather/RainShowerWeatherIcon.svelte';
	import RainWeatherIcon from '$lib/components/icons/weather/RainWeatherIcon.svelte';
	import SnowFallWeatherIcon from '$lib/components/icons/weather/SnowFallWeatherIcon.svelte';
	import SnowGrainsWeatherIcon from '$lib/components/icons/weather/SnowGrainsWeatherIcon.svelte';
	import SnowShowerWeatherIcon from '$lib/components/icons/weather/SnowShowerWeatherIcon.svelte';
	import ThunderstormHailWeatherIcon from '$lib/components/icons/weather/ThunderstormHailWeatherIcon.svelte';
	import ThunderstormWeatherIcon from '$lib/components/icons/weather/ThunderstormWeatherIcon.svelte';
</script>

<Meta title="Components/Icons" />

<Story name="Basic">
	<ul class="flex space-x-4">
		<li>
			<figure class="w-16">
				<ArrowUpAltIcon />
				<em class="block text-center text-xs not-italic">Arrow up alt</em>
			</figure>
		</li>
		<li>
			<figure class="w-16">
				<CloseIcon />
				<em class="block text-center text-xs not-italic">Close</em>
			</figure>
		</li>
		<li>
			<figure class="w-16">
				<CloudFilledIcon />
				<em class="block text-center text-xs not-italic">Cloud filled</em>
			</figure>
		</li>
		<li>
			<figure class="w-16">
				<FavoriteFilledIcon />
				<em class="block text-center text-xs not-italic">Favorite filled</em>
			</figure>
		</li>
		<li>
			<figure class="w-16">
				<FavoriteIcon />
				<em class="block text-center text-xs not-italic">Favorite</em>
			</figure>
		</li>
		<li>
			<figure class="w-16">
				<LocationIcon />
				<em class="block text-center text-xs not-italic">Location</em>
			</figure>
		</li>
		<li>
			<figure class="w-16">
				<SearchIcon />
				<em class="block text-center text-xs not-italic">Search</em>
			</figure>
		</li>
		<li>
			<figure class="w-16">
				<ShareIcon />
				<em class="block text-center text-xs not-italic">Share</em>
			</figure>
		</li>
	</ul>
</Story>

<Story name="Weather">
	<ul class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 rounded-2xl bg-neutral-800 p-4 text-slate-100">
		<li class="flex flex-col items-center">
			<ClearWeatherIcon />
			<em class="block text-center text-xs not-italic">Clear (Day)</em>
		</li>
		<li class="flex flex-col items-center">
			<ClearNightWeatherIcon />
			<em class="block text-center text-xs not-italic">Clear (Night)</em>
		</li>
		<li class="flex flex-col items-center">
			<CloudyWeatherIcon />
			<em class="block text-center text-xs not-italic">Cloudy (Day)</em>
		</li>
		<li class="flex flex-col items-center">
			<CloudyNightWeatherIcon />
			<em class="block text-center text-xs not-italic">Cloudy (Night)</em>
		</li>
		<li class="flex flex-col items-center">
			<DrizzleWeatherIcon />
			<em class="block text-center text-xs not-italic">Drizzle</em>
		</li>
		<li class="flex flex-col items-center">
			<FoggyWeatherIcon />
			<em class="block text-center text-xs not-italic">Foggy</em>
		</li>
		<li class="flex flex-col items-center">
			<FreezingDrizzleWeatherIcon />
			<em class="block text-center text-xs not-italic">Freezing drizzle</em>
		</li>
		<li class="flex flex-col items-center">
			<FreezingRainWeatherIcon />
			<em class="block text-center text-xs not-italic">Freezing rain</em>
		</li>
		<li class="flex flex-col items-center">
			<OvercastWeatherIcon />
			<em class="block text-center text-xs not-italic">Overcast</em>
		</li>
		<li class="flex flex-col items-center">
			<RainShowerWeatherIcon />
			<em class="block text-center text-xs not-italic">Rain shower</em>
		</li>
		<li class="flex flex-col items-center">
			<RainWeatherIcon />
			<em class="block text-center text-xs not-italic">Rain</em>
		</li>
		<li class="flex flex-col items-center">
			<SnowFallWeatherIcon />
			<em class="block text-center text-xs not-italic">Snow fall</em>
		</li>
		<li class="flex flex-col items-center">
			<SnowGrainsWeatherIcon />
			<em class="block text-center text-xs not-italic">Snow grains</em>
		</li>
		<li class="flex flex-col items-center">
			<SnowShowerWeatherIcon />
			<em class="block text-center text-xs not-italic">Snow shower</em>
		</li>
		<li class="flex flex-col items-center">
			<ThunderstormHailWeatherIcon />
			<em class="block text-center text-xs not-italic">Thunderstorm hail</em>
		</li>
		<li class="flex flex-col items-center">
			<ThunderstormWeatherIcon />
			<em class="block text-center text-xs not-italic">Thunderstorm </em>
		</li>
	</ul>
</Story>
