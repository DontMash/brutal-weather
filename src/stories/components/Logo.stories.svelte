<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Logo from '$lib/components/Logo.svelte';

	const { Story } = defineMeta({
		title: 'Components/Logo',
		component: Logo
	});
</script>

<Story name="Default">
	<Logo />
</Story>

<Story name="Sized">
	{#snippet template()}
		<figure class="w-48">
			<Logo />
		</figure>
	{/snippet}
</Story>
