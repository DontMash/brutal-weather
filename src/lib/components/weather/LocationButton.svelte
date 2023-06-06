<script lang="ts">
	import CircleFlag from '$lib/components/CircleFlag.svelte';
	import LocationTitle from './LocationTitle.svelte';

	import type { Location } from '$lib/weather/geocoding';

	export let location: Location;

	$: forecastURL = getForecastURL(location);

	const getForecastURL = (location: Location): string => {
		const forecastParams = new URLSearchParams({
			id: location.id.toString(),
			name: location.name,
		});

		return `forecast?${forecastParams.toString()}`;
	};
</script>

<a
	class="flex w-full items-center space-x-1 px-2 py-1 transition-colors hover:bg-slate-200 focus:outline-none focus-visible:bg-slate-200 active:bg-slate-300"
	href={forecastURL}
	aria-label={`Select ${location.name}`}
>
	<CircleFlag country={location.country} country_code={location.country_code} />
	<div class="flex flex-col text-left">
		<LocationTitle {location} />
	</div>
</a>
