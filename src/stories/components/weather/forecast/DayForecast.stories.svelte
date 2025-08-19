<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import DayForecast from '$lib/components/weather/forecast/DayForecast.svelte';
	import { mockDayForecast } from '../../../mock';

	const { Story } = defineMeta({
		title: 'Components/Weather/Forecast/DayForecast',
		component: DayForecast,
		argTypes: {
			forecast: {
				control: 'object',
				name: 'Forecast',
				description: 'An object defining the values of the day forecast.'
			}
		},
		args: {
			forecast: mockDayForecast
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<DayForecast {...args} />
	{/snippet}
</Story>
