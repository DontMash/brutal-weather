<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import Navigation from '$lib/components/page/Navigation.svelte';
</script>

<Meta title="Components/Page/Navigation" component={Navigation} />

<Template>
	<Navigation />
</Template>

<Story name="Default">
	<Navigation />
</Story>
