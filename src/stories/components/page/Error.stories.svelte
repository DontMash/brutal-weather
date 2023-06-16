<script lang="ts">
	import type { ArgTypes } from '@storybook/svelte';
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import Error from '$lib/components/page/Error.svelte';

	const defaultArgTypes: ArgTypes = {
		title: {
			type: 'string',
			control: 'text',
			defaultValue: 'Error',
			description: 'Title of the error'
		},
		message: {
			type: 'string',
			control: 'text',
			defaultValue: 'Placeholder',
			description: 'message of the error'
		},
	};
	const defaultArgs: Partial<any> = {
		title: 'Error',
		message: 'Placeholder',
	};
</script>

<Meta
	title="Components/Page/Error"
	component={Error}
	argTypes={defaultArgTypes}
	args={defaultArgs}
/>

<Template let:args>
	<Error {...args} />
</Template>

<Story name="Default" let:args>
	<Error {...args} />
</Story>
