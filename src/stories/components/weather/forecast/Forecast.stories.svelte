<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import Forecast from '$lib/components/weather/forecast/Forecast.svelte';
	import { mockCurrentForecast, mockLocation } from '../../../mock';
</script>

<Meta title="Components/Weather/Forecast" component={Forecast} />

<Template>
	<Forecast forecast={mockCurrentForecast} location={mockLocation} />
</Template>

<Story name="Default">
	<Forecast forecast={mockCurrentForecast} location={mockLocation} />
</Story>
