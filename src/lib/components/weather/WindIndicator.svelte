<script lang="ts">
	import { onMount } from 'svelte';
  
	import ArrowUpAltIcon from '$lib/components/icons/ArrowUpAltIcon.svelte';
	import { getTitle } from '$lib/weather/forecast';

	export let windspeed: number;
	export let winddirection: number;

	$: winddirection_title = getTitle(winddirection);
	let winddirection_icon_element: HTMLElement;

	onMount(() => {
		winddirection_icon_element.style.setProperty('--direction', `${winddirection.toString()}deg`);
	});
</script>

<figure class="flex flex-col items-center">
	<div class="direction-rotate h-16 w-16" bind:this={winddirection_icon_element}>
		<ArrowUpAltIcon />
	</div>
	<small class="text-sm leading-none">
		{winddirection_title} / {windspeed} km/h
	</small>
</figure>

<style lang="postcss">
	.direction-rotate {
		transform: rotateZ(var(--direction, 0deg));
	}
</style>
