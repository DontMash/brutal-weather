<script lang="ts">
	interface Props {
		color?: Color;
	}

	let { color = 'dark' }: Props = $props();

	type Color = 'light' | 'dark';
	const colorVariants: Record<Color, string> = {
		light: 'after:border-t-slate-100',
		dark: 'after:border-t-neutral-800'
	};
</script>

<div
	class={`inline-block after:inline-block after:h-6 after:w-6 after:animate-spin after:rounded-full after:border-2 after:border-transparent ${colorVariants[color]}`}
>
	<span class="sr-only">Loading...</span>
</div>
