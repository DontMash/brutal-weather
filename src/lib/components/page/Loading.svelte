<script lang="ts">
	export let color: Color = 'dark';

	type Color = 'light' | 'dark';
	const colorVariants: Record<Color, string> = {
		'light': 'after:border-t-slate-100',
		'dark': 'after:border-t-neutral-800',
	};
</script>

<figure
	class={`inline-block after:animate-spin after:inline-block after:h-6 after:w-6 after:rounded-full after:border-2 after:border-transparent ${colorVariants[color]}`}
/>
