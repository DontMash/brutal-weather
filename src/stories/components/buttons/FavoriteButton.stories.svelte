<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import type { Location } from '$lib/weather/geocoding';
	import FavoriteButton from '$lib/components/weather/FavoriteButton.svelte';

	const location: Location = {
		id: -1,
		name: 'Test',
		country: 'Nowhere',
		country_code: 'now',
		latitude: 1,
		longitude: -1
	};
	const { Story } = defineMeta({
		title: 'Components/Buttons/FavoriteButton',
		component: FavoriteButton,
		argTypes: {
			location: {
				control: 'object',
				name: 'Location',
				description: 'An object defining the location to be favoritted.',
				defaultValue: location
			}
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<FavoriteButton {...args} />
	{/snippet}
</Story>
