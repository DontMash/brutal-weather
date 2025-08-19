<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { ToastType } from '$lib/components/toast/toast.service';
	import Toast from '$lib/components/toast/Toast.svelte';

	const { Story } = defineMeta({
		title: 'Components/Toast',
		component: Toast,
		argTypes: {
			type: {
				type: 'string',
				options: ['Info', 'Warning', 'Error'],
				control: 'radio',
				defaultValue: 'Info',
				description: 'Type of the toast'
			}
		},
		args: {
			type: ToastType.Info
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<Toast {...args}>Default</Toast>
	{/snippet}
</Story>

<Story name="Info" args={{ type: ToastType.Info }}>
	{#snippet template(args)}
		<Toast {...args}>Info</Toast>
	{/snippet}
</Story>

<Story name="Warning" args={{ type: ToastType.Warning }}>
	{#snippet template(args)}
		<Toast {...args}>Warning</Toast>
	{/snippet}
</Story>

<Story name="Error" args={{ type: ToastType.Error }}>
	{#snippet template(args)}
		<Toast {...args}>Error</Toast>
	{/snippet}
</Story>
