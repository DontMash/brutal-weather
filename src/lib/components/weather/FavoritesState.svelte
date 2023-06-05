<script lang="ts">
  import ErrorComponent from '../page/Error.svelte';
  import LocationButton from './LocationButton.svelte';

  import { updateQuery } from '../utils';
  import favoritesService, { type Favorite } from '../favorites.service';

  const onSelect = (favorite: Favorite) =>
    updateQuery(new URLSearchParams(favorite.query));
</script>

{#await favoritesService.getAll() then favorites}
  {#if favorites.length < 1}
    <ErrorComponent error={new Error('No favorites found')} />
  {:else}
    <ul class="divide-y-2 divide-neutral-800 border-b-2 border-neutral-800">
      {#each favorites as favorite}
        {@const location = favorite.location}
        <li>
          <LocationButton {location} on:click={() => onSelect(favorite)} />
        </li>
      {/each}
    </ul>
  {/if}
{/await}
