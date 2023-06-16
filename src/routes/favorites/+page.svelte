<script lang="ts">
	import Error from '$lib/components/page/Error.svelte';
	import LocationList from '$lib/components/weather/LocationList.svelte';
	import { getAll } from '$lib/components/weather/favorites.service';
</script>

{#await getAll() then favorites}
	{#if favorites.length > 0}
		{@const locations = favorites.map((favorite) => favorite.location)}
		<LocationList {locations} />
	{:else}
		<Error message={'No favorites found'} />
	{/if}
{/await}
