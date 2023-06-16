<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import LocationButton from '$lib/components/weather/LocationButton.svelte';
	import { mockLocation } from '../../mock';
</script>

<Meta title="Components/Weather/LocationButton" component={LocationButton} />

<Template>
	<LocationButton location={mockLocation} />
</Template>

<Story name="Default">
	<LocationButton location={mockLocation} />
</Story>
