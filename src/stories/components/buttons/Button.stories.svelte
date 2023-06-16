<script lang="ts">
	import type { ArgTypes } from '@storybook/svelte';
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import Button from '$lib/components/Button.svelte';
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
		}
	};
	const defaultArgs: Partial<any> = {
		label: 'Button',
		color: 'primary',
		size: 'medium'
	};
</script>

<Meta title="Components/Buttons/Button" component={Button} argTypes={defaultArgTypes} args={defaultArgs} />

<Template let:args>
	<Button {...args} />
</Template>

<Story name="Default" let:args>
	<Button label="Button" {...args} />
</Story>

<Story name="Primary" let:args args={{ ...defaultArgs, color: 'primary' }}>
	<Button {...args} />
</Story>

<Story name="Secondary" let:args args={{ ...defaultArgs, color: 'secondary' }}>
	<Button {...args} />
</Story>

<Story name="Square" let:args args={{ ...defaultArgs, size: 'square' }}>
	<Button {...args}>
		<ShareIcon />
	</Button>
</Story>

<Story name="Medium" let:args args={{ ...defaultArgs, size: 'medium' }}>
	<Button {...args} />
</Story>
