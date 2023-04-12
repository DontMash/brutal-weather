<script lang="ts">
  import LoadingState from './LoadingState.svelte';
  import CircleFlag from '../CircleFlag.svelte';

  import { updateQuery } from '../utils';
  import favoritesService, { type Favorite } from '../favorites.service';
  import LocationTitle from './LocationTitle.svelte';

  const onSelect = (favorite: Favorite) =>
    updateQuery(new URLSearchParams(favorite.query));
</script>

{#await favoritesService.getAll()}
  <LoadingState />
{:then favorites}
  <ul class="divide-y-2 divide-neutral-800 border-neutral-800 border-b-2">
    {#each favorites as favorite}
      {@const location = favorite.location}
      <li>
        <button
          class="flex w-full items-center space-x-1 py-1 px-2"
          aria-label={`Select ${location.name}`}
          on:click={() => onSelect(favorite)}
        >
          <CircleFlag country={location.country} country_code={location.country_code} />
          <div class="flex flex-col text-left">
            <LocationTitle {location} />
          </div>
        </button>
      </li>
    {/each}
  </ul>
{/await}
