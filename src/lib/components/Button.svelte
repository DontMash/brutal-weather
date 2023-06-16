<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Color, Size } from './button';

	export let label: string;
	export let color: Color = 'primary';
	export let size: Size = 'medium';

	const dispatch = createEventDispatcher();

	const colorVariations: Record<Color, string> = {
		primary: 'hover:bg-amber-400 focus-visible:bg-amber-400',
		secondary: 'hover:bg-sky-400 focus-visible:bg-sky-400'
	};
	const sizeVariants: Record<Size, string> = {
		square: 'h-10 w-10 overflow-hidden',
		medium: 'px-3 py-2'
	};
</script>

<button
	class={`${colorVariations[color]} ${sizeVariants[size]} hover:bold-shadow focus-visible:bold-shadow relative rounded-lg bg-neutral-800 fill-slate-100 p-1 text-slate-100 transition after:absolute after:left-0 after:top-0 after:hidden after:h-[calc(100%_+_0.25rem)] after:w-[calc(100%_+_0.25rem)] after:rounded-[inherit] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:fill-neutral-800 hover:text-neutral-800 hover:after:block focus:outline-none focus-visible:-translate-x-0.5 focus-visible:-translate-y-0.5 focus-visible:fill-neutral-800 focus-visible:text-neutral-800`}
	aria-label={label}
	on:click={() => dispatch('click')}
>
	<slot>Button</slot>
</button>
