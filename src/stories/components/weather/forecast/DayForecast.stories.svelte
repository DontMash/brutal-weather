<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import DayForecast from '$lib/components/weather/forecast/DayForecast.svelte';
	import { mockDayForecast } from '../../../mock';
</script>

<Meta title="Components/Weather/Forecast/DayForecast" component={DayForecast} />

<Template>
	<DayForecast forecast={mockDayForecast} />
</Template>

<Story name="Default">
	<DayForecast forecast={mockDayForecast} />
</Story>
