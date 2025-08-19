<script module lang="ts">
	import ShareButton from '$lib/components/ShareButton.svelte';
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'Components/Buttons/ShareButton',
		component: ShareButton
	});
</script>

<Story name="Default">
	<ShareButton />
</Story>
