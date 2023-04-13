<script lang="ts">
  import CircleFlag from '../CircleFlag.svelte';

  import { createEventDispatcher } from 'svelte';
  import type { Location } from './geocoding.types';
  import LocationTitle from './LocationTitle.svelte';

  const dispatch = createEventDispatcher();

  export let location: Location;
</script>

<button
  class="flex w-full items-center space-x-1 py-1 px-2 transition-colors hover:bg-slate-200 focus:outline-none focus-visible:bg-slate-200 active:bg-slate-300"
  aria-label={`Select ${location.name}`}
  on:click={() => dispatch('click', location)}
>
  <CircleFlag country={location.country} country_code={location.country_code} />
  <div class="flex flex-col text-left">
    <LocationTitle {location} />
  </div>
</button>
