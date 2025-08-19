<script lang="ts">
	import type { PageData } from './$types';

	import LocationList from '$lib/components/weather/LocationList.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const { locations } = data;
</script>

<h1 class="sr-only">Search</h1>
<section>
	<h2 class="sr-only">Results</h2>
	{#if locations}
		<LocationList {locations} />
	{/if}
</section>
