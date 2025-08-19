<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import CurrentForecast from '$lib/components/weather/forecast/CurrentForecast.svelte';
	import { mockCurrentForecast } from '../../../mock';

	const { Story } = defineMeta({
		title: 'Components/Weather/Forecast/CurrentForecast',
		component: CurrentForecast,
		argTypes: {
			forecast: {
				control: 'object',
				name: 'Forecast',
				description: 'An object defining the values of the current forecast.'
			}
		},
		args: {
			forecast: mockCurrentForecast
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<CurrentForecast {...args} />
	{/snippet}
</Story>
