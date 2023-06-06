<script lang="ts">
	import SearchList from '$lib/components/weather/SearchList.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { locations } = data;
</script>

<h1 class="sr-only">Search</h1>
<section>
	<h2 class="sr-only">Results</h2>
	{#if locations}
		<SearchList {locations} />
	{/if}
</section>
