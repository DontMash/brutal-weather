<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Loading from '$lib/components/Loading.svelte';

	const { Story } = defineMeta({
		title: 'Components/Loading',
		component: Loading
	});
</script>

<Story name="Default">
	<Loading />
</Story>
