<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import CurrentForecast from '$lib/components/weather/forecast/CurrentForecast.svelte';
	import { mockCurrentForecast } from '../../../mock';
</script>

<Meta title="Components/Weather/Forecast/CurrentForecast" component={CurrentForecast} />

<Template>
	<CurrentForecast forecast={mockCurrentForecast} />
</Template>

<Story name="Default">
	<CurrentForecast forecast={mockCurrentForecast} />
</Story>
