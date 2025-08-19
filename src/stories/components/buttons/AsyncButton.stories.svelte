<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import AsyncButton from '$lib/components/AsyncButton.svelte';
	import ShareIcon from '$lib/components/icons/ShareIcon.svelte';

	const { Story } = defineMeta({
		title: 'Components/Buttons/AsyncButton',
		component: AsyncButton,
		argTypes: {
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
		},
		args: {
			label: 'Button',
			color: 'primary',
			size: 'medium',
			loading: false
		}
	});
</script>

<Story name="Default">
	{#snippet template({ children, ...args })}
		<AsyncButton {...args}>Default</AsyncButton>
	{/snippet}
</Story>

<Story name="Primary" args={{ color: 'primary' }}>
	{#snippet template({ children, ...args })}
		<AsyncButton {...args}>Primary</AsyncButton>
	{/snippet}
</Story>

<Story name="Secondary" args={{ color: 'secondary' }}>
	{#snippet template({ children, ...args })}
		<AsyncButton {...args}>Secondary</AsyncButton>
	{/snippet}
</Story>

<Story name="Square" args={{ size: 'square' }}>
	{#snippet template({ children, ...args })}
		<AsyncButton {...args}>
			<ShareIcon />
		</AsyncButton>
	{/snippet}
</Story>

<Story name="Medium" args={{ size: 'medium' }}>
	{#snippet template({ children, ...args })}
		<AsyncButton {...args}>Medium</AsyncButton>
	{/snippet}
</Story>

<Story name="Loading" args={{ loading: true, size: 'square' }}>
	{#snippet template({ children, ...args })}
		<AsyncButton {...args}>
			<ShareIcon />
		</AsyncButton>
	{/snippet}
</Story>
