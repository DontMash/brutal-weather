<script lang="ts">
  import LoadingState from './LoadingState.svelte';
  import ErrorComponent from '../page/Error.svelte';
  import ForecastComponent from './Forecast.svelte';
  import ShareButton from '../ShareButton.svelte';

  import type { Forecast } from './forecast.types';
  import type { Location } from './geocoding.types';
  import FavoriteButton from '../FavoriteButton.svelte';

  export let forecastRequest: Promise<Forecast>;
  export let location: Partial<Location>;

  $: validLocation = location as Location;
</script>

{#await forecastRequest}
  <LoadingState />
{:then forecast}
  <ForecastComponent {forecast} {location}>
    <ul class="flex space-x-2">
      {#if location.id}
        <li>
          <FavoriteButton location={validLocation} />
        </li>
      {/if}
      <li>
        <ShareButton />
      </li>
    </ul>
  </ForecastComponent>
{:catch error}
  <ErrorComponent {error} />
{/await}
