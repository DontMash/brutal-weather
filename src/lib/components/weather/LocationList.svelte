<script lang="ts">
	import LocationButton from '$lib/components/weather/LocationButton.svelte';

	import type { Location } from '$lib/weather/geocoding';

	interface Props {
		locations: Array<Location>;
	}

	let { locations }: Props = $props();
</script>

<ul class="divide-y-2 divide-neutral-800">
	{#each locations as location}
		<li>
			<LocationButton {location} />
		</li>
	{/each}
</ul>
