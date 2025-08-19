<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import LocationButton from '$lib/components/weather/LocationButton.svelte';
	import { mockLocation } from '../../mock';

	const { Story } = defineMeta({
		title: 'Components/Weather/LocationButton',
		component: LocationButton,
		argTypes: {
			location: {
				control: 'object',
				name: 'Location',
				description: 'An object defining the location to be selected.',
				defaultValue: location
			}
		},
		args: {
			location: mockLocation
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<LocationButton {...args} />
	{/snippet}
</Story>
