<script lang="ts">
	export let country: string;
	export let country_code: string;
</script>

<picture class="inline-block overflow-hidden rounded-full border-2 border-neutral-800">
	<img
		class="w-8 scale-[1.02]"
		src={`https://hatscripts.github.io/circle-flags/flags/${country_code.toLowerCase()}.svg`}
		width="48"
		height="48"
		alt={country}
	/>
</picture>
