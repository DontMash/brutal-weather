<script lang="ts">
  import LoadingState from './LoadingState.svelte';
  import ErrorComponent from '../page/Error.svelte';
  import ForecastComponent from './Forecast.svelte';
  import ShareLocationButton from './ShareLocationButton.svelte';

  import type { Forecast } from './forecast.types';
  import type { Location } from './geocoding.types';

  export let forecastRequest: Promise<Forecast>;
  export let location: Partial<Location>;
</script>

{#await forecastRequest}
  <LoadingState />
{:then forecast}
  <ForecastComponent {forecast} {location}>
    {#if location.id}
      <ShareLocationButton {location} />
    {/if}
  </ForecastComponent>
{:catch error}
  <ErrorComponent {error} />
{/await}
