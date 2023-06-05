<script lang="ts">
  import ErrorComponent from '../page/Error.svelte';
  import ForecastComponent from './Forecast.svelte';

  import type { Forecast } from './forecast';
  import type { Location } from './geocoding';

  export let forecastRequest: Promise<Forecast>;
  export let location: Partial<Location>;
</script>

{#await forecastRequest then forecast}
  <ForecastComponent {forecast} {location} />
{:catch error}
  <ErrorComponent {error} />
{/await}
