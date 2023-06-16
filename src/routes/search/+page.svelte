<script lang="ts">
	import LocationList from '$lib/components/weather/LocationList.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { locations } = data;
</script>

<h1 class="sr-only">Search</h1>
<section>
	<h2 class="sr-only">Results</h2>
	{#if locations}
		<LocationList {locations} />
	{/if}
</section>
