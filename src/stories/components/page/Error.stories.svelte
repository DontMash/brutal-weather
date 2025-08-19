<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Error from '$lib/components/page/Error.svelte';

	const { Story } = defineMeta({
		title: 'Components/Page/Error',
		argTypes: {
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
			}
		},
		args: {
			title: 'Error',
			message: 'Placeholder'
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<Error {...args} />
	{/snippet}
</Story>
