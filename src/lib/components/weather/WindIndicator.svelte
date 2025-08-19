<script lang="ts">
	import ArrowUpAltIcon from '$lib/components/icons/ArrowUpAltIcon.svelte';
	import { getWinddirectionTitle } from '$lib/weather/forecast';

	interface Props {
		windspeed: number;
		winddirection: number;
	}

	let { windspeed, winddirection }: Props = $props();

	let winddirectionIconElement: HTMLElement | undefined = $state();
	let winddirectionTitle = $derived(getWinddirectionTitle(winddirection));

	$effect(() => {
		winddirectionIconElement?.style.setProperty('--direction', `${winddirection.toString()}deg`);
	});
</script>

<figure class="flex flex-col items-center">
	<div class="direction-rotate h-16 w-16" bind:this={winddirectionIconElement}>
		<ArrowUpAltIcon />
	</div>
	<small class="text-sm leading-none">
		{winddirectionTitle} / {windspeed} km/h
	</small>
</figure>

<style lang="postcss">
	.direction-rotate {
		transform: rotateZ(var(--direction, 0deg));
	}
</style>
