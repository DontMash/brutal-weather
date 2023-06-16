<script lang="ts">
	import AsyncButton from '$lib/components/AsyncButton.svelte';
	import FavoriteFilledIcon from '$lib/components/icons/FavoriteFilledIcon.svelte';
	import FavoriteIcon from '$lib/components/icons/FavoriteIcon.svelte';

	import { onMount } from 'svelte';

	import type { Location } from '$lib/weather/geocoding';
	import { ToastType, add as addToast } from '$lib/components/toast/toast.service';
	import { add as addFavorite, remove, has } from './favorites.service';

	const TOAST_DURATION = 3000;

	export let location: Location;
	let button: AsyncButton;
	let isLoading: boolean;
	let isFavorite: boolean;

	const onFavorite = () => {
		isLoading = true;
		const ANIMATION_DURATION = button.getAnimationDuration();

		if (isFavorite) {
			remove(location.id)
				.then(() => {
					addToast('Location removed from your favorites', TOAST_DURATION, ToastType.Warning);
				})
				.catch((error: Error) => addToast(error.message, TOAST_DURATION, ToastType.Error))
				.finally(() =>
					setTimeout(() => {
						isLoading = false;
						updateFavorite();
					}, ANIMATION_DURATION)
				);
		} else {
			addFavorite(location)
				.then(() => {
					addToast('Location added to your favorites', TOAST_DURATION);
				})
				.catch((error: Error) => addToast(error.message, TOAST_DURATION, ToastType.Error))
				.finally(() =>
					setTimeout(() => {
						isLoading = false;
						updateFavorite();
					}, ANIMATION_DURATION)
				);
		}
	};
	const updateFavorite = () => {
		has(location.id)
			.then(() => (isFavorite = true))
			.catch(() => (isFavorite = false));
	};

	onMount(() => updateFavorite());
</script>

<AsyncButton label="Favorite" size="square" loading={isLoading} bind:this={button} on:click={onFavorite}>
	{#if isFavorite}
		<FavoriteFilledIcon />
	{:else}
		<FavoriteIcon />
	{/if}
</AsyncButton>
