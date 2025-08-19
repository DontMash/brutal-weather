<script module lang="ts">
	import Forecast from '$lib/components/weather/forecast/Forecast.svelte';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { mockCurrentForecast, mockLocation } from '../../../mock';

	const { Story } = defineMeta({
		title: 'Components/Weather/Forecast',
		component: Forecast,
		argTypes: {
			forecast: {
				control: 'object',
				name: 'Forecast',
				description: 'An object defining the values of the day forecast.'
			},
			location: {
				control: 'object',
				name: 'Location',
				description: 'An object defining the location to be displayed.'
			}
		},
		args: {
			forecast: mockCurrentForecast,
			location: mockLocation
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<Forecast {...args} />
	{/snippet}
</Story>
