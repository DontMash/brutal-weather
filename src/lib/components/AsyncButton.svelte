<script lang="ts">
	import Button from './Button.svelte';

	import { createEventDispatcher } from 'svelte';
	import type { Color, Size } from './button';

	const ANIMATION_DURATION = 300;
	const dispatch = createEventDispatcher();

	export let label: string;
	export let color: Color = 'primary';
	export let size: Size = 'medium';
	export let loading = false;

	export const getAnimationDuration = (): number => ANIMATION_DURATION;
</script>

<div
	class="inline-flex data-[loading=true]:pointer-events-none data-[loading=true]:animate-spin-fast"
	data-loading={loading}
>
	<Button {label} {color} {size} on:click={() => dispatch('click')}>
		<slot>Button</slot>
	</Button>
</div>
