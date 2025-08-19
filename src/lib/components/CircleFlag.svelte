<script lang="ts">
	interface Props {
		country: string | undefined;
		country_code: string;
	}

	let { country, country_code }: Props = $props();
</script>

<picture class="inline-block overflow-hidden rounded-full border-2 border-neutral-800">
	<img
		class="size-8 scale-[1.02]"
		src={`https://hatscripts.github.io/circle-flags/flags/${country_code.toLowerCase()}.svg`}
		width="48"
		height="48"
		alt={country}
	/>
</picture>
