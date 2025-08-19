<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Button from '$lib/components/Button.svelte';
	import ShareIcon from '$lib/components/icons/ShareIcon.svelte';

	const { Story } = defineMeta({
		title: 'Components/Buttons/Button',
		component: Button,
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
			}
		},
		args: {
			label: 'Button',
			color: 'primary',
			size: 'medium'
		}
	});
</script>

<Story name="Default">
	{#snippet template({ children, ...args })}
		<Button {...args}>Default</Button>
	{/snippet}
</Story>

<Story name="Primary" args={{ color: 'primary' }}>
	{#snippet template({ children, ...args })}
		<Button {...args}>Primary</Button>
	{/snippet}
</Story>

<Story name="Secondary" args={{ color: 'secondary' }}>
	{#snippet template({ children, ...args })}
		<Button {...args}>Secondary</Button>
	{/snippet}
</Story>

<Story name="Square" args={{ size: 'square' }}>
	{#snippet template({ children, ...args })}
		<Button {...args}>
			<ShareIcon />
		</Button>
	{/snippet}
</Story>

<Story name="Medium" args={{ size: 'medium' }}>
	{#snippet template({ children, ...args })}
		<Button {...args}>Medium</Button>
	{/snippet}
</Story>
