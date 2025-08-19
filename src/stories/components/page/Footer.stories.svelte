<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	
	import Footer from '$lib/components/page/Footer.svelte';

	const { Story } = defineMeta({
		title: 'Components/Page/Footer',
		component: Footer
	});
</script>

<Story name="Default">
	<Footer />
</Story>
