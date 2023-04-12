<script lang="ts">
  import AsyncButton from './AsyncButton.svelte';
  import FavoriteFilledIcon from './icons/FavoriteFilledIcon.svelte';
  import FavoriteIcon from './icons/FavoriteIcon.svelte';

  import type { Location } from './weather/geocoding.types';
  import toastService, { ToastType } from './toast/toast.service';
  import favoritesService from './favorites.service';
  import { onMount } from 'svelte';

  const TOAST_DURATION: number = 3000;

  export let location: Location;
  let button: AsyncButton;
  let isLoading: boolean;
  let isFavorite: boolean;

  const onFavorite = () => {
    isLoading = true;
    const ANIMATION_DURATION = button.getAnimationDuration();

    if (isFavorite) {
      favoritesService
        .remove(location.id)
        .then(() => {
          toastService.add(
            'Location removed from your favorites',
            TOAST_DURATION,
            ToastType.Warning
          );
        })
        .catch((error: Error) =>
          toastService.add(error.message, TOAST_DURATION, ToastType.Error)
        )
        .finally(() =>
          setTimeout(() => {
            isLoading = false;
            updateFavorite();
          }, ANIMATION_DURATION)
        );
    } else {
      favoritesService
        .add(location)
        .then(() => {
          toastService.add('Location added to your favorites', TOAST_DURATION);
        })
        .catch((error: Error) =>
          toastService.add(error.message, TOAST_DURATION, ToastType.Error)
        )
        .finally(() =>
          setTimeout(() => {
            isLoading = false;
            updateFavorite();
          }, ANIMATION_DURATION)
        );
    }
  };
  const updateFavorite = () => {
    favoritesService
      .has(location.id)
      .then(() => (isFavorite = true))
      .catch(() => (isFavorite = false));
  };

  onMount(() => updateFavorite());
</script>

<AsyncButton
  color={isFavorite ? 'secondary' : 'primary'}
  loading={isLoading}
  bind:this={button}
  on:click={onFavorite}
>
  {#if isFavorite}
    <FavoriteFilledIcon />
  {:else}
    <FavoriteIcon />
  {/if}
</AsyncButton>
