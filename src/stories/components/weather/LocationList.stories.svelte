<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import LocationList from '$lib/components/weather/LocationList.svelte';
	import { mockLocations } from '../../mock';

	const { Story } = defineMeta({
		title: 'Components/Weather/LocationList',
		component: LocationList,
		argTypes: {
			locations: {
				control: 'object',
				name: 'Location',
				description: 'An object defining the location to be selected.',
				defaultValue: location
			}
		},
		args: {
			locations: mockLocations
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<LocationList {...args} />
	{/snippet}
</Story>
