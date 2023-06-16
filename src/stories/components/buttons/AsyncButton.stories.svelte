<script lang="ts">
	import type { ArgTypes } from '@storybook/svelte';
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import AsyncButton from '$lib/components/AsyncButton.svelte';
	import ShareIcon from '$lib/components/icons/ShareIcon.svelte';

	const defaultArgTypes: ArgTypes = {
		label: {
			type: 'string',
			control: 'text',
			defaultValue: 'Button',
			description: 'Label of the button for accessibility'
		},
		color: {
			type: 'string',
			options: ['primary', 'secondary'],
			control: 'select',
			defaultValue: 'primary',
			description: 'Background color on hover'
		},
		size: {
			type: 'string',
			options: ['square', 'medium'],
			control: 'radio',
			defaultValue: 'square',
			description: 'Size of the button'
		},
		loading: {
			type: 'boolean',
			control: 'boolean',
			defaultValue: false,
			description: 'Animate loading state'
		}
	};
	const defaultArgs: Partial<any> = {
		label: 'Button',
		color: 'primary',
		size: 'medium',
		loading: false
	};
</script>

<Meta
	title="Components/Buttons/AsyncButton"
	component={AsyncButton}
	argTypes={defaultArgTypes}
	args={defaultArgs}
/>

<Template let:args>
	<AsyncButton {...args} />
</Template>

<Story name="Default" let:args>
	<AsyncButton label="Button" {...args} />
</Story>

<Story name="Primary" let:args args={{ ...defaultArgs, color: 'primary' }}>
	<AsyncButton {...args} />
</Story>

<Story name="Secondary" let:args args={{ ...defaultArgs, color: 'secondary' }}>
	<AsyncButton {...args} />
</Story>

<Story name="Square" let:args args={{ ...defaultArgs, size: 'square' }}>
	<AsyncButton {...args}>
		<ShareIcon />
	</AsyncButton>
</Story>

<Story name="Medium" let:args args={{ ...defaultArgs, size: 'medium' }}>
	<AsyncButton {...args} />
</Story>

<Story name="Loading" let:args args={{ ...defaultArgs, loading: true, size: 'square' }}>
	<AsyncButton {...args}>
		<ShareIcon />
	</AsyncButton>
</Story>
