<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Navigation from '$lib/components/page/Navigation.svelte';

	const { Story } = defineMeta({
		title: 'Components/Page/Navigation',
		component: Navigation
	});
</script>

<Story name="Default">
	<Navigation />
</Story>
