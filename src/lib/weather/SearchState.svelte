<script lang="ts">
  import LoadingState from './LoadingState.svelte';
  import ErrorComponent from '../page/Error.svelte';

  import { createEventDispatcher } from 'svelte';
  import type { Location } from './geocoding.types';
  import { updateQuery } from '../utils';
  import CircleFlag from '../CircleFlag.svelte';
  import LocationTitle from './LocationTitle.svelte';

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
          <button
            class="flex w-full items-center space-x-1 py-1 px-2"
            aria-label={`Select ${location.name}`}
            on:click={() => onSelect(location)}
          >
            <CircleFlag country={location.country} country_code={location.country_code} />
            <div class="flex flex-col text-left">
              <LocationTitle {location} />
            </div>
          </button>
        </li>
      {/each}
    </ul>
  {/if}
{:catch error}
  <ErrorComponent {error} />
{/await}
