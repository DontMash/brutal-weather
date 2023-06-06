<script lang="ts">
	import LocationButton from '$lib/components/weather/LocationButton.svelte';

	import type { Location } from '$lib/weather/geocoding';

	export let locations: Array<Location>;
</script>

<ul class="divide-y-2 divide-neutral-800 border-b-2 border-neutral-800">
	{#each locations as location}
		<li>
			<LocationButton {location} />
		</li>
	{/each}
</ul>
