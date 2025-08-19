<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import WindIndicator from '$lib/components/weather/WindIndicator.svelte';

	const { Story } = defineMeta({
		title: 'Components/Weather/WindIndicator',
		component: WindIndicator,
		argTypes: {
			windspeed: {
				type: 'number',
				defaultValue: 1,
				description: 'Windspeed'
			},
			winddirection: {
				type: 'number',
				control: { type: 'range', min: 0, max: 360, step: 0.5 },
				defaultValue: 1,
				description: 'Is it day-/nighttime?'
			}
		},
		args: {
			windspeed: 1,
			winddirection: 45
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<WindIndicator {...args} />
	{/snippet}
</Story>
