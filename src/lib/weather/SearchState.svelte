<script lang="ts">
  import LoadingState from './LoadingState.svelte';
  import ErrorComponent from '../page/Error.svelte';
  import LocationSearchResults from './LocationSearchResults.svelte';

  import { createEventDispatcher } from 'svelte';
  import type { Location } from './geocoding.types';

  export let locationsRequest: Promise<Array<Location>>;

  const dispatch = createEventDispatcher();
  const onSelect = (location: Location) => {
    dispatch('select', location);
  };
</script>

{#await locationsRequest}
  <LoadingState />
{:then locations}
  {#if locations}
    <LocationSearchResults
      {locations}
      on:value={(event) => onSelect(event.detail.value)}
    />
  {/if}
{:catch error}
  <ErrorComponent {error} />
{/await}
