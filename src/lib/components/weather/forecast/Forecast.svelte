<script lang="ts">
	import ShareButton from '$lib/components/ShareButton.svelte';
	import CurrentForecast from '$lib/components/weather/forecast/CurrentForecast.svelte';
	import DayForecast from '$lib/components/weather/forecast/DayForecast.svelte';
	import FavoriteButton from '$lib/components/weather/FavoriteButton.svelte';
	import LocationTitle from '$lib/components/weather/LocationTitle.svelte';

	import type { Forecast } from '$lib/weather/forecast';
	import type { Location } from '$lib/weather/geocoding';

	interface Props {
		forecast: Forecast;
		location: Partial<Location>;
	}

	let { forecast, location }: Props = $props();

	let validLocation = $derived(location as Location);
</script>

<article class="flex h-full flex-col items-center divide-y-2 divide-neutral-800">
	<CurrentForecast {forecast} />
	<!-- <DayForecast {forecast} /> -->

	<div class="flex w-full divide-x-2 divide-neutral-800 bg-sky-300 text-neutral-800">
		<div class="flex grow items-center p-2">
			<h2 class="flex flex-col space-y-1 text-2xl">
				<LocationTitle {location}>
					<svelte:fragment slot="before-name">@</svelte:fragment>
				</LocationTitle>
			</h2>
		</div>
		<div class="flex items-center p-2">
			<ul class="flex space-x-2 leading-none">
				{#if location.id}
					<li>
						<FavoriteButton location={validLocation} />
					</li>
				{/if}
				<li>
					<ShareButton />
				</li>
			</ul>
		</div>
	</div>
</article>
