<script lang="ts">
	import { onMount } from 'svelte';

	import LocationButton from '$lib/components/weather/LocationButton.svelte';
	import favoritesService from '$lib/components/weather/favorites.service';
</script>

{#await favoritesService.getAll() then favorites}
	{#if favorites.length > 0}
		<ul class="divide-y-2 divide-neutral-800 border-b-2 border-neutral-800">
			{#each favorites as favorite}
				{@const location = favorite.location}
				<li>
					<LocationButton {location} />
				</li>
			{/each}
		</ul>
	{:else}
		<i>No favorites found</i>
	{/if}
{/await}
