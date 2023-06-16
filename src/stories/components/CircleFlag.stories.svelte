<script lang="ts">
	import type { ArgTypes } from '@storybook/svelte';
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import CircleFlag from '$lib/components/CircleFlag.svelte';

	const defaultArgTypes: ArgTypes = {
		country: {
			type: 'string',
			control: 'text',
			defaultValue: 'Deutschland',
			description: 'Name of the country to be displayed (alt-text)'
		},
		country_code: {
			type: 'string',
			control: 'text',
			defaultValue: 'de',
			description: 'Code of the country to be displayed'
		}
	};
	const defaultArgs: Partial<any> = {
		country: 'Deutschland',
		country_code: 'de'
	};	
</script>

<Meta
	title="Components/CircleFlag"
	component={CircleFlag}
	argTypes={defaultArgTypes}
	args={defaultArgs}
/>

<Template let:args>
	<CircleFlag {...args} />
</Template>

<Story name="Default" let:args>
	<CircleFlag {...args} />
</Story>
