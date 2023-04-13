<script lang="ts">
  import LoadingState from './LoadingState.svelte';
  import ErrorComponent from '../page/Error.svelte';
  import LocationButton from './LocationButton.svelte';

  import { createEventDispatcher } from 'svelte';
  import type { Location } from './geocoding.types';
  import { updateQuery } from '../utils';

  export let locationsRequest: Promise<Array<Location>>;

  const dispatch = createEventDispatcher();

  const onSelect = (location: Location) => {
    dispatch('select', location);
    updateQueryLocation(location.id, location.name);
  };

  const updateQueryLocation = (id: number, name: string) => {
    const params = new URLSearchParams();
    params.set('id', id.toString());
    params.set('name', name);
    updateQuery(params);
  };
</script>

{#await locationsRequest}
  <LoadingState />
{:then locations}
  {#if locations}
    <ul class="divide-y-2 divide-neutral-800 border-b-2 border-neutral-800">
      {#each locations as location}
        <li>
          <LocationButton {location} on:click={(event) => onSelect(event.detail)} />
        </li>
      {/each}
    </ul>
  {/if}
{:catch error}
  <ErrorComponent {error} />
{/await}
