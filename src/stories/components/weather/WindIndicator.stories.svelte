<script lang="ts">
	import type { ArgTypes } from '@storybook/svelte';
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import WindIndicator from '$lib/components/weather/WindIndicator.svelte';

	const defaultArgTypes: ArgTypes = {
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
	};
	const defaultArgs: Partial<any> = {
		windspeed: 1,
		winddirection: 45
	};
</script>

<Meta
	title="Components/Weather/WindIndicator"
	component={WindIndicator}
	argTypes={defaultArgTypes}
	args={defaultArgs}
/>

<Template let:args>
	<WindIndicator {...args} />
</Template>

<Story name="Default" let:args>
	<WindIndicator {...args} />
</Story>
