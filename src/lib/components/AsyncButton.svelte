<script lang="ts">
	import Button from './Button.svelte';

	import { type Snippet } from 'svelte';
	import type { Color, Size } from './button';

	const ANIMATION_DURATION = 300;

	interface Props {
		label: string;
		color?: Color;
		size?: Size;
		loading?: boolean;
		onclick: () => void;
		children: Snippet;
	}

	let {
		label,
		color = 'primary',
		size = 'medium',
		loading = false,
		onclick,
		children
	}: Props = $props();

	export const getAnimationDuration = (): number => ANIMATION_DURATION;
</script>

<div
	class="inline-flex data-[loading=true]:pointer-events-none data-[loading=true]:animate-spin-fast"
	data-loading={loading}
>
	<Button {label} {color} {size} {onclick}>
		{@render children?.()}
	</Button>
</div>
