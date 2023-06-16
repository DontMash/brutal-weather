<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import LocationTitle from '$lib/components/weather/LocationTitle.svelte';
	import { mockLocation } from '../../mock';
    const location = {
        ...mockLocation,
        admin1: 'Somewhere',
        admin3: 'Test',
    }
</script>

<Meta title="Components/Weather/Forecast/LocationTitle" component={LocationTitle} />

<Template>
	<LocationTitle {location} />
</Template>

<Story name="Default">
	<LocationTitle {location} />
</Story>
