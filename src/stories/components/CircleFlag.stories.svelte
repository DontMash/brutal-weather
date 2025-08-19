<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import CircleFlag from '$lib/components/CircleFlag.svelte';

	const { Story } = defineMeta({
		title: 'Components/CircleFlag',
		component: CircleFlag,
		argTypes: {
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
		},
		args: {
			country: 'Deutschland',
			country_code: 'de'
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<CircleFlag {...args} />
	{/snippet}
</Story>
