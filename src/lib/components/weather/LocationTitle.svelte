<script lang="ts">
	import type { Location } from '$lib/weather/geocoding';

	export let location: Partial<Location>;
</script>

<span class="font-medium leading-none">
	<slot name="before-name" />{location.name}
</span>
<small class="text-sm leading-none">
	{#if location.country}
		{location.country}
	{/if}
	{#if location.admin1}
		- {location.admin1}
	{/if}
	{#if location.admin3}
		/ {location.admin3}
	{/if}
</small>
