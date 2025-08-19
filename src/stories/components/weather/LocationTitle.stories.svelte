<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import LocationTitle from '$lib/components/weather/LocationTitle.svelte';
	import { mockLocation } from '../../mock';

	const location = {
		...mockLocation,
		admin1: 'Somewhere',
		admin3: 'Test'
	};
	const { Story } = defineMeta({
		title: 'Components/Weather/Forecast/LocationTitle',
		component: LocationTitle,
		argTypes: {
			location: {
				control: 'object',
				name: 'Location',
				description: 'An object defining the location to be displayed.',
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
		<LocationTitle {...args} />
	{/snippet}
</Story>
