<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

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
</script>

<Meta title="Components/Buttons/FavoriteButton" component={FavoriteButton} />

<Template>
	<FavoriteButton {location} />
</Template>

<Story name="Default">
	<FavoriteButton {location} />
</Story>
