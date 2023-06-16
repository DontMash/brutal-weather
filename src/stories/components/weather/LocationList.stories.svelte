<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import LocationList from '$lib/components/weather/LocationList.svelte';
	import { mockLocations } from '../../mock';
</script>

<Meta title="Components/Weather/LocationList" component={LocationList} />

<Template>
	<LocationList locations={mockLocations} />
</Template>

<Story name="Default">
	<LocationList locations={mockLocations} />
</Story>
