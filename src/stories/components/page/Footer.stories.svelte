<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import Footer from '$lib/components/page/Footer.svelte';
</script>

<Meta title="Components/Page/Footer" component={Footer} />

<Template>
	<Footer />
</Template>

<Story name="Default">
	<Footer />
</Story>
