<script lang="ts">
	import type { ArgTypes } from '@storybook/svelte';
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import WeatherStatus from '$lib/components/weather/WeatherStatus.svelte';

	const defaultArgTypes: ArgTypes = {
		code: {
			type: 'number',
			options: [
				0, 1, 2, 3, 45, 48, 51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 71, 73, 75, 77, 80, 81, 82, 85,
				86, 95, 96, 99
			],
			control: 'select',
			defaultValue: 0,
			description: 'WMO code'
		},
		daytime: {
			type: 'number',
			options: [0, 1],
			control: 'radio',
			defaultValue: 1,
			description: 'Is it day-/nighttime?'
		}
	};
	const defaultArgs: Partial<any> = {
		code: 0,
		daytime: 1
	};
</script>

<Meta
	title="Components/Weather/WeatherStatus"
	component={WeatherStatus}
	argTypes={defaultArgTypes}
	args={defaultArgs}
/>

<Template let:args>
	<WeatherStatus {...args} />
</Template>

<Story name="Default" let:args>
	<div class="inline-block bg-neutral-800 p-4">
		<WeatherStatus {...args} />
	</div>
</Story>
