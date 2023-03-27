<script lang="ts">
  import CircleFlag from '../CircleFlag.svelte';
  import LocationTitle from './LocationTitle.svelte';

  import { createEventDispatcher } from 'svelte';
  import type { Location } from './geocoding.types';

  export let locations: Array<Location>;

  const dispatch = createEventDispatcher();

  const onSelect = (location: Location) => dispatch('value', { value: location });
</script>

<ul class="divide-y-2 divide-neutral-800">
  {#each locations as location}
    <li>
      <button
        class="flex w-full items-center space-x-1 py-1 px-2"
        aria-label={`Select ${location.name}`}
        on:click={() => onSelect(location)}
      >
        <CircleFlag country={location.country} country_code={location.country_code} />
        <LocationTitle {location} />
      </button>
    </li>
  {/each}
</ul>
