<script lang="ts">
	import Forecast from '$lib/components/weather/forecast/Forecast.svelte';

	import type { PageData } from '../$types';

	export let data: PageData;

	const { forecast, location } = data;
</script>

<h1 class="sr-only">Weather Forecast</h1>
<section>
	{#if forecast && location}
		<h2 class="sr-only">Forecast information for {location.name}</h2>
		<Forecast {forecast} {location} />
	{/if}
</section>
