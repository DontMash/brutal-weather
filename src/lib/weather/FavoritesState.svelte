<script lang="ts">
  import LoadingState from './LoadingState.svelte';
  import ErrorComponent from '../page/Error.svelte';
  import CircleFlag from '../CircleFlag.svelte';
  import LocationTitle from './LocationTitle.svelte';
  import LocationButton from './LocationButton.svelte';

  import { updateQuery } from '../utils';
  import favoritesService, { type Favorite } from '../favorites.service';

  const onSelect = (favorite: Favorite) =>
    updateQuery(new URLSearchParams(favorite.query));
</script>

{#await favoritesService.getAll()}
  <LoadingState />
{:then favorites}
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
