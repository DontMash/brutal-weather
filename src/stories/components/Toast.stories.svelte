<script lang="ts">
	import type { ArgTypes } from '@storybook/svelte';
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import { ToastType } from '$lib/components/toast/toast.service';
	import Toast from '$lib/components/toast/Toast.svelte';

	const defaultArgTypes: ArgTypes = {
		label: {
			type: 'string',
			control: 'text',
			defaultValue: 'Default',
			description: 'Label of the toast'
		},
		type: {
			type: 'string',
			options: ['Info', 'Warning', 'Error'],
			control: 'radio',
			defaultValue: 'Info',
			description: 'Type of the toast'
		}
	};
	const defaultArgs: Partial<any> = {
		label: 'Default',
		type: 'Info'
	};
</script>

<Meta title="Components/Toast" component={Toast} argTypes={defaultArgTypes} args={defaultArgs} />

<Template let:args>
	<Toast {...args}>
		{args.label}
	</Toast>
</Template>

<Story name="Default" let:args>
	<Toast {...args}>
		{args.label || 'Default'}
	</Toast>
</Story>

<Story name="Info" let:args args={{ ...defaultArgs, label: '', type: ToastType.Info }}>
	<Toast {...args}>
		{args.label || 'Info'}
	</Toast>
</Story>

<Story name="Warning" let:args args={{ ...defaultArgs, label: '', type: ToastType.Warning }}>
	<Toast {...args}>
		{args.label || 'Warning'}
	</Toast>
</Story>

<Story name="Error" let:args args={{ ...defaultArgs, label: '', type: ToastType.Error }}>
	<Toast {...args}>
		{args.label || 'Error'}
	</Toast>
</Story>
